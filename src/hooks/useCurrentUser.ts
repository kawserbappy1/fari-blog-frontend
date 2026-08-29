"use client";

import { useQuery } from "@tanstack/react-query";

import { getCurrentUser } from "@/services/auth.service";
import type { User } from "@/types/auth";

export const CURRENT_USER_QUERY_KEY = ["current-user"];

export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: getCurrentUser,
    retry: false,
  });
};
