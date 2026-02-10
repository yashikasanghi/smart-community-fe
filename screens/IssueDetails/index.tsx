import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import BottomTabs from "@/components/navigation/BottomTabs";
import { UPDATE_ISSUE_STATUS } from "@/graphql/mutations/issues";
import { ADD_COMMENT, ISSUE_DETAILS } from "@/graphql/queries/issues";
import { useProfile } from "@/hooks/useProfile";
import { useNotificationsStore } from "@/store/notificationsStore";
import { IssueDetailsData } from "@/types/issues.types";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";
import { memo, useCallback, useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CommentsSection from "./CommentsSection";
import IssueBody from "./IssueBody";
import {
  STATUS_TO_STAGE,
  ERROR_UPDATE_MESSAGE,
  ERROR_COMMENT_MESSAGE,
  STATUS,
  ROLE,
  ERROR_LOAD_MESSAGE,
} from "@/constants/issueDetails";
import {
  normalizeStatus,
  sortCommentsByDate,
  normalizeRole,
  getUserId,
} from "@/helpers/issueDetails.helper";
import {
  ErrorStateProps,
  PartialUser,
  IssueStatus,
  AddCommentData,
  AddCommentVars,
  UpdateIssueStatusData,
  UpdateIssueStatusVars,
  Status,
} from "@/types/issueDetails.types";

const ErrorState = memo(function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="px-6 py-8 items-center">
      <Text className="text-red-600 font-medium mb-3">{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className="px-5 py-2 rounded-full border border-blue-600 bg-white"
          accessibilityRole="button"
          accessibilityLabel="Retry loading issue details"
        >
          <Text className="text-blue-600 font-semibold">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

type UseIssueDetailsParams = {
  issueId?: string;
  user?: PartialUser | null;
  lastFetchedAt?: string | number | null;
};

const useIssueDetails = ({
  issueId,
  user,
  lastFetchedAt,
}: UseIssueDetailsParams) => {
  const { data, loading, error, refetch } = useQuery<IssueDetailsData>(
    ISSUE_DETAILS,
    {
      variables: { id: issueId ?? "" },
      skip: !issueId || !user || !lastFetchedAt,
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      notifyOnNetworkStatusChange: true,
    },
  );

  const issue = data?.issue;
  const status = normalizeStatus(issue?.status as Status);
  const stage = STATUS_TO_STAGE[status];
  const comments = useMemo(
    () => sortCommentsByDate(issue?.comments),
    [issue?.comments],
  );

  return {
    issue,
    status,
    stage,
    comments,
    loading,
    error,
    refetch,
    isLoading: loading && !issue,
  };
};

type UseIssueActionsResult = {
  addComment: (text: string) => Promise<boolean>;
  updateStatus: (status: IssueStatus) => Promise<void>;
  isAdding: boolean;
  isUpdatingStatus: boolean;
};

const useIssueActions = (
  issueId: string | undefined,
  setActionError: (message: string | null) => void,
): UseIssueActionsResult => {
  const [addCommentMutation, { loading: isAdding }] = useMutation<
    AddCommentData,
    AddCommentVars
  >(ADD_COMMENT);

  const [updateIssueStatusMutation, { loading: isUpdatingStatus }] =
    useMutation<UpdateIssueStatusData, UpdateIssueStatusVars>(
      UPDATE_ISSUE_STATUS,
    );

  const updateStatus = useCallback(
    async (nextStatus: IssueStatus) => {
      if (!issueId || isUpdatingStatus) return;
      setActionError(null);
      try {
        await updateIssueStatusMutation({
          variables: { issueId, status: nextStatus },
          optimisticResponse: {
            updateIssueStatus: {
              __typename: "Issue",
              id: issueId,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
            },
          },
          update: (cache, { data: mutationData }) => {
            const updated = mutationData?.updateIssueStatus;
            if (!updated) return;
            const issueCacheId = cache.identify({
              __typename: "Issue",
              id: issueId,
            });
            if (!issueCacheId) return;
            cache.modify({
              id: issueCacheId,
              fields: {
                status() {
                  return updated.status;
                },
                updatedAt() {
                  return updated.updatedAt;
                },
              },
            });
          },
        });
      } catch (err) {
        console.error("[IssueDetails] updateIssueStatus failed", err);
        setActionError(ERROR_UPDATE_MESSAGE);
      }
    },
    [issueId, isUpdatingStatus, setActionError, updateIssueStatusMutation],
  );

  const addComment = useCallback(
    async (text: string) => {
      if (!issueId || !text) return false;
      setActionError(null);
      try {
        await addCommentMutation({
          variables: {
            input: {
              issueId,
              text,
            },
          },
          refetchQueries: [
            {
              query: ISSUE_DETAILS,
              variables: { id: issueId },
            },
          ],
          awaitRefetchQueries: true,
          update: (cache, { data: mutationData }) => {
            const newComment = mutationData?.addComment;
            if (!newComment) return;
            const issueCacheId = cache.identify({
              __typename: "Issue",
              id: issueId,
            });
            if (!issueCacheId) return;
            const newCommentRef = cache.writeFragment({
              data: newComment,
              fragment: gql`
                fragment NewComment on Comment {
                  id
                  userId
                  userName
                  text
                  createdAt
                }
              `,
            });
            cache.modify({
              id: issueCacheId,
              fields: {
                comments(existing = []) {
                  return [...existing, newCommentRef];
                },
              },
            });
          },
        });
        return true;
      } catch (err) {
        console.error("[IssueDetails] addComment failed", err);
        setActionError(ERROR_COMMENT_MESSAGE);
        return false;
      }
    },
    [addCommentMutation, issueId, setActionError],
  );

  return {
    addComment,
    updateStatus,
    isAdding,
    isUpdatingStatus,
  };
};

export default function IssueDetailsScreen() {
  const { user } = useProfile();
  const { issueId: issueIdParam } = useLocalSearchParams<{
    issueId?: string;
  }>();
  const issueId =
    typeof issueIdParam === "string" && issueIdParam.length > 0
      ? issueIdParam
      : undefined;
  const lastFetchedAt = useNotificationsStore((state) => state.lastFetchedAt);

  const [actionError, setActionError] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const trimmedComment = commentText.trim();

  const {
    issue,
    status,
    stage,
    comments,
    loading,
    error: queryError,
    refetch,
    isLoading,
  } = useIssueDetails({ issueId, user, lastFetchedAt });

  const { addComment, updateStatus, isAdding, isUpdatingStatus } =
    useIssueActions(issueId, setActionError);

  const { openAchieved, inProgressAchieved, resolvedAchieved } = useMemo(() => {
    return {
      openAchieved:
        stage === "in_progress" ||
        stage === "resolved" ||
        stage === "reopen" ||
        stage === "closed",
      inProgressAchieved: stage === "resolved" || stage === "closed",
      resolvedAchieved: stage === "resolved" || stage === "closed",
    };
  }, [stage]);

  const isInProgress = status === STATUS.IN_PROGRESS;
  const isResolved = status === STATUS.RESOLVED;
  const isClosed = status === STATUS.CLOSED;

  const normalizedRole = normalizeRole(user?.role);
  const isAuthority = normalizedRole === ROLE.AUTHORITY;
  const isCitizen = normalizedRole === ROLE.CITIZEN;
  const currentUserId = getUserId(user as PartialUser);
  const isCreator =
    Boolean(currentUserId) &&
    issue?.createdBy?.userId === String(currentUserId);

  const canMoveToInProgress =
    isAuthority && (status === STATUS.OPEN || status === STATUS.REOPEN);
  const canMoveToResolved = isAuthority && status === STATUS.IN_PROGRESS;
  const canRejectIssue = isAuthority && status === STATUS.OPEN;
  const canCloseIssue = isCitizen && isResolved && isCreator;
  const canHandleRejected = isCitizen && isCreator && stage === "rejected";

  const handleAddComment = useCallback(async () => {
    if (!trimmedComment) return;
    const ok = await addComment(trimmedComment);
    if (ok) {
      setCommentText("");
    }
  }, [addComment, trimmedComment]);

  const showQueryError = Boolean(queryError) && !issue && !isLoading;

  const markInProgress = useCallback(
    () => updateStatus(STATUS.IN_PROGRESS),
    [updateStatus],
  );
  const markResolved = useCallback(
    () => updateStatus(STATUS.RESOLVED),
    [updateStatus],
  );
  const markRejected = useCallback(
    () => updateStatus(STATUS.REJECTED),
    [updateStatus],
  );
  const markClosed = useCallback(
    () => updateStatus(STATUS.CLOSED),
    [updateStatus],
  );
  const markReopen = useCallback(
    () => updateStatus(STATUS.REOPEN),
    [updateStatus],
  );

  const issueBody = (
    <IssueBody
      issue={issue}
      stage={stage}
      openAchieved={openAchieved}
      inProgressAchieved={inProgressAchieved}
      resolvedAchieved={resolvedAchieved}
      isInProgress={isInProgress}
      isClosed={isClosed}
      isUpdating={isUpdatingStatus}
      actionError={actionError}
      canMoveToInProgress={canMoveToInProgress}
      canMoveToResolved={canMoveToResolved}
      canRejectIssue={canRejectIssue}
      canHandleRejected={canHandleRejected}
      canCloseIssue={canCloseIssue}
      onMarkInProgress={markInProgress}
      onMarkResolved={markResolved}
      onReject={markRejected}
      onClose={markClosed}
      onReopen={markReopen}
    />
  );

  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 bg-[#F6F9FC] w-full">
        <Header name={user?.firstName} />
        {showQueryError && (
          <ErrorState message={ERROR_LOAD_MESSAGE} onRetry={() => refetch()} />
        )}
        {isLoading ? (
          <Loader message="Loading issue details..." />
        ) : (
          <CommentsSection
            header={issueBody}
            comments={comments}
            commentText={commentText}
            onChangeComment={setCommentText}
            onSubmitComment={handleAddComment}
            isAdding={isAdding}
            canSubmit={Boolean(trimmedComment)}
          />
        )}

        <BottomTabs />
      </View>
    </ScreenWrapper>
  );
}
