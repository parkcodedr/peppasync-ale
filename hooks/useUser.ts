import { getToken } from "@/lib/utils";
import {
  changePassword,
  fetchUserProfile,
  updateProfile,
} from "@/services/userService";
import { useUserStore } from "@/store/useUserStore";
import {
  ChangePasswordPayload,
  UpdateProfilePayload,
  User,
} from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useUserProfile() {
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);

  const query = useQuery<User, Error>({
    queryKey: ["userProfile"],
    queryFn: fetchUserProfile,
    enabled: !!getToken(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (query.data && query.data) {
      setUser(query.data);
    }
  }, [query.data, setUser]);

  return {
    ...query,
    user,
  };
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfilePayload) => updateProfile(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
  });
};
