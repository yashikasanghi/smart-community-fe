import loginService from "@/services/login";
import signupService from "@/services/signup";
import { SignupPayload, User } from "@/types/user.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { clearTokens } from "@/utils/tokenStorage";
import logoutService from "@/services/logout";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  profileLoaded: boolean;
  loading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  signup: (payload: SignupPayload) => Promise<void>;
  login: (payload: any) => Promise<void>;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  profileLoaded: false,
  loading: false,
  error: null,

  setUser: (user) => set({ user, profileLoaded: Boolean(user) }),

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
        profileLoaded: false,
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
        profileLoaded: false,
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
      set({ accessToken: token, profileLoaded: false });
    }
  },

  /* ---------- LOGOUT ---------- */
  logout: async () => {
    const contactNumber = get().user?.contactNumber;
    const accessToken = get().accessToken;
    try {
      await logoutService(contactNumber, accessToken);
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      await clearTokens();
      set({ user: null, accessToken: null, profileLoaded: false });
    }
  },
}));
