export interface User {
  id: number;
  full_name: string;
  phone: string;
  email: string;
}

export interface UpdateProfilePayload {
  full_name: string;
  email: string;
  phone: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
}
