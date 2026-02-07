import loginService from "@/services/login";
import signupService from "@/services/signup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type User = {
  id: string;
  firstName: string;
  lastName?: string;
  role: string;
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;

  signup: (payload: any) => Promise<void>;
  login: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: false,
  error: null,

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

  /* ---------- LOGOUT ---------- */
  logout: async () => {
    await AsyncStorage.clear();
    set({ user: null, accessToken: null });
  },

  /* ---------- RESTORE SESSION ---------- */
  hydrate: async () => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      set({ accessToken: token });
    }
  },
}));
