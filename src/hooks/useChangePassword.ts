"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changePassword } from "@/services/auth.service";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";
import { ChangePasswordPayload } from "@/types/auth";

export const useChangePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => {
      return changePassword(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: CURRENT_USER_QUERY_KEY,
      });
    },
  });
};
