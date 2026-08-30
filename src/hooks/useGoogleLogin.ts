"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { googleLogin } from "@/services/auth.service";

import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";
import { GoogleLoginPayload } from "@/types/auth";

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: GoogleLoginPayload) => googleLogin(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: CURRENT_USER_QUERY_KEY,
      });

      router.push("/");
      router.refresh();
    },
  });
};
