import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import getProfile from "@/services/profile";

let profilePromise: Promise<any> | null = null;

export function useProfile() {
  const user = useAuthStore((state) => state.user);

  const setUser = useAuthStore((state) => state.setUser);
  const fetchProfile = async () => {
    if (user) {
      return user;
    }
    if (profilePromise) {
      return profilePromise;
    }
    profilePromise = getProfile()
      .then((res) => {
        setUser(res);
        return res;
      })
      .catch((error) => {
        console.error("Failed to fetch profile:", error);
        throw error;
      })
      .finally(() => {
        profilePromise = null;
      });
    return profilePromise;
  };

  useEffect(() => {
    if (!user) {
      fetchProfile();
    }
  }, [user]);

  return { user };
}
