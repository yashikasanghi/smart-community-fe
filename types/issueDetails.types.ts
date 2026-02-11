import { STATUS } from "@/constants/issueDetails";
import { IssueDetailsData } from "./issues.types";

export type IssueStatus = (typeof STATUS)[keyof typeof STATUS];
export type StatusStage =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed"
  | "reopen"
  | "rejected";

export type Status =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "REJECTED"
  | "CLOSED"
  | "REOPEN";

export type AddCommentData = {
  addComment: {
    id: string;
    userId: string;
    userName?: string;
    text: string;
    createdAt: string;
  };
};

export type AddCommentVars = {
  input: {
    issueId: string;
    text: string;
  };
};

export type UpdateIssueStatusData = {
  updateIssueStatus: {
    __typename?: string;
    id: string;
    status: string;
    updatedAt: string;
  };
};

export type UpdateIssueStatusVars = {
  issueId: string;
  status: IssueStatus;
};

export type Issue = IssueDetailsData["issue"];
export type IssueComment = NonNullable<Issue["comments"]>[number];

export type PartialUser = {
  role?: string;
  firstName?: string;
  _id?: string;
  id?: string;
  userId?: string;
};

export type ActionCardProps = {
  title: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel: string;
  onSecondary: () => void;
  disabled?: boolean;
  variant: "success" | "danger";
};

export type OutlinedButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  intent: "primary" | "danger";
  accessibilityLabel?: string;
};

export type StatusTrackerProps = {
  stage: StatusStage;
  openAchieved: boolean;
  inProgressAchieved: boolean;
  resolvedAchieved: boolean;
  isInProgress: boolean;
  canMoveToInProgress: boolean;
  canMoveToResolved: boolean;
  isUpdating: boolean;
  onMarkInProgress: () => void;
  onMarkResolved: () => void;
};

export type ErrorStateProps = {
  message: string;
  onRetry?: () => void;
};
