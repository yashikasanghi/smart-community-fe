import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import { MY_ISSUES_LIST } from "@/graphql/queries/issues";
import { ISSUE_BASE_URL } from "@/config/env";
import { useQuery } from "@apollo/client/react";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { routeToIssueDetails } from "@/utils/routes";
import { useProfile } from "@/hooks/useProfile";
import { analyticsApi } from "@/services/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import BottomTabs from "@/components/navigation/BottomTabs";
import { useAnalyticsStore } from "@/store/analyticsStore";
import Loader from "@/components/common/Loader";

type IssueListItem = {
  id: string;
  shortDescription: string;
  status: string;
  images?: string[];
  createdAt: string;
  updatedAt?: string;
};

export default function IssuesList() {
  const { user } = useProfile();
  const { status } = useLocalSearchParams<{ status?: string }>();
  const { setIssuesUpdatedAt } = useAnalyticsStore();
  const statusValue =
    status === "OPEN" ||
    status === "IN_PROGRESS" ||
    status === "RESOLVED" ||
    status === "REJECTED"
      ? status
      : null;

  const isAuthority = user?.role === "authority" || user?.role === "AUTHORITY";
  const isAll =
    status === "ALL" || status === "all" || status == null || status === "";

  const { data, loading } = useQuery<{ myIssuesList: IssueListItem[] }>(
    MY_ISSUES_LIST,
    {
      variables: { status: statusValue },
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
    },
  );

  const [summary, setSummary] = useState<string | null>(null);
  const [summaryError, setSummaryError] = useState(false);

  const fetchAuthoritySummary = useCallback(async () => {
    if (!isAuthority || !isAll) return;
    try {
      const res = await analyticsApi.post("/analytics", {
        query: `
          query AuthorityIssuesSummary($status: IssueStatus) {
            authorityIssuesSummary(status: $status) {
              summary
              issues {
                id
                shortDescription
                status
                images
                createdAt
              }
            }
          }
        `,
        variables: { status: null },
      });
      const payload = res.data?.data?.authorityIssuesSummary;
      setSummary(payload?.summary ?? null);
      setSummaryError(false);
    } catch {
      setSummary(null);
      setSummaryError(true);
    }
  }, [isAuthority, isAll]);

  useEffect(() => {
    fetchAuthoritySummary();
  }, [fetchAuthoritySummary]);

  const issues = useMemo(() => data?.myIssuesList ?? [], [data]);
  const latestUpdatedAt = useMemo(() => {
    if (!issues.length) return null;
    return issues.reduce<string | null>((latest, issue) => {
      const candidate = issue.updatedAt ?? issue.createdAt;
      if (!candidate) return latest;
      const time = new Date(candidate).getTime();
      if (Number.isNaN(time)) return latest;
      if (!latest) return candidate;
      const latestTime = new Date(latest).getTime();
      return time > latestTime ? candidate : latest;
    }, null);
  }, [issues]);

  useEffect(() => {
    if (latestUpdatedAt) {
      setIssuesUpdatedAt(latestUpdatedAt);
    }
  }, [latestUpdatedAt, setIssuesUpdatedAt]);

  const toLabel = (value: string) => {
    switch (value) {
      case "open":
        return "Open";
      case "in_progress":
        return "In Progress";
      case "resolved":
        return "Resolved";
      case "rejected":
        return "Rejected";
      default:
        return value;
    }
  };

  const toImageUrl = (path?: string) => {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    const base = ISSUE_BASE_URL?.replace(/\/smart-community\/?$/, "") ?? "";
    return `${base}${path}`;
  };

  const formatCreatedOn = (iso: string) => {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "Created on: -";
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.toLocaleString("en-US", { year: "2-digit" });
    const ordinal = (n: number) => {
      const mod10 = n % 10;
      const mod100 = n % 100;
      if (mod10 === 1 && mod100 !== 11) return "st";
      if (mod10 === 2 && mod100 !== 12) return "nd";
      if (mod10 === 3 && mod100 !== 13) return "rd";
      return "th";
    };
    return `Created on: ${day}${ordinal(day)} ${month}' ${year}`;
  };

  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 w-full">
        {/* Header */}
        <Header name={user?.firstName} />

        {/* Content */}
        {loading && !data ? (
          <Loader message="Loading issues..." />
        ) : (
          <ScrollView
            className="px-6 -mt-8"
            showsVerticalScrollIndicator={false}
          >
          {/* AI Summary */}
          {isAuthority && isAll && summary && !summaryError && (
            <View className="bg-gray-200 rounded-xl px-4 py-3 mb-6">
              <Text className="text-gray-700 text-sm">
                <Text className="font-semibold">AI Summary:</Text>{" "}
                {summary}
              </Text>
            </View>
          )}

          {/* Issues Card */}
          <View
            className="bg-white rounded-3xl px-4 py-4 mb-10"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.1,
              shadowRadius: 14,
              elevation: 8,
            }}
          >
            {issues.map((issue, index) => (
              <TouchableOpacity
                key={issue.id}
                onPress={() => routeToIssueDetails(issue.id)}
                className={`flex-row items-center py-3 ${
                  index !== issues.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Image */}
                <Image
                  source={
                    toImageUrl(issue.images?.[0])
                      ? { uri: toImageUrl(issue.images?.[0]) as string }
                      : require("@/assets/images/default-issue-img.jpg")
                  }
                  className="rounded-lg mr-4"
                  style={{ width: 100, height: 100 }}
                  resizeMode="cover"
                />

                {/* Info */}
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium">
                    {issue.shortDescription}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">
                    {formatCreatedOn(issue.createdAt)}
                  </Text>
                </View>

                {/* Status */}
                <View className="bg-red-500 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-semibold">
                    {toLabel(issue.status)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          </ScrollView>
        )}
        <BottomTabs />
      </View>
    </ScreenWrapper>
  );
}
