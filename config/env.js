import Constants from "expo-constants";

const ENV = Constants.expoConfig?.extra ?? {};

export const AUTH_BASE_URL =
  ENV.AUTH_BASE_URL ?? "http://localhost:5000/smart-community";
export const ISSUE_BASE_URL =
  ENV.ISSUE_BASE_URL ?? "http://localhost:3000/smart-community";
export const ANALYTICS_BASE_URL =
  ENV.ANALYTICS_BASE_URL ?? "http://localhost:4000/smart-community";
export const NOTIFICATION_BASE_URL =
  ENV.NOTIFICATION_BASE_URL ?? "http://localhost:2000/smart-community";
