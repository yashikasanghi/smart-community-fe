import Constants from "expo-constants";
import { Platform } from "react-native";
import {
  JSNOTIFY_APP_NAME,
  JSNOTIFY_ENABLED,
  JSNOTIFY_ENV,
  JSNOTIFY_LOKI_URL,
} from "@/config/env";

type JsNotifyPayload = {
  level: "error" | "warn" | "info";
  message: string;
  source?: string;
  context?: Record<string, unknown>;
  stack?: string;
};

const MAX_LOG_CHARS = 8000;

const truncate = (value: string) =>
  value.length > MAX_LOG_CHARS
    ? `${value.slice(0, MAX_LOG_CHARS)}...[truncated]`
    : value;

const getAppName = () =>
  JSNOTIFY_APP_NAME ||
  Constants.expoConfig?.name ||
  "smart-community-mobile";

const getEnv = () =>
  JSNOTIFY_ENV || (global.__DEV__ ? "development" : "production");

const isEnabled = () =>
  JSNOTIFY_ENABLED !== "false" && Boolean(JSNOTIFY_LOKI_URL);

export const logJsNotify = async (payload: JsNotifyPayload) => {
  if (!isEnabled()) return;

  try {
    const ts = `${Date.now()}000000`;
    const body = {
      streams: [
        {
          stream: {
            app: getAppName(),
            env: getEnv(),
            platform: Platform.OS,
            type: "jsnotify",
            level: payload.level,
            source: payload.source ?? "unknown",
          },
          values: [
            [
              ts,
              JSON.stringify({
                message: truncate(payload.message),
                stack: payload.stack ? truncate(payload.stack) : undefined,
                context: payload.context,
              }),
            ],
          ],
        },
      ],
    };

    await fetch(JSNOTIFY_LOKI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    // avoid crashing the app if log delivery fails
  }
};

export const installGlobalErrorHandler = () => {
  const errorUtils = (global as any).ErrorUtils;
  if (!errorUtils?.setGlobalHandler) return;

  const defaultHandler = errorUtils.getGlobalHandler?.();
  errorUtils.setGlobalHandler((error: Error, isFatal?: boolean) => {
    void logJsNotify({
      level: "error",
      message: error?.message || "Unhandled JS error",
      source: "global",
      stack: error?.stack,
      context: { isFatal: Boolean(isFatal) },
    });
    if (defaultHandler) {
      defaultHandler(error, isFatal);
    }
  });
};
