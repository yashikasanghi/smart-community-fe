import { loginUser } from "@/constants/api-end-points";
import { authApi } from "./api";
import { setTokens } from "@/utils/tokenStorage";
import { LoginPayload } from "@/types/user.types";

const loginService = async (payload: LoginPayload) => {
  try {
    const res = await authApi.post(loginUser, payload);
    const data = res.data.data;
    setTokens(data?.accessToken, data?.refreshToken);
    return data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default loginService;
