import { STATUS, STATUS_VALUES, DEFAULT_IMAGE } from "@/constants/issueDetails";
import {
  IssueStatus,
  PartialUser,
  IssueComment,
  Status,
} from "@/types/issueDetails.types";
import { toImageUrl } from "./common";

export const normalizeStatus = (status?: Status): IssueStatus => {
  if (!status) return STATUS.OPEN;
  const upper = status.toUpperCase();
  return STATUS_VALUES.has(upper as Status)
    ? (upper as IssueStatus)
    : STATUS.OPEN;
};

export const normalizeRole = (role?: string) => (role ?? "").toUpperCase();

export const getUserId = (user?: PartialUser | null) =>
  user?._id ?? user?.id ?? user?.userId ?? null;

export const sortCommentsByDate = (comments?: IssueComment[]) => {
  if (!comments || comments.length === 0) return [];
  return [...comments].sort((a, b) => {
    const at = new Date(a.createdAt ?? 0).getTime();
    const bt = new Date(b.createdAt ?? 0).getTime();
    return bt - at;
  });
};

export const resolveImageSource = (uri?: string) => {
  const imageUrl = toImageUrl(uri);
  return imageUrl ? { uri: imageUrl } : DEFAULT_IMAGE;
};
