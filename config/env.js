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
export const JSNOTIFY_LOKI_URL = ENV.JSNOTIFY_LOKI_URL ?? "";
export const JSNOTIFY_ENABLED = ENV.JSNOTIFY_ENABLED ?? "false";
export const JSNOTIFY_APP_NAME = ENV.JSNOTIFY_APP_NAME ?? "";
export const JSNOTIFY_ENV = ENV.JSNOTIFY_ENV ?? "";
