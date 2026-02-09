import axios from "axios";
import { NOTIFICATION_BASE_URL } from "@/config/env";
import { getAccessToken } from "@/utils/tokenStorage";
import { setAppError } from "@/store/appErrorStore";

const graphqlUrl = `${NOTIFICATION_BASE_URL}/notifications`;

const request = async <T>(query: string, variables?: Record<string, any>) => {
  const token = await getAccessToken();
  let res;
  try {
    res = await axios.post(
      graphqlUrl,
      { query, variables },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        timeout: 10000,
      },
    );
  } catch (error: any) {
    if (!error?.response) {
      setAppError({
        message: "Service is unavailable. Please try again.",
        source: "network",
      });
    }
    throw error;
  }
  if (res.data?.errors?.length) {
    const message = res.data.errors[0]?.message || "GraphQL error";
    setAppError({ message, source: "graphql" });
    throw new Error(message);
  }
  return res.data?.data as T;
};

export const fetchNotifications = async () => {
  const data = await request<{
    notifications: {
      id: string;
      issueId: string;
      title: string;
      message: string;
      type: string;
      read: boolean;
      createdAt: string;
    }[];
  }>(
    `
      query Notifications {
        notifications {
          id
          issueId
          title
          message
          type
          read
          createdAt
        }
      }
    `,
  );
  return data.notifications ?? [];
};

export const fetchNotificationCount = async () => {
  const data = await request<{ notificationCount: number }>(
    `
      query NotificationCount {
        notificationCount
      }
    `,
  );
  return data.notificationCount ?? 0;
};

export const markNotificationRead = async (
  notificationId?: string,
  all?: boolean,
) => {
  const data = await request<{ markNotificationRead: boolean }>(
    `
      mutation MarkNotificationRead($notificationId: ID, $all: Boolean) {
        markNotificationRead(notificationId: $notificationId, all: $all)
      }
    `,
    { notificationId, all },
  );
  return Boolean(data.markNotificationRead);
};
