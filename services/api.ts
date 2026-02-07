import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  ANALYTICS_BASE_URL,
  AUTH_BASE_URL,
  ISSUE_BASE_URL,
} from "../config/env";

// shared interceptor
const attachAuthToken = async (config: any) => {
  const token = await AsyncStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// auth service
export const authApi = axios.create({
  baseURL: AUTH_BASE_URL,
  timeout: 10000,
});

// issue service
export const issueApi = axios.create({
  baseURL: ISSUE_BASE_URL,
  timeout: 10000,
});

// analytics service
export const analyticsApi = axios.create({
  baseURL: ANALYTICS_BASE_URL,
  timeout: 10000,
});

// attach interceptor to all
authApi.interceptors.request.use(attachAuthToken);
issueApi.interceptors.request.use(attachAuthToken);
analyticsApi.interceptors.request.use(attachAuthToken);
