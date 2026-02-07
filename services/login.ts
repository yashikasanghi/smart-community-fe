import { authApi } from "./api";

const loginService = async (payload: any) => {
  const response = await authApi.post("/auth/login", payload);
  return response.data;
};

export default loginService;
