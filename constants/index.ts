export const ROLE_COOKIE_NAME = process.env.ROLE_COOKIE_NAME || "__secure_sess";
export const ROLE_SECRET_KEY = "1234567890abcdef1234567890abcdef";

export const AUTH_ERROR = {
  UNAUTHORIZE_MESSAGE: "Missing authorization header",
  TOKEN_EXPIRED: "Token has expired",
};

export const ORDER_TYPES = {
  AWAITING_FINANCE: "AWAITING_FINANCE",
  CANCELLED: "CANCELLED",
  RELEASED_TO_ERP: "RELEASED_TO_ERP",
};
