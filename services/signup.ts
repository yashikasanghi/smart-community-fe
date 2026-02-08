import { registerUser } from "@/constants/api-end-points";
import { authApi } from "./api";
import { SignupPayload } from "@/types/user.types";

export const signupUser = async (payload: SignupPayload) => {
  try {
    const res = await authApi.post(`${registerUser}`, payload);
    return res.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export default signupUser;
