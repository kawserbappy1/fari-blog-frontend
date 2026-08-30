export type UserProfile = {
  id: string;
  userId: string;
  username?: string | null;
  name?: string | null;
  profileImage?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  socialLinks?: Record<string, string> | null;
  createdAt?: string;
  updatedAt?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;

  authProvider: string;

  emailVerified: boolean;
  needPasswordReset: boolean;

  role: string;
  activeStatus: string;

  lastLogin?: string | null;
  createdAt: string;
  updatedAt: string;

  profile?: Profile | null;
};

export type AuthResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken?: string;
    user: User;
    profile?: UserProfile | null;
  };
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type UpdateProfilePayload = {
  name?: string;
  bio?: string;
  location?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  profileImage?: File;
};
export type SocialLinks = {
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
};

export type Profile = {
  id: string;
  userId: string;
  name: string;
  profileImage?: string | null;
  profileImagePublicId?: string | null;
  bio?: string | null;
  location?: string | null;
  socialLinks?: SocialLinks | null;
  createAt: string;
  updateAt: string;
};
export type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
export interface ForgotPasswordPayload {
  email: string;
}
export interface VerifyForgotPasswordPayload {
  email: string;
  otp: string;
}
export interface VerifyForgotPasswordResponse {
  resetToken: string;
}
export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
  confirmPassword: string;
}
export type GoogleLoginPayload = {
  idToken: string;
};

export type GoogleLoginResponse = {
  success: boolean;
  message: string;
  data: null;
};