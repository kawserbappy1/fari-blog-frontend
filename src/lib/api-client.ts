const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_BASE_URL is not defined in environment variables",
  );
}

type RequestOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined>;
};

let refreshPromise: Promise<boolean> | null = null;

const refreshAccessToken = async (): Promise<boolean> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
      });

      return response.ok;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;

  let url = `${API_BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();

    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const isFormData = fetchOptions.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...fetchOptions.headers,
  };

  const response = await fetch(url, {
    ...fetchOptions,
    credentials: "include",
    headers,
  });

  if (response.ok) {
    return await response.json().catch(() => null);
  }

  if (response.status === 401 && endpoint !== "/auth/refresh-token") {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      const retryResponse = await fetch(url, {
        ...fetchOptions,
        credentials: "include",
        headers,
      });

      const retryData = await retryResponse.json().catch(() => null);

      if (!retryResponse.ok) {
        throw {
          statusCode: retryResponse.status,
          message:
            retryData?.message ||
            retryData?.error ||
            "Something went wrong. Please try again.",
          data: retryData?.data,
        };
      }

      return retryData;
    }

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }

    throw {
      statusCode: 401,
      message: "Your session has expired. Please login again.",
    };
  }

  const data = await response.json().catch(() => null);

  throw {
    statusCode: response.status,
    message:
      data?.message || data?.error || "Something went wrong. Please try again.",
    data: data?.data,
  };
}
