import { ISSUE_BASE_URL } from "@/config/env";

export const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "-";
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.toLocaleString("en-US", { year: "2-digit" });
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
  return `${month} ${day}' ${year}, ${time}`;
};

export const toImageUrl = (path?: string) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = ISSUE_BASE_URL?.replace(/\/smart-community\/?$/, "") ?? "";
  return `${base}${path}`;
};
