import { useEffect } from "react";
import { NOTIFICATION_BASE_URL } from "@/config/env";
import { getAccessToken } from "@/utils/tokenStorage";
import { fetchNotificationCount } from "@/services/notifications";
import { useAuthStore } from "@/store/authStore";
import { useNotificationsStore } from "@/store/notificationsStore";

type NotificationEvent = {
  type?: string;
};

let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let reconnectAttempts = 0;
let currentUserId: string | null = null;
let currentToken: string | null = null;
let isConnecting = false;

const buildWsUrl = (token: string) => {
  const base = NOTIFICATION_BASE_URL?.replace(/\/$/, "") ?? "";
  const wsBase = base.startsWith("https")
    ? base.replace(/^https/, "wss")
    : base.replace(/^http/, "ws");
  return `${wsBase}/notifications/ws?token=${encodeURIComponent(token)}`;
};

const clearReconnect = () => {
  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
};

const closeSocket = () => {
  clearReconnect();
  if (socket) {
    socket.close();
    socket = null;
  }
  reconnectAttempts = 0;
  currentToken = null;
  currentUserId = null;
};

export const useNotificationStream = () => {
  const user = useAuthStore((state) => state.user);
  const setCount = useNotificationsStore((state) => state.setCount);
  const setLastFetchedAt = useNotificationsStore(
    (state) => state.setLastFetchedAt,
  );

  useEffect(() => {
    let isActive = true;

    const connect = async () => {
      if (!isActive || isConnecting) return;
      const userId = String(user?.userId || user?.id || user?._id || "");
      if (!userId) return;
      isConnecting = true;

      try {
        const token = await getAccessToken();
        if (!isActive || !token) {
          isConnecting = false;
          return;
        }

        if (
          socket &&
          socket.readyState === WebSocket.OPEN &&
          currentUserId === userId &&
          currentToken === token
        ) {
          isConnecting = false;
          return;
        }

        closeSocket();
        currentUserId = userId;
        currentToken = token;
        socket = new WebSocket(buildWsUrl(token));

        socket.onopen = async () => {
          reconnectAttempts = 0;
          isConnecting = false;
          try {
            const value = await fetchNotificationCount();
            if (!isActive) return;
            setCount(value ?? 0);
            setLastFetchedAt(Date.now());
          } catch {
            // ignore
          }
        };

        socket.onmessage = async (event) => {
          let payload: NotificationEvent | null = null;
          try {
            payload = JSON.parse(event.data as string);
          } catch {
            payload = null;
          }
          if (!payload || payload.type !== "notification.created") return;
          try {
            const value = await fetchNotificationCount();
            if (!isActive) return;
            setCount(value ?? 0);
            setLastFetchedAt(Date.now());
          } catch {
            // ignore
          }
        };

        socket.onerror = () => {
          socket?.close();
        };

        socket.onclose = () => {
          isConnecting = false;
          if (!isActive) return;
          clearReconnect();
          const delay = Math.min(30000, 1000 * 2 ** reconnectAttempts);
          reconnectAttempts += 1;
          reconnectTimer = setTimeout(() => {
            connect();
          }, delay);
        };
      } catch {
        isConnecting = false;
      }
    };

    if (!user) {
      closeSocket();
      return () => {
        isActive = false;
      };
    }

    connect();

    return () => {
      isActive = false;
    };
  }, [setCount, setLastFetchedAt, user]);
};
