import { create } from "zustand";

export type NotificationItem = {
  id: string;
  issueId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: string;
};

type NotificationsState = {
  count: number;
  items: NotificationItem[];
  lastFetchedAt: number | null;
  setCount: (count: number) => void;
  setItems: (items: NotificationItem[]) => void;
  setLastFetchedAt: (ts: number | null) => void;
  reset: () => void;
};

export const useNotificationsStore = create<NotificationsState>((set) => ({
  count: 0,
  items: [],
  lastFetchedAt: null,
  setCount: (count) => set({ count }),
  setItems: (items) => set({ items }),
  setLastFetchedAt: (ts) => set({ lastFetchedAt: ts }),
  reset: () => set({ count: 0, items: [], lastFetchedAt: null }),
}));
