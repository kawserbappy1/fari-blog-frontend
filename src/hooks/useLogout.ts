// "use client";

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { logoutUser } from "@/services/auth.service";
// import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

// export const useLogout = () => {
//   const queryClient = useQueryClient();
//   const router = useRouter();

//   return useMutation({
//     mutationFn: logoutUser,
//     onSuccess: () => {
//       queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);
//       queryClient.clear();
//       router.push("/login");
//       router.refresh();
//     },
//   });
// };

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/services/auth.service";
import { CURRENT_USER_QUERY_KEY } from "./useCurrentUser";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: async () => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);

      await queryClient.invalidateQueries({
        queryKey: CURRENT_USER_QUERY_KEY,
      });

      router.push("/login");
      router.refresh();
    },
  });
};
