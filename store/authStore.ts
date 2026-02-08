import loginService from "@/services/login";
import signupService from "@/services/signup";
import { SignupPayload, User } from "@/types/user.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;

  setUser: (user: User) => void;
  signup: (payload: SignupPayload) => Promise<void>;
  login: (payload: any) => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  /* ---------- SIGNUP ---------- */
  signup: async (payload) => {
    try {
      set({ loading: true, error: null });

      const data = await signupService(payload);

      await AsyncStorage.multiSet([
        ["accessToken", data.accessToken],
        ["refreshToken", data.refreshToken],
      ]);

      set({
        user: data.user,
        accessToken: data.accessToken,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Signup failed",
        loading: false,
      });
    }
  },

  /* ---------- LOGIN ---------- */
  login: async (payload) => {
    try {
      set({ loading: true, error: null });

      const data = await loginService(payload);

      await AsyncStorage.multiSet([
        ["accessToken", data.accessToken],
        ["refreshToken", data.refreshToken],
      ]);

      set({
        user: data.user,
        accessToken: data.accessToken,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Login failed",
        loading: false,
      });
    }
  },

  /* ---------- RESTORE SESSION ---------- */
  hydrate: async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      set({ accessToken: token });
    }
  },
}));
