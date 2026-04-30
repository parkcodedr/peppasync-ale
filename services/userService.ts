import api from "@/lib/api";
import {
  ChangePasswordPayload,
  UpdateProfilePayload,
  User,
} from "@/types/user";

export const fetchUserProfile = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/me");
  return data;
};

export const updateProfile = async (data: UpdateProfilePayload) => {
  const response = await api.put("/profile", data);
  return response.data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const { data } = await api.post("/profile/change-password", payload);
  return data;
};
