import { create } from "zustand";
import { logJsNotify } from "@/utils/jsnotify";

type AppError = {
  message: string;
  source?: string;
};

type AppErrorState = {
  error: AppError | null;
  setError: (error: AppError) => void;
  clearError: () => void;
};

export const useAppErrorStore = create<AppErrorState>((set) => ({
  error: null,
  setError: (error) => {
    void logJsNotify({
      level: "error",
      message: error.message,
      source: error.source ?? "app",
    });
    set({ error });
  },
  clearError: () => set({ error: null }),
}));

export const setAppError = (error: AppError) => {
  void logJsNotify({
    level: "error",
    message: error.message,
    source: error.source ?? "app",
  });
  useAppErrorStore.setState({ error });
};

export const clearAppError = () => {
  useAppErrorStore.setState({ error: null });
};
