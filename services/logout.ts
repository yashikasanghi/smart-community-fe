import { getAccessToken } from "@/utils/tokenStorage";
import { authApi } from "./api";

const logoutService = async (
  contactNumber?: string,
  accessToken?: string | null,
) => {
  if (!contactNumber) return;
  const token = accessToken ?? (await getAccessToken());
  await authApi.post(
    "/auth/logout",
    { contactNumber },
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );
};

export default logoutService;
