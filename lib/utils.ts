import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { ROLE_COOKIE_NAME } from "@/constants";
import { decryptRole, encryptRole } from "./encription";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapOrderStatus(
  status: string,
): "success" | "pending" | "failed" | "default" | "completed" {
  switch (status) {
    case "Successful":
      return "success";
    case "Pending":
      return "pending";
    case "Failed":
      return "failed";
    case "Rejected":
      return "failed";
    case "failed":
      return "failed";
    case "completed":
      return "success";
    default:
      return "default";
  }
}

export const getToken = (): string | null => {
  return Cookies.get("auth") ?? null;
};

export const setAuthToken = (
  token: string,
  options: Cookies.CookieAttributes = { expires: 7, sameSite: "Lax" },
): void => {
  Cookies.set("auth", token, options);
};

export const removeAuthToken = (): void => {
  Cookies.remove("auth");
};

export const getRefreshToken = (): string | null => {
  return Cookies.get("refresh_token") ?? null;
};

export const setRefreshToken = (
  token: string,
  options: Cookies.CookieAttributes = { expires: 7, sameSite: "Lax" },
): void => {
  Cookies.set("refresh_token", token, options);
};

export const removeRefreshToken = (): void => {
  Cookies.remove("refresh_token");
};

export const setCookie = <T>(
  name: string,
  value: T,
  options: Cookies.CookieAttributes = { expires: 7, sameSite: "Lax" },
): void => {
  Cookies.set(name, JSON.stringify(value), options);
};

export const getCookie = <T>(name: string): T | null => {
  const cookie = Cookies.get(name);
  return cookie ? (JSON.parse(cookie) as T) : null;
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

export function setRole(role: string) {
  const encrypted = encryptRole(role);
  Cookies.set(ROLE_COOKIE_NAME, encrypted, {
    secure: true,
    sameSite: "lax",
    expires: 7,
  });
}

export function getRole(): string | null {
  const encrypted = Cookies.get(ROLE_COOKIE_NAME);
  if (!encrypted) return null;
  return decryptRole(encrypted);
}

export function removeRole() {
  Cookies.remove(ROLE_COOKIE_NAME);
}

export const clearAuth = (): void => {
  removeAuthToken();
  removeRefreshToken();
  removeRole();
};

export function formatDateTime(dateString: string | null): string {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return format(date, "dd-MM-yyyy, h:mm a");
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

export function formatDateForApi(date: Date | undefined) {
  if (!date) return undefined;
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export const getAgeHours = (date: string) => {
  const created = new Date(date).getTime();
  const now = Date.now();
  return Math.floor((now - created) / (1000 * 60 * 60));
};
export const formatStateLabel = (state: string) =>
  state
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const getStateColor = (state: string) => {
  switch (state) {
    case "AWAITING_FINANCE":
      return "bg-amber-500";
    case "AWAITING_OPS":
      return "bg-indigo-500";
    case "RELEASED_TO_ERP":
      return "bg-emerald-500";
    case "CANCELLED":
      return "bg-red-500";
    default:
      return "bg-gray-400";
  }
};

export const getInitials = (fullName: string): string => {
  if (!fullName) return "";

  return fullName
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};
