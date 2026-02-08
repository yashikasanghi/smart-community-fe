import { registerUser } from "@/constants/api-end-points";
import { authApi } from "./api";
import { SignupPayload } from "@/types/user.types";
import { setTokens } from "@/utils/tokenStorage";

export const signupUser = async (payload: SignupPayload) => {
  try {
    const res = await authApi.post(`${registerUser}`, payload);
    const data = res.data.data;
    setTokens(data?.accessToken, data?.refreshToken);
    return res.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export default signupUser;
