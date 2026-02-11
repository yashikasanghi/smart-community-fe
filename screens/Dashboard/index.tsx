import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import BottomTabs from "@/components/navigation/BottomTabs";
import { useProfile } from "@/hooks/useProfile";
import { analyticsApi } from "@/services/api";
import { useAnalyticsStore } from "@/store/analyticsStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Loader from "@/components/common/Loader";
import { normalizeRole } from "@/helpers/issueDetails.helper";
import BarChart from "@/components/common/charts/BarChart";

export default function DashboardScreen() {
  const { user } = useProfile();
  const isAuthority = normalizeRole(user?.role) === "AUTHORITY";

  const wardId = user?.authorityAssignment?.wardId ?? user?.location?.wardId;

  const [topIssues, setTopIssues] = useState<
    {
      issueType: string;
      streetName: string;
      representativeAddress: string;
      affectedUserCount: number;
      summary: string;
    }[]
  >([]);
  const [topIssuesSummary, setTopIssuesSummary] = useState("");
  const [topIssuesError, setTopIssuesError] = useState(false);

  const {
    wardHealthScore,
    issueDensitySummary,
    issueCategoryCounts,
    issuesUpdatedAt,
    lastFetchedIssuesUpdatedAt,
    setWardHealthScore,
    setIssueDensitySummary,
    setIssueCategoryCounts,
    setLastFetchedIssuesUpdatedAt,
  } = useAnalyticsStore();

  const inFlightRef = useRef(false);
  const lastRequestedRef = useRef<string | null>(null);
  const [isAnalyticsLoading, setIsAnalyticsLoading] = useState(false);

  useEffect(() => {
    if (!wardId) {
      setTopIssues([]);
      return;
    }
    setTopIssuesError(false);
  }, [wardId]);

  useEffect(() => {
    if (!isAuthority || !wardId) return;
    const refreshKey = issuesUpdatedAt ?? "init";
    const shouldRefresh =
      !wardHealthScore ||
      !issueDensitySummary ||
      topIssues.length === 0 ||
      refreshKey !== lastFetchedIssuesUpdatedAt;
    if (!shouldRefresh) return;
    if (inFlightRef.current || lastRequestedRef.current === refreshKey) return;
    inFlightRef.current = true;
    lastRequestedRef.current = refreshKey;
    setIsAnalyticsLoading(true);
    (async () => {
      try {
        const res = await analyticsApi.post(
          `/analytics?ts=${Date.now()}`,
          {
            query: `
            query DashboardAnalytics($wardId: ID!) {
              wardHealthScore {
                score
                total
                resolutionRate
                avgResolutionHours
                aiExplanation
                statusCounts {
                  status
                  count
                }
              }
              issueDensity {
                summary
                categoryCounts {
                  category
                  count
                }
              }
              topIssuesByWard(wardId: $wardId) {
                summary
                topIssues {
                  issueType
                  streetName
                  representativeAddress
                  affectedUserCount
                  summary
                }
              }
            }
          `,
            variables: { wardId },
          },
          { headers: { "Cache-Control": "no-cache" } },
        );
        if (res.data?.errors?.length) {
          throw new Error(res.data.errors[0]?.message || "Analytics error");
        }
        const health = res.data?.data?.wardHealthScore;
        const density = res.data?.data?.issueDensity;
        const topResult = res.data?.data?.topIssuesByWard ?? null;
        const top = topResult?.topIssues ?? [];
        setWardHealthScore(
          health
            ? {
                score: health?.score ?? 0,
                total: health?.total ?? 0,
                resolutionRate: health?.resolutionRate ?? 0,
                avgResolutionHours: health?.avgResolutionHours ?? 0,
                aiExplanation: health?.aiExplanation ?? null,
                statusCounts: health?.statusCounts ?? [],
              }
            : null,
        );
        setIssueDensitySummary(density?.summary ?? null);
        setIssueCategoryCounts(density?.categoryCounts ?? []);
        setTopIssues(top);
        setTopIssuesError(false);
        if (topResult?.summary) {
          setTopIssuesSummary(topResult.summary);
        }
      } catch {
        setWardHealthScore(null);
        setIssueDensitySummary(null);
        setIssueCategoryCounts([]);
        setTopIssues([]);
        setTopIssuesError(true);
        setTopIssuesSummary("");
      } finally {
        inFlightRef.current = false;
        setIsAnalyticsLoading(false);
        setLastFetchedIssuesUpdatedAt(refreshKey);
      }
    })();
  }, [
    isAuthority,
    issueDensitySummary,
    issuesUpdatedAt,
    lastFetchedIssuesUpdatedAt,
    setLastFetchedIssuesUpdatedAt,
    setIssueCategoryCounts,
    setIssueDensitySummary,
    setWardHealthScore,
    wardHealthScore,
    topIssues.length,
    wardId,
  ]);

  const score = wardHealthScore?.score ?? 0;
  const total = wardHealthScore?.total ?? 0;
  const resolutionRate = wardHealthScore?.resolutionRate ?? 0;
  const avgResolutionHours = wardHealthScore?.avgResolutionHours ?? 0;
  const aiExplanation = wardHealthScore?.aiExplanation ?? null;
  const statusCounts = wardHealthScore?.statusCounts ?? [];
  const densitySummary = issueDensitySummary ?? null;
  const categoryCounts = issueCategoryCounts ?? [];
  const toCategoryLabel = (value?: string) => {
    if (!value) return "Other";
    return value
      .toLowerCase()
      .split("_")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  };

  const scoreColor = useMemo(() => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  }, [score]);

  const resolutionPct = Math.round(resolutionRate * 100);
  const statusMap = useMemo(() => {
    return statusCounts.reduce(
      (acc, s) => {
        const key =
          typeof s.status === "string" ? s.status.toLowerCase() : s.status;
        acc[key] = s.count;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [statusCounts]);

  const displayHealthSummary = useMemo(() => {
    const invalid =
      !aiExplanation ||
      aiExplanation.toLowerCase().includes("unable to generate insight");
    if (!invalid) return aiExplanation;
    if (!total) return "No issues found for this ward.";
    const topStatus = Object.entries(statusMap).sort((a, b) => b[1] - a[1])[0];
    const topLabel = topStatus?.[0]?.replace("_", " ") ?? "open";
    return `Health score is ${score}/100 with a ${Math.round(
      resolutionRate * 100,
    )}% resolution rate. The largest share of cases are ${topLabel}, and average resolution time is ${avgResolutionHours.toFixed(
      1,
    )}h.`;
  }, [
    aiExplanation,
    avgResolutionHours,
    resolutionRate,
    score,
    statusMap,
    total,
  ]);

  const topIssueChartData = useMemo(
    () =>
      topIssues.map((item) => ({
        label: `${item.issueType?.toLowerCase().replace(/_/g, " ")} on ${item.streetName}`,
        value: item.affectedUserCount,
      })),
    [topIssues],
  );

  if (!isAuthority) {
    return (
      <ScreenWrapper cssClass="p-0">
        <View className="flex-1 w-full bg-[#F6F9FC] items-center justify-center px-6">
          <Text className="text-gray-900 text-lg font-semibold mb-2">
            Access restricted
          </Text>
          <Text className="text-gray-500 text-sm text-center">
            This dashboard is available to authority users only.
          </Text>
        </View>
        <BottomTabs />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 w-full bg-[#F6F9FC]">
        <Header name={user?.firstName} />
        {isAnalyticsLoading ? (
          <Loader message="Loading analytics..." />
        ) : (
          <ScrollView
            className="flex-1 px-6 mt-8"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <Text className="text-gray-900 font-semibold text-lg mb-4">
              Ward Health
            </Text>

            <View className="bg-white rounded-2xl px-5 py-5 mb-6">
              <Text className="text-gray-500 text-sm">Health Score</Text>
              <Text className={`text-4xl font-bold mt-1 ${scoreColor}`}>
                {score}
                <Text className="text-gray-400 text-lg">/100</Text>
              </Text>

              <View className="h-3 bg-gray-100 rounded-full mt-4 overflow-hidden">
                <View
                  className="h-full bg-blue-600"
                  style={{ width: `${score}%` }}
                />
              </View>

              <View className="flex-row justify-between mt-4">
                <View>
                  <Text className="text-gray-500 text-xs">Total Issues</Text>
                  <Text className="text-gray-900 font-semibold">{total}</Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-xs">Resolution Rate</Text>
                  <Text className="text-gray-900 font-semibold">
                    {resolutionPct}%
                  </Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-xs">Avg Resolution</Text>
                  <Text className="text-gray-900 font-semibold">
                    {avgResolutionHours.toFixed(1)}h
                  </Text>
                </View>
              </View>
              <View className="bg-gray-100 rounded-xl px-4 py-3 mt-4">
                <Text className="text-gray-700 text-sm">
                  <Text className="font-semibold">AI Summary:</Text>{" "}
                  {displayHealthSummary ?? "Generating insight..."}
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl px-5 py-5 mb-6">
              <Text className="text-gray-900 font-semibold mb-3">
                Issue Categories
              </Text>
              {categoryCounts.map((item) => (
                <View key={item.category} className="mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-600 text-xs">
                      {toCategoryLabel(item.category)}
                    </Text>
                    <Text className="text-gray-500 text-xs">
                      {item.count ?? 0}
                    </Text>
                  </View>
                  <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className="bg-blue-500 h-full"
                      style={{
                        width: total
                          ? `${((item.count ?? 0) / total) * 100}%`
                          : "0%",
                      }}
                    />
                  </View>
                </View>
              ))}
              {!categoryCounts.length && (
                <Text className="text-gray-500 text-xs mb-2">
                  No category data available.
                </Text>
              )}
              <View className="bg-gray-100 rounded-xl px-4 py-3 mt-2">
                <Text className="text-gray-700 text-sm">
                  <Text className="font-semibold">AI Summary:</Text>{" "}
                  {densitySummary ?? "Generating insight..."}
                </Text>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-gray-900 font-semibold mb-3">
                Top Issues by Affected Users
              </Text>
              {isAnalyticsLoading ? (
                <Loader message="Loading top issues..." />
              ) : topIssuesError ? (
                <View className="bg-white rounded-2xl px-5 py-5">
                  <Text className="text-gray-500 text-sm">
                    Unable to load top issues right now.
                  </Text>
                </View>
              ) : topIssues.length === 0 ? (
                <View className="bg-white rounded-2xl px-5 py-5">
                  <Text className="text-gray-500 text-sm">
                    No top issues available yet.
                  </Text>
                </View>
              ) : (
                <>
                  <BarChart data={topIssueChartData} />
                  <View className="mt-4">
                    {topIssuesSummary ? (
                      <Text className="text-gray-600 text-sm mb-2">
                        {topIssuesSummary}
                      </Text>
                    ) : null}
                  </View>
                </>
              )}
            </View>
          </ScrollView>
        )}
      </View>
      <BottomTabs />
    </ScreenWrapper>
  );
}
