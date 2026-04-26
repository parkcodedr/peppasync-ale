import { useMutation } from "@tanstack/react-query";
import { loginUser, logoutService, registerUser } from "@/services/authService";
import { AuthResponse, LoginPayload, RegisterPayload, RegisterResponse } from "@/types/auth";
import { AxiosError } from "axios";

export const useRegister = () => {
  return useMutation<RegisterResponse, AxiosError, RegisterPayload>({
    mutationFn: registerUser,
  });
};

export const useLogin = () => {
  return useMutation<AuthResponse, AxiosError, LoginPayload>({
    mutationFn: loginUser,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutService,
  });
};
