import { create } from "zustand";

type StatusCount = { status: string; count: number };

type WardHealthScore = {
  score: number;
  total: number;
  resolutionRate: number;
  avgResolutionHours: number;
  aiExplanation: string | null;
  statusCounts: StatusCount[];
};

type AnalyticsState = {
  wardHealthScore: WardHealthScore | null;
  issueDensitySummary: string | null;
  issueCategoryCounts: { category: string; count: number }[];
  issuesUpdatedAt: string | null;
  lastFetchedIssuesUpdatedAt: string | null;
  setWardHealthScore: (payload: WardHealthScore | null) => void;
  setIssueDensitySummary: (summary: string | null) => void;
  setIssueCategoryCounts: (
    counts: { category: string; count: number }[],
  ) => void;
  setIssuesUpdatedAt: (value: string | null) => void;
  setLastFetchedIssuesUpdatedAt: (value: string | null) => void;
  reset: () => void;
};

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  wardHealthScore: null,
  issueDensitySummary: null,
  issueCategoryCounts: [],
  issuesUpdatedAt: null,
  lastFetchedIssuesUpdatedAt: null,
  setWardHealthScore: (payload) => set({ wardHealthScore: payload }),
  setIssueDensitySummary: (summary) => set({ issueDensitySummary: summary }),
  setIssueCategoryCounts: (counts) => set({ issueCategoryCounts: counts }),
  setIssuesUpdatedAt: (value) => set({ issuesUpdatedAt: value }),
  setLastFetchedIssuesUpdatedAt: (value) =>
    set({ lastFetchedIssuesUpdatedAt: value }),
  reset: () =>
    set({
      wardHealthScore: null,
      issueDensitySummary: null,
      issueCategoryCounts: [],
      issuesUpdatedAt: null,
      lastFetchedIssuesUpdatedAt: null,
    }),
}));
