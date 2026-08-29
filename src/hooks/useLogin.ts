// "use client";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { loginUser, type LoginPayload } from "@/services/auth.service";
// import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

// export const useLogin = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (payload: LoginPayload) => {
//       return loginUser(payload);
//     },
//     onSuccess: (response) => {
//       // Backend login response-এ user থাকলে
//       // সঙ্গে সঙ্গে current-user cache update করব।

//       if (response?.data?.user) {
//         queryClient.setQueryData(CURRENT_USER_QUERY_KEY, response.data.user);
//       } else {
//         // যদি login response-এ user না থাকে,
//         // তাহলে /auth/me আবার call হবে।

//         queryClient.invalidateQueries({
//           queryKey: CURRENT_USER_QUERY_KEY,
//         });
//       }
//     },
//   });
// };
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser, type LoginPayload } from "@/services/auth.service";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => {
      return loginUser(payload);
    },

    onSuccess: async (response) => {
      if (response?.data?.user) {
        queryClient.setQueryData(CURRENT_USER_QUERY_KEY, response.data.user);

        return;
      }

      await queryClient.invalidateQueries({
        queryKey: CURRENT_USER_QUERY_KEY,
      });
    },
  });
};
