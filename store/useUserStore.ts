import { User } from "@/types/user";
import { create } from "zustand";



interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  kyc: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateUser: (updates) =>
    set((state) =>
      state.user ? { user: { ...state.user, ...updates } } : state
    ),
}));
