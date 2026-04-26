import api from "@/lib/api";
import {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from "@/types/auth";

export const registerUser = async (
  payload: RegisterPayload,
): Promise<RegisterResponse> => {
  const { data } = await api.post<
    AuthResponse,
    { data: RegisterResponse },
    RegisterPayload
  >("/auth/register", payload);

  return data;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  const { data } = await api.post<
    AuthResponse,
    { data: AuthResponse },
    LoginPayload
  >("/auth/login", payload);
  return data;
};

export const forgotPasswordService = async (data: { email: string }) => {
  const res = await api.post("/auth/forgot-password", data);
  return res.data;
};

export const logoutService = async (): Promise<void> => {
  await api.post("/auth/logout");
};
