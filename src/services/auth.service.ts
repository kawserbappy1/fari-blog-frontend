import { apiClient } from "@/lib/api-client";
import type {
  ApiResponse,
  AuthResponse,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  GoogleLoginPayload,
  GoogleLoginResponse,
  ResetPasswordPayload,
  UpdateProfilePayload,
  User,
  VerifyForgotPasswordPayload,
  VerifyForgotPasswordResponse,
} from "@/types/auth";

// ============================================
// Get Current User
// ============================================
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient<{
    success: boolean;
    message: string;
    data: User;
  }>("/auth/me", {
    method: "GET",
  });

  return response.data;
};
// ============================================
// Login
// ============================================

export type LoginPayload = {
  email: string;
  password: string;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  return apiClient<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// ============================================
// Logout
// ============================================

export const logoutUser = async () => {
  return apiClient<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
};

// ============================================
// update Profile
// ============================================
export const updateMyProfile = async (
  payload: UpdateProfilePayload,
): Promise<AuthResponse> => {
  const formData = new FormData();

  if (payload.name !== undefined) {
    formData.append("name", payload.name);
  }

  if (payload.bio !== undefined) {
    formData.append("bio", payload.bio);
  }

  if (payload.location !== undefined) {
    formData.append("location", payload.location);
  }

  if (payload.socialLinks !== undefined) {
    formData.append("socialLinks", JSON.stringify(payload.socialLinks));
  }

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  }

  return apiClient<AuthResponse>("/auth/me", {
    method: "PATCH",
    body: formData,
  });
};

// ============================================
// change password
// ============================================
export const changePassword = async (
  payload: ChangePasswordPayload,
): Promise<AuthResponse> => {
  return apiClient<AuthResponse>("/auth/change-password", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

// ============================================
// Forgot password
// ============================================
export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  return apiClient("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// ============================================
// Verify Forgot password
// ============================================
export const verifyForgotPassword = async (
  payload: VerifyForgotPasswordPayload,
): Promise<{
  success: boolean;
  message: string;
  data: VerifyForgotPasswordResponse;
}> => {
  return apiClient("/auth/verify-forgot-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// ============================================
// Reset Forgot password
// ============================================
export const resetForgotPassword = async (payload: ResetPasswordPayload) => {
  return apiClient("/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

// ============================================
// google login or registration
// ============================================

export const googleLogin = async (
  payload: GoogleLoginPayload,
): Promise<GoogleLoginResponse> => {
  return apiClient<GoogleLoginResponse>("/auth/google", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
