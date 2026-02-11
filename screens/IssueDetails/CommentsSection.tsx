import { formatDateTime } from "@/helpers/common";
import { IssueDetailsData } from "@/types/issues.types";
import { memo, useCallback } from "react";
import type { ReactNode } from "react";
import {
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LIST_CONFIG = {
  initialNumToRender: 8,
  maxToRenderPerBatch: 10,
  windowSize: 7,
};

const COMMENT_PLACEHOLDER = "Write a comment...";
const EMPTY_COMMENTS_TEXT = "No comments yet.";

const styles = StyleSheet.create({
  heroCard: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 18,
    elevation: 10,
  },
});

type IssueComment = NonNullable<IssueDetailsData["issue"]["comments"]>[number];

type CommentsSectionProps = {
  header: ReactNode;
  comments: IssueComment[];
  commentText: string;
  onChangeComment: (text: string) => void;
  onSubmitComment: () => void;
  canSubmit: boolean;
  isAdding: boolean;
};

const CommentItem = memo(function CommentItem({
  comment,
}: {
  comment: IssueComment;
}) {
  return (
    <View className="bg-white border border-gray-100 rounded-2xl px-4 py-3">
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-gray-900 font-medium">
          {comment.userName ?? "Unknown User"}
        </Text>
        <Text className="text-gray-400 text-xs">
          {formatDateTime(comment.createdAt)}
        </Text>
      </View>
      <Text className="text-gray-700">{comment.text}</Text>
    </View>
  );
});

const CommentsSection = memo(function CommentsSection({
  header,
  comments,
  commentText,
  onChangeComment,
  onSubmitComment,
  canSubmit,
  isAdding,
}: CommentsSectionProps) {
  const renderComment = useCallback<ListRenderItem<IssueComment>>(
    ({ item }) => <CommentItem comment={item} />,
    [],
  );

  const headerContent = (
    <View className="bg-white rounded-3xl px-6 py-6 mb-6" style={styles.heroCard}>
      {header}
      <View className="mt-6">
        <Text className="text-gray-800 font-medium mb-2">Comments</Text>
        <View className="bg-gray-50 rounded-2xl px-4 py-3 mb-4">
          <TextInput
            placeholder={COMMENT_PLACEHOLDER}
            accessibilityLabel="Write a comment"
            value={commentText}
            onChangeText={onChangeComment}
            className="text-gray-800"
            multiline
          />
          <TouchableOpacity
            onPress={onSubmitComment}
            disabled={!canSubmit || isAdding}
            className={`mt-3 px-4 py-2 rounded-full self-end ${
              canSubmit ? "bg-blue-600" : "bg-gray-300"
            }`}
            accessibilityRole="button"
            accessibilityLabel="Post comment"
            accessibilityState={{ disabled: !canSubmit || isAdding }}
          >
            <Text className="text-white text-sm font-semibold">
              {isAdding ? "Posting..." : "Post"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <FlatList
      className="w-full px-6 -mt-8"
      showsVerticalScrollIndicator={false}
      data={comments}
      keyExtractor={(item, index) => item.id ?? String(index)}
      renderItem={renderComment}
      ItemSeparatorComponent={() => <View className="h-3" />}
      initialNumToRender={LIST_CONFIG.initialNumToRender}
      maxToRenderPerBatch={LIST_CONFIG.maxToRenderPerBatch}
      windowSize={LIST_CONFIG.windowSize}
      removeClippedSubviews
      ListHeaderComponent={headerContent}
      ListEmptyComponent={
        <Text className="text-gray-400 text-sm">{EMPTY_COMMENTS_TEXT}</Text>
      }
    />
  );
});

export default CommentsSection;
