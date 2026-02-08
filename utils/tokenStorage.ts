import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/state-keys";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAccessToken = async (accessToken: string) => {
  AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const setTokens = async (accessToken: string, refreshToken: string) => {
  await setAccessToken(accessToken);
  await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getAccessToken = async () => {
  return AsyncStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = async () => {
  return AsyncStorage.getItem(REFRESH_TOKEN);
};

export const clearTokens = async () => {
  await AsyncStorage.removeItem(ACCESS_TOKEN);
  await AsyncStorage.removeItem(REFRESH_TOKEN);
};
