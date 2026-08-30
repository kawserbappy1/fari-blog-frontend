"use client";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/auth.service";
import { ForgotPasswordPayload } from "@/types/auth";
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  });
};
