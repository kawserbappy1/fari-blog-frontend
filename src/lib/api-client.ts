//apiClient হলো frontend এবং backend API-এর মাঝখানে একটা reusable communication layer।
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_BASE_URL is not defined in environment variables",
  );
}
//Browser-এর built-in fetch() একটা type ব্যবহার করে:RequestInitএর মধ্যে থাকে:method,headers,body,cache,signal,credentials,mode,redirect
type RequestOptions = RequestInit & {
  //params তারপর আমরা নিজেদের একটা property যোগ করেছি:params optional এবং এর মধ্যে key-value query parameters পাঠানো যাবে।
  //Record কী?এটা TypeScript-এর utility type। key হবে string।
  params?: Record<string, string | number | boolean | undefined>;
};

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;

  //API_BASE_URL=http://localhost:5000/api/v1
  //endpoint=/posts
  //url=http://localhost:5000/api/v1/posts

  let url = `${API_BASE_URL}${endpoint}`;

  // ============================================
  // Query Parameters
  // ============================================

  if (params) {
    //URLSearchParams: Browser-এর built-in API। এটা query parameter সুন্দরভাবে encode করতে সাহায্য করে। যেমন: search = hello world এটা URL-এর জন্য proper format-এ convert করবে।
    const searchParams = new URLSearchParams();

    //Object.entries :Object.entries(params).forEach(([key,value]) => {}===> params = { page: 2, limit: 10, search:"react"};

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        //আমরা চাই না URL হোক:?page=1&search=undefined
        searchParams.append(key, String(value));
        //page=2&limit=10
        //কারণ URLSearchParams.append() string value নিয়ে কাজ করে। String(value) দিয়ে সবকিছুকে string করা হচ্ছে।
      }
    });

    //ধরো:params: {page: 2,limit: 10,} তাহলে queryString হবে:page=2&limit=10
    const queryString = searchParams.toString();

    if (queryString) {
      url += `?${queryString}`;
    }

    //পরে:http://localhost:5000/api/v1/posts?page=2&limit=10
  }
  // ========================================================== // Detect FormData // ==========================================================
  const isFormData = fetchOptions.body instanceof FormData;

  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),

    // User চাইলে custom headers পাঠাতে পারবে।
    ...fetchOptions.headers,
  };

  // ============================================
  // Request
  // ============================================

  const response = await fetch(url, {
    ...fetchOptions,
    //...fetchOptions : এখানে user-এর দেওয়া fetch options spread করা হচ্ছে।যেমন: apiClient("/auth/login", {method:"POST",body: JSON.stringify(data),});

    credentials: "include",
    //তোমার backend authentication যদি cookie-based হয়, তাহলে browser-কে বলতে হবে:cross-origin request হলেও cookies include করো।
    headers,
  });

  // Response const data = await response.json().catch(() => null); Backend থেকে response এসেছে।  ধরো:{"success": true,"message": "Login successful","data": {}} response.json() সেটাকে JavaScript object বানাবে।

  //.catch(() => null) সব response JSON হবে এমন guarantee নেই।
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      statusCode: response.status,
      message:
        data?.message ||
        data?.error ||
        "Something went wrong. Please try again.",
      data: data?.data,
    };
  }

  return data;
}
