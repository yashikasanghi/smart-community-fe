import { toImageUrl } from "@/helpers/common";
import { IssueDetailsData } from "@/types/issues.types";
import { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IssueProgress, { StatusStage } from "./IssueProgress";

const DEFAULT_TITLE = "Issue Details";
const DEFAULT_DESCRIPTION = "No description provided.";
const ISSUE_IMAGE_SIZE = 250;
const DEFAULT_IMAGE = require("@/assets/images/default-issue-img.jpg");

const styles = StyleSheet.create({
  metaCard: {
    shadowColor: "#000",
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

type Issue = IssueDetailsData["issue"];

type IssueBodyProps = {
  issue?: Issue;
  stage: StatusStage;
  openAchieved: boolean;
  inProgressAchieved: boolean;
  resolvedAchieved: boolean;
  isInProgress: boolean;
  isClosed: boolean;
  isUpdating: boolean;
  actionError?: string | null;
  canMoveToInProgress: boolean;
  canMoveToResolved: boolean;
  canRejectIssue: boolean;
  canHandleRejected: boolean;
  canCloseIssue: boolean;
  onMarkInProgress: () => void;
  onMarkResolved: () => void;
  onReject: () => void;
  onClose: () => void;
  onReopen: () => void;
};

type ActionCardProps = {
  title: string;
  description: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel: string;
  onSecondary: () => void;
  disabled?: boolean;
  variant: "success" | "danger";
};

type FilledButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
};

const FilledButton = memo(function FilledButton({
  label,
  onPress,
  disabled = false,
  accessibilityLabel,
}: FilledButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-1 py-3 rounded-full ${
        disabled ? "bg-blue-200" : "bg-blue-600"
      }`}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
    >
      <Text
        className={`text-center font-semibold ${
          disabled ? "text-blue-100" : "text-white"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
});

const ActionCard = memo(function ActionCard({
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  disabled = false,
  variant,
}: ActionCardProps) {
  const containerClass =
    variant === "success"
      ? "border-green-100 bg-green-50"
      : "border-red-100 bg-red-50";

  return (
    <View className={`mb-6 rounded-2xl border px-4 py-4 ${containerClass}`}>
      <Text className="text-gray-800 font-medium mb-1">{title}</Text>
      <Text className="text-gray-700 mb-3">{description}</Text>
      <View className="flex-row items-center gap-3">
        <FilledButton
          label={primaryLabel}
          onPress={onPrimary}
          disabled={disabled}
          accessibilityLabel={primaryLabel}
        />
        <OutlinedButton
          label={secondaryLabel}
          onPress={onSecondary}
          disabled={disabled}
          intent="primary"
          accessibilityLabel={secondaryLabel}
        />
      </View>
    </View>
  );
});

type OutlinedButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  intent: "primary" | "danger";
  accessibilityLabel?: string;
};

const OutlinedButton = memo(function OutlinedButton({
  label,
  onPress,
  disabled = false,
  intent,
  accessibilityLabel,
}: OutlinedButtonProps) {
  const borderClass = intent === "danger" ? "border-red-600" : "border-blue-600";
  const textClass = intent === "danger" ? "text-red-600" : "text-blue-600";

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-1 py-3 rounded-full border ${
        disabled ? "border-gray-300 bg-gray-100" : `bg-white ${borderClass}`
      }`}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled }}
    >
      <Text
        className={`text-center font-semibold ${
          disabled ? "text-gray-400" : textClass
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
});

const resolveImageSource = (uri?: string) => {
  const imageUrl = toImageUrl(uri);
  return imageUrl ? { uri: imageUrl } : DEFAULT_IMAGE;
};

const IssueBody = memo(function IssueBody({
  issue,
  stage,
  openAchieved,
  inProgressAchieved,
  resolvedAchieved,
  isInProgress,
  isClosed,
  isUpdating,
  actionError,
  canMoveToInProgress,
  canMoveToResolved,
  canRejectIssue,
  canHandleRejected,
  canCloseIssue,
  onMarkInProgress,
  onMarkResolved,
  onReject,
  onClose,
  onReopen,
}: IssueBodyProps) {
  return (
    <>
      <Text className="text-xl font-semibold text-gray-900 mb-3">
        {issue?.shortDescription ?? DEFAULT_TITLE}
      </Text>

      <View className="mb-4 items-center">
        <Image
          source={resolveImageSource(issue?.images?.[0])}
          className="rounded-xl"
          style={styles.issueImage}
          resizeMode="cover"
          accessibilityLabel="Issue image"
          accessible
        />
      </View>

      <IssueProgress
        stage={stage}
        openAchieved={openAchieved}
        inProgressAchieved={inProgressAchieved}
        resolvedAchieved={resolvedAchieved}
        isInProgress={isInProgress}
        canMoveToInProgress={canMoveToInProgress}
        canMoveToResolved={canMoveToResolved}
        isUpdating={isUpdating}
        onMarkInProgress={onMarkInProgress}
        onMarkResolved={onMarkResolved}
      />

      {actionError && (
        <View className="mb-4">
          <Text className="text-red-600 text-sm text-center">
            {actionError}
          </Text>
        </View>
      )}

      {canRejectIssue && (
        <View className="mb-6">
          <OutlinedButton
            label="Reject"
            onPress={onReject}
            disabled={isUpdating}
            intent="danger"
            accessibilityLabel="Reject issue"
          />
        </View>
      )}

      {stage === "rejected" && (
        <View className="mb-6">
          <Text className="text-red-600 font-medium text-center">Rejected.</Text>
        </View>
      )}

      {canHandleRejected && (
        <ActionCard
          title="Your issue was rejected."
          description="Would you like to close it or reopen?"
          primaryLabel={isUpdating ? "Closing..." : "Close"}
          onPrimary={onClose}
          secondaryLabel="Reopen"
          onSecondary={onReopen}
          disabled={isUpdating}
          variant="danger"
        />
      )}

      {isClosed && (
        <View className="mb-6">
          <Text className="text-green-700 font-medium text-center">
            Hurray! Issue is closed successfully.
          </Text>
        </View>
      )}

      {canCloseIssue && (
        <ActionCard
          title="Your issue was resolved."
          description="Would you like to close it or reopen?"
          primaryLabel={isUpdating ? "Closing..." : "Close"}
          onPrimary={onClose}
          secondaryLabel="Reopen"
          onSecondary={onReopen}
          disabled={isUpdating}
          variant="success"
        />
      )}

      <View className="bg-gray-50 rounded-2xl px-4 py-4" style={styles.metaCard}>
        <Text className="text-gray-800 font-medium mb-1">Description</Text>
        <Text className="text-gray-600">
          {issue?.description ?? DEFAULT_DESCRIPTION}
        </Text>
      </View>

      <View className="bg-gray-50 rounded-2xl px-4 py-4" style={styles.metaCard}>
        <Text className="text-gray-800 font-medium mb-1">Location</Text>
        <Text className="text-gray-600 text-sm">
          {issue?.location?.address ?? "-"}
          {issue?.location?.city ?? ""} {issue?.location?.state ?? ""}
          {", "}
          {issue?.location?.pincode ?? ""}
        </Text>
      </View>
    </>
  );
});

export default IssueBody;
