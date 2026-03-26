// src/lib/store/useAuth.ts
"use client";

import { create } from "zustand";
import { IUser } from "@/types/user-types";

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser) => void;
  clearUser: () => void;
  updateUser: (updates: Partial<IUser>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  setUser: (user: IUser) => set({ user }),

  clearUser: () => set({ user: null }),

  updateUser: (updates: Partial<IUser>) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
}));
