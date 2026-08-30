"use client";
import { useMutation } from "@tanstack/react-query";
import { resetForgotPassword } from "@/services/auth.service";
import { ResetPasswordPayload } from "@/types/auth";
export const useResetForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetForgotPassword(payload),
  });
};
