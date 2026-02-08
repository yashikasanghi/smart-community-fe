import { selectRole } from "@/constants/api-end-points";
import { authApi } from "./api";
import { RoleSelection } from "@/types/user.types";

export const postRoleSelection = async (payload: RoleSelection) => {
  try {
    const res = await authApi.post(`${selectRole}`, payload);
    return res.data;
  } catch (error) {
    console.error("Role selection failed:", error);
    throw error;
  }
};

export default postRoleSelection;
