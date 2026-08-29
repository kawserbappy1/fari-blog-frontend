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
    onSuccess: () => {
      // Current user immediately remove
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);

      // পুরনো authenticated cache clear
      queryClient.clear();
      router.push("/login");
      router.refresh();
    },
  });
};

// এখন logout button-এ:

// const logoutMutation = useLogout();

// তারপর:

// onClick={() => logoutMutation.mutate()}
