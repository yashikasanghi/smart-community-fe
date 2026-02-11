import { IssueStatus, StatusStage } from "@/types/issueDetails.types";
import { StyleSheet } from "react-native";

export const STATUS = {
  OPEN: "OPEN",
  IN_PROGRESS: "IN_PROGRESS",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
  CLOSED: "CLOSED",
  REOPEN: "REOPEN",
} as const;

export const ROLE = {
  AUTHORITY: "AUTHORITY",
  CITIZEN: "CITIZEN",
} as const;

export const LIST_CONFIG = {
  initialNumToRender: 8,
  maxToRenderPerBatch: 10,
  windowSize: 7,
};

export const COLORS = {
  shadow: "#000",
  success: "#22C55E",
  muted: "#D1D5DB",
} as const;

export const ISSUE_IMAGE_SIZE = 250;
export const COMMENT_PLACEHOLDER = "Write a comment...";
export const DEFAULT_TITLE = "Issue Details";
export const DEFAULT_DESCRIPTION = "No description provided.";
export const EMPTY_COMMENTS_TEXT = "No comments yet.";
export const ERROR_LOAD_MESSAGE = "Unable to load issue details.";
export const ERROR_UPDATE_MESSAGE = "Unable to update issue status.";
export const ERROR_COMMENT_MESSAGE = "Unable to post comment.";

export const DEFAULT_IMAGE = require("@/assets/images/default-issue-img.jpg");

export const HIT_SLOP = { top: 6, bottom: 6, left: 6, right: 6 };

export const styles = StyleSheet.create({
  heroCard: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 10,
  },
  metaCard: {
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  issueImage: {
    width: ISSUE_IMAGE_SIZE,
    height: ISSUE_IMAGE_SIZE,
  },
});

export const STATUS_TO_STAGE: Record<IssueStatus, StatusStage> = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
  REOPEN: "reopen",
  REJECTED: "rejected",
};

export const STATUS_VALUES = new Set(Object.values(STATUS));
