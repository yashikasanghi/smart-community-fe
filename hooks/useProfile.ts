import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";
import getProfile from "@/services/profile";

export function useProfile() {
  const user = useAuthStore((state) => state.user);

  const setUser = useAuthStore((state) => state.setUser);
  //setUser(null);
  const fetchProfile = async () => {
    if (user) {
      return user;
    }
    try {
      const res = await getProfile();
      setUser(res);
      return res;
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      throw error;
    }
  };
  fetchProfile();

  return { user };
}
