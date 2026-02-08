import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import { authApi } from "@/services/api";

export function useProfile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const fetchProfile = useCallback(async () => {
    if (user) return user;
    try {
      const res = await authApi.get("/auth/get-profile");
      setUser(res.data);
      return res.data;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  }, [user, setUser]);

  return { user, fetchProfile };
}
