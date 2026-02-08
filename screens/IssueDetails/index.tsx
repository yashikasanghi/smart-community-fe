import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import { ADD_COMMENT, ISSUE_DETAILS } from "@/graphql/queries/issues";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import { IssueDetailsData } from "@/types/issues.types";
import { formatDateTime, toImageUrl } from "@/helpers/common";
import BottomTabs from "@/components/navigation/BottomTabs";

export default function IssueDetailsScreen() {
  const { user } = useProfile();
  const { issueId } = useLocalSearchParams<{ issueId?: string }>();

  const { data, refetch } = useQuery<IssueDetailsData>(ISSUE_DETAILS, {
    variables: { id: issueId },
    skip: !issueId,
    fetchPolicy: "network-only",
  });
  const [commentText, setCommentText] = useState("");
  const [addComment, { loading: isAdding }] = useMutation(ADD_COMMENT);

  const issue = data?.issue;

  const status = issue?.status ?? "OPEN";

  const isOpen = status === "OPEN";
  const isInProgress = status === "IN_PROGRESS";
  const isResolved = status === "RESOLVED";

  const onAddComment = async () => {
    if (!issueId || !commentText.trim()) return;
    await addComment({
      variables: {
        input: {
          issueId,
          text: commentText.trim(),
          createdBy: {},
        },
      },
    });
    setCommentText("");
    refetch();
  };
  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 bg-[#F6F9FC] w-full">
        {/* Header */}
        <Header name={user?.firstName} />

        {/* Content */}
        <ScrollView
          className="w-full px-6 -mt-8"
          showsVerticalScrollIndicator={false}
        >
          {/* Main Card */}
          <View
            className="bg-white rounded-3xl px-6 py-6 mb-6"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.1,
              shadowRadius: 18,
              elevation: 10,
            }}
          >
            {/* Title */}
            <Text className="text-xl font-semibold text-gray-900 mb-3">
              {issue?.shortDescription ?? "Issue Details"}
            </Text>

            {/* Image */}
            <View className="mb-4 items-center">
              <Image
                source={
                  toImageUrl(issue?.images?.[0])
                    ? { uri: toImageUrl(issue?.images?.[0]) as string }
                    : require("@/assets/images/default-issue-img.jpg")
                }
                className="rounded-xl"
                style={{ width: 250, height: 250 }}
                resizeMode="cover"
              />
            </View>

            {/* Status Tracker */}
            <View className="flex-row items-center justify-between mb-6">
              {/* Open */}
              <View className="items-center flex-1">
                <Ionicons
                  name={isOpen ? "checkmark-circle" : "ellipse"}
                  size={22}
                  color={isOpen ? "#22C55E" : "#D1D5DB"}
                />
                <Text
                  className={`text-xs mt-1 ${
                    isOpen ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  Open
                </Text>
              </View>

              <View className="h-px bg-gray-300 flex-1 mx-1" />

              {/* In Progress */}
              <View className="items-center flex-1">
                {isInProgress ? (
                  <View className="w-6 h-6 rounded-full border-2 border-blue-600 items-center justify-center">
                    <View className="w-2 h-2 rounded-full bg-blue-600" />
                  </View>
                ) : (
                  <Ionicons name="ellipse" size={18} color="#D1D5DB" />
                )}
                <Text
                  className={`text-xs mt-1 text-center ${
                    isInProgress
                      ? "text-blue-600 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  In Progress
                </Text>
              </View>

              <View className="h-px bg-gray-300 flex-1 mx-1" />

              {/* Resolved */}
              <View className="items-center flex-1">
                <Ionicons
                  name={isResolved ? "checkmark-circle" : "ellipse"}
                  size={18}
                  color={isResolved ? "#22C55E" : "#D1D5DB"}
                />
                <Text
                  className={`text-xs mt-1 ${
                    isResolved
                      ? "text-green-600 font-semibold"
                      : "text-gray-400"
                  }`}
                >
                  Resolved
                </Text>
              </View>
            </View>

            {/* Description */}
            <View
              className="bg-gray-50 rounded-2xl px-4 py-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text className="text-gray-800 font-medium mb-1">
                Description
              </Text>
              <Text className="text-gray-600">
                {issue?.description ?? "No description provided."}
              </Text>
            </View>

            <View
              className="bg-gray-50 rounded-2xl px-4 py-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.05,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Text className="text-gray-800 font-medium mb-1">Location</Text>
              <Text className="text-gray-600 text-sm">
                {issue?.location?.address ?? "-"}
                {issue?.location?.city ?? ""} {issue?.location?.state ?? ""}
                {", "}
                {issue?.location?.pincode ?? ""}
              </Text>
            </View>

            {/* Comments */}
            <View className="mt-6">
              <Text className="text-gray-800 font-medium mb-2">Comments</Text>

              <View className="bg-gray-50 rounded-2xl px-4 py-3 mb-4">
                <TextInput
                  placeholder="Write a comment..."
                  value={commentText}
                  onChangeText={setCommentText}
                  className="text-gray-800"
                  multiline
                />
                <TouchableOpacity
                  onPress={onAddComment}
                  disabled={!commentText.trim() || isAdding}
                  className={`mt-3 px-4 py-2 rounded-full self-end ${
                    commentText.trim() ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <Text className="text-white text-sm font-semibold">
                    {isAdding ? "Posting..." : "Post"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="gap-3">
                {(issue?.comments ?? []).map((c) => (
                  <View
                    key={c.id}
                    className="bg-white border border-gray-100 rounded-2xl px-4 py-3"
                  >
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-gray-900 font-medium">
                        {c.userName ?? "Unknown User"}
                      </Text>
                      <Text className="text-gray-400 text-xs">
                        {formatDateTime(c.createdAt)}
                      </Text>
                    </View>
                    <Text className="text-gray-700">{c.text}</Text>
                  </View>
                ))}
                {issue?.comments?.length === 0 && (
                  <Text className="text-gray-400 text-sm">
                    No comments yet.
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <BottomTabs />
      </View>
    </ScreenWrapper>
  );
}
