import Constants from "expo-constants";

const ENV = Constants.expoConfig?.extra ?? {};

export const AUTH_BASE_URL = ENV.AUTH_BASE_URL;
export const ISSUE_BASE_URL = ENV.ISSUE_BASE_URL;
export const ANALYTICS_BASE_URL = ENV.ANALYTICS_BASE_URL;
