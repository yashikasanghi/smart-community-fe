import { Ionicons } from "@expo/vector-icons";
import { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const COLORS = {
  success: "#22C55E",
  muted: "#D1D5DB",
  active: "#2563EB",
} as const;

const HIT_SLOP = { top: 6, bottom: 6, left: 6, right: 6 };

export type StatusStage =
  | "open"
  | "in_progress"
  | "resolved"
  | "closed"
  | "reopen"
  | "rejected";

type IssueProgressProps = {
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

const IssueProgress = memo(function IssueProgress({
  stage,
  openAchieved,
  inProgressAchieved,
  resolvedAchieved,
  isInProgress,
  canMoveToInProgress,
  canMoveToResolved,
  isUpdating,
  onMarkInProgress,
  onMarkResolved,
}: IssueProgressProps) {
  const openLabel =
    stage === "reopen" || stage === "closed" ? "Reopen" : "Open";
  const openLabelClass =
    stage === "open" || stage === "reopen"
      ? "text-blue-600"
      : stage === "in_progress" || stage === "resolved" || stage === "closed"
        ? "text-green-600"
        : "text-gray-700";
  const isOpenActive = stage === "open" || stage === "reopen";

  return (
    <View className="flex-row items-center justify-between mb-6">
      {/* Open */}
      <View className="items-center flex-1">
        {isOpenActive ? (
          <View className="w-6 h-6 rounded-full border-2 border-blue-600 items-center justify-center">
            <View className="w-2 h-2 rounded-full bg-blue-600" />
          </View>
        ) : openAchieved ? (
          <Ionicons
            name="checkmark-circle"
            size={22}
            color={COLORS.success}
          />
        ) : (
          <Ionicons name="ellipse" size={22} color={COLORS.muted} />
        )}
        <Text className={`text-xs mt-1 ${openLabelClass}`}>{openLabel}</Text>
      </View>

      <View className="h-px bg-gray-300 flex-1 mx-1" />

      {/* In Progress */}
      <View className="items-center flex-1">
        <TouchableOpacity
          disabled={!canMoveToInProgress || isUpdating}
          onPress={onMarkInProgress}
          className="items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Mark issue as in progress"
          accessibilityState={{
            disabled: !canMoveToInProgress || isUpdating,
          }}
          hitSlop={HIT_SLOP}
        >
          {isInProgress ? (
            <View className="w-6 h-6 rounded-full border-2 border-blue-600 items-center justify-center">
              <View className="w-2 h-2 rounded-full bg-blue-600" />
            </View>
          ) : inProgressAchieved ? (
            <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
          ) : (
            <Ionicons name="ellipse" size={18} color={COLORS.muted} />
          )}
        </TouchableOpacity>
        <Text
          className={`text-xs mt-1 text-center ${
            isInProgress
              ? "text-blue-600 font-semibold"
              : inProgressAchieved
                ? "text-green-600 font-semibold"
                : "text-gray-400"
          }`}
        >
          In Progress
        </Text>
      </View>

      <View className="h-px bg-gray-300 flex-1 mx-1" />

      {/* Resolved */}
      <View className="items-center flex-1">
        <TouchableOpacity
          disabled={!canMoveToResolved || isUpdating}
          onPress={onMarkResolved}
          className="items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Mark issue as resolved"
          accessibilityState={{
            disabled: !canMoveToResolved || isUpdating,
          }}
          hitSlop={HIT_SLOP}
        >
          {resolvedAchieved ? (
            <Ionicons name="checkmark-circle" size={18} color={COLORS.success} />
          ) : (
            <Ionicons name="ellipse" size={18} color={COLORS.muted} />
          )}
        </TouchableOpacity>
        <Text
          className={`text-xs mt-1 ${
            resolvedAchieved ? "text-green-600 font-semibold" : "text-gray-400"
          }`}
        >
          Resolved
        </Text>
      </View>
    </View>
  );
});

export default IssueProgress;
