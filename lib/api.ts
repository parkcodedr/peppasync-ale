import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import {
  getToken,
  getRefreshToken,
  setAuthToken,
  clearAuth,
  setRefreshToken,
} from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { AuthResponse } from "@/types/auth";
import { AUTH_ERROR } from "@/constants";

const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ??
    "https://w70sp1rthk.execute-api.us-east-1.amazonaws.com/api/v1",
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value?: string | null) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<{ message?: string; detail?: string }>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    

    const status = error.response?.status;
    const errorMessage = error.response?.data?.message || error.response?.data?.detail;

    const isAuthRoute = originalRequest.url?.includes("/auth");
    console.log({errorMessage:error.response?.data});
    

    const isTokenExpired =
      errorMessage === AUTH_ERROR.UNAUTHORIZE_MESSAGE ||
      errorMessage === AUTH_ERROR.TOKEN_EXPIRED;

    if (
      status === 401 &&
      !originalRequest._retry &&
      !isAuthRoute &&
      isTokenExpired
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (token) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await axios.post<AuthResponse>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refresh_token: refreshToken },
        );

        const newAccessToken = data?.access_token;
        setAuthToken(newAccessToken);
        setRefreshToken(data?.refresh_token);

        api.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAuth();
        useUserStore.getState().setUser(null);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    let message = "Something went wrong. Please try again.";

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.data?.detail) {
      message = error.response.data.detail;
    } else if (error.response?.status === 400) {
      message = "Invalid request. Please check your input.";
    } else if (error.response?.status === 403) {
      message = "You don’t have permission to perform this action.";
    } else if (error.response?.status === 404) {
      message = "The requested resource was not found.";
    } else if (error.response?.status === 500) {
      message = "A server error occurred. Please try again later.";
    }

    return Promise.reject(new Error(message));
  },
);

export default api;
