import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import BottomTabs from "@/components/navigation/BottomTabs";
import { useProfile } from "@/hooks/useProfile";
import { analyticsApi } from "@/services/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function DashboardScreen() {
  const { user } = useProfile();
  const isAuthority = user?.role === "authority" || user?.role === "AUTHORITY";

  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [resolutionRate, setResolutionRate] = useState(0);
  const [avgResolutionHours, setAvgResolutionHours] = useState(0);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState<
    { status: string; count: number }[]
  >([]);

  const fetchWardHealthScore = useCallback(async () => {
    if (!isAuthority) return;
    try {
      const res = await analyticsApi.post("/analytics", {
        query: `
          query WardHealthScore {
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
          }
        `,
      });
      const data = res.data?.data?.wardHealthScore;
      setScore(data?.score ?? 0);
      setTotal(data?.total ?? 0);
      setResolutionRate(data?.resolutionRate ?? 0);
      setAvgResolutionHours(data?.avgResolutionHours ?? 0);
      setAiExplanation(data?.aiExplanation ?? null);
      setStatusCounts(data?.statusCounts ?? []);
    } catch {
      setAiExplanation(null);
    }
  }, [isAuthority]);

  useEffect(() => {
    fetchWardHealthScore();
  }, [fetchWardHealthScore]);

  const scoreColor = useMemo(() => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  }, [score]);

  const resolutionPct = Math.round(resolutionRate * 100);
  const statusMap = useMemo(() => {
    return statusCounts.reduce(
      (acc, s) => {
        acc[s.status] = s.count;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [statusCounts]);

  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 w-full bg-[#F6F9FC]">
        <Header name={user?.firstName} />
        <ScrollView
          className="flex-1 px-6 mt-8"
          showsVerticalScrollIndicator={false}
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
          </View>

          <View className="bg-white rounded-2xl px-5 py-5 mb-6">
            <Text className="text-gray-900 font-semibold mb-3">
              Status Breakdown
            </Text>
            {[
              { label: "Open", key: "OPEN", color: "bg-red-500" },
              {
                label: "In Progress",
                key: "IN_PROGRESS",
                color: "bg-amber-500",
              },
              { label: "Resolved", key: "RESOLVED", color: "bg-green-500" },
              { label: "Rejected", key: "REJECTED", color: "bg-orange-500" },
              { label: "Closed", key: "CLOSED", color: "bg-blue-500" },
            ].map((item) => (
              <View key={item.key} className="mb-3">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-gray-600 text-xs">{item.label}</Text>
                  <Text className="text-gray-500 text-xs">
                    {statusMap[item.key] ?? 0}
                  </Text>
                </View>
                <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className={`${item.color} h-full`}
                    style={{
                      width: total
                        ? `${((statusMap[item.key] ?? 0) / total) * 100}%`
                        : "0%",
                    }}
                  />
                </View>
              </View>
            ))}
          </View>

          <View className="bg-gray-100 rounded-2xl px-5 py-4 mb-10">
            <Text className="text-gray-700 text-sm mb-6">
              <Text className="font-semibold">AI Explanation:</Text>{" "}
              {aiExplanation ?? "Generating insight..."}
            </Text>
          </View>
        </ScrollView>
        <BottomTabs />
      </View>
    </ScreenWrapper>
  );
}
