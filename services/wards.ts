import { getPincodeDetails } from "@/constants/api-end-points";
import { LocationResponse } from "@/types/location.types";
import { issueApi } from "./api";

const fetchWardsByPincode = async (
  pincode: string,
): Promise<{
  state: string;
  city: string;
  wards: { label: string; value: string }[];
}> => {
  try {
    const res = await issueApi.get<LocationResponse>(
      `${getPincodeDetails}${pincode}`,
    );

    return {
      state: res.data.state,
      city: res.data.city,
      wards: res.data.wards.map((w) => ({
        label: w.wardName,
        value: w.wardID,
      })),
    };
  } catch (error) {
    console.error("Failed to fetch wards by pincode", error);
    throw error;
  }
};

export default fetchWardsByPincode;
