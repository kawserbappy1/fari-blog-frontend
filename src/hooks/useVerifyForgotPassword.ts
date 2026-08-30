"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyForgotPassword } from "@/services/auth.service";
import { VerifyForgotPasswordPayload } from "@/types/auth";

export const useVerifyForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: VerifyForgotPasswordPayload) =>
      verifyForgotPassword(payload),
  });
};
