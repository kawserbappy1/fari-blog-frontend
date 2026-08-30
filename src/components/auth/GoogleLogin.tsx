"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { GoogleLogin as GoogleOAuthLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";

import { CURRENT_USER_QUERY_KEY } from "@/hooks/useCurrentUser";
import { apiClient } from "@/lib/api-client";

const GoogleLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleGoogleLogin = async (credentialResponse: {
    credential?: string;
  }) => {
    if (!credentialResponse.credential) {
      console.error("Google ID token is missing");
      return;
    }

    try {
      await apiClient("/auth/google", {
        method: "POST",
        body: JSON.stringify({
          idToken: credentialResponse.credential,
        }),
      });

      await queryClient.invalidateQueries({
        queryKey: CURRENT_USER_QUERY_KEY,
      });

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <div className="w-full">
      <GoogleOAuthLogin
        onSuccess={handleGoogleLogin}
        onError={() => {
          console.error("Google login failed");
        }}
        useOneTap={false}
        width="100%"
      />
    </div>
  );
};

export default GoogleLogin;
