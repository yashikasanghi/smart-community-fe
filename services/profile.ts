import { authApi } from "./api";

export const getProfile = async () => {
  try {
    const res = await authApi.get("/auth/get-profile");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export default getProfile;
