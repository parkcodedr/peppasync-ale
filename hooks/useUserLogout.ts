"use client";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";
import { clearAuth } from "@/lib/utils";
import { useState } from "react";

export function useUserLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearUser = useUserStore((state) => state.clearUser);
  const loginRoute = "/auth/signin";

  const logout = async () => {
    try {
      setIsLoading(true);
    
      await new Promise((resolve) => setTimeout(resolve, 150));

      clearAuth();
      clearUser();
      queryClient.clear();
      router.replace(loginRoute);
    } catch (error) {
      console.error("Logout failed:", error);
      clearAuth();
      clearUser();
      queryClient.clear();
      router.replace(loginRoute);
    }
  };

  return { logout, isLoading };
}
