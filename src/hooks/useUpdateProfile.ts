"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";
import { UpdateProfilePayload } from "@/types/auth";
import { updateMyProfile } from "@/services/auth.service";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateMyProfile(payload),

    onSuccess: (response) => {
      if (response?.data) {
        queryClient.setQueryData(CURRENT_USER_QUERY_KEY, response.data);
      } else {
        queryClient.invalidateQueries({
          queryKey: CURRENT_USER_QUERY_KEY,
        });
      }
    },
  });
};

// তোমার update API response:
// {
//   "success": true,
//   "message": "User profile updated successfully",
//   "data": {
//     ...
//   }
// }
