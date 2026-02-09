import { create } from "zustand";

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
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export const setAppError = (error: AppError) => {
  useAppErrorStore.setState({ error });
};

export const clearAppError = () => {
  useAppErrorStore.setState({ error: null });
};
