
import { ROLE_SECRET_KEY } from "@/constants";
import CryptoJS from "crypto-js";

const SECRET_KEY = ROLE_SECRET_KEY;

export function encryptRole(role: string): string {
  return CryptoJS.AES.encrypt(role, SECRET_KEY).toString();
}

export function decryptRole(cipherText: string): string | null {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8) || null;
  } catch (err) {
    return null;
  }
}
