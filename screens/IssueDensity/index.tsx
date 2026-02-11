import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import BottomTabs from "@/components/navigation/BottomTabs";
import { analyticsApi } from "@/services/api";
import { useProfile } from "@/hooks/useProfile";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Loader from "@/components/common/Loader";
import { normalizeRole } from "@/helpers/issueDetails.helper";

type Hotspot = { wardId: string; count: number };

export default function IssueDensityScreen() {
  const { user } = useProfile();
  const isAuthority = normalizeRole(user?.role) === "AUTHORITY";
  if (!isAuthority) {
    return (
      <ScreenWrapper cssClass="p-0">
        <View className="flex-1 w-full bg-[#F6F9FC] items-center justify-center px-6">
          <Text className="text-gray-900 text-lg font-semibold mb-2">
            Access restricted
          </Text>
          <Text className="text-gray-500 text-sm text-center">
            Issue density is available to authority users only.
          </Text>
        </View>
        <BottomTabs />
      </ScreenWrapper>
    );
  }
  const [total, setTotal] = useState(0);
  const [avgResolutionHours, setAvgResolutionHours] = useState(0);
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDensity = useCallback(async () => {
    if (!isAuthority) return;
    setIsLoading(true);
    try {
      const res = await analyticsApi.post("/analytics", {
        query: `
          query IssueDensity {
            issueDensity {
              total
              avgResolutionHours
              summary
              hotspots {
                wardId
                count
              }
            }
          }
        `,
      });
      const data = res.data?.data?.issueDensity;
      setTotal(data?.total ?? 0);
      setAvgResolutionHours(data?.avgResolutionHours ?? 0);
      setHotspots(data?.hotspots ?? []);
      setSummary(data?.summary ?? null);
    } catch {
      setSummary(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthority]);

  useEffect(() => {
    fetchDensity();
  }, [fetchDensity]);

  const maxCount = useMemo(
    () => hotspots.reduce((m, h) => Math.max(m, h.count), 0),
    [hotspots],
  );

  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 w-full bg-[#F6F9FC]">
        <Header name={user?.firstName} />
        {isLoading ? (
          <Loader message="Loading analytics..." />
        ) : (
          <ScrollView
            className="flex-1 px-6 mt-8"
            showsVerticalScrollIndicator={false}
          >
            <Text className="text-gray-900 font-semibold text-lg mb-4">
              Issue Density
            </Text>

            <View className="bg-white rounded-2xl px-5 py-5 mb-6">
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-gray-500 text-xs">Total Issues</Text>
                  <Text className="text-gray-900 font-semibold">{total}</Text>
                </View>
                <View>
                  <Text className="text-gray-500 text-xs">Avg Resolution</Text>
                  <Text className="text-gray-900 font-semibold">
                    {avgResolutionHours.toFixed(1)}h
                  </Text>
                </View>
              </View>
              <View className="mt-4">
                <Text className="text-gray-700 text-sm">
                  <Text className="font-semibold">Summary:</Text>{" "}
                  {summary ?? "Loading density summary..."}
                </Text>
              </View>
            </View>

            <View className="bg-white rounded-2xl px-5 py-5 mb-10">
              <Text className="text-gray-900 font-semibold mb-3">
                Hotspot Wards
              </Text>
              {hotspots.map((h) => (
                <View key={h.wardId} className="mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-600 text-xs">
                      Ward {h.wardId}
                    </Text>
                    <Text className="text-gray-500 text-xs">{h.count}</Text>
                  </View>
                  <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className="h-full bg-indigo-500"
                      style={{
                        width: maxCount
                          ? `${(h.count / maxCount) * 100}%`
                          : "0%",
                      }}
                    />
                  </View>
                </View>
              ))}
              {hotspots.length === 0 && (
                <Text className="text-gray-400 text-sm">
                  No hotspots available.
                </Text>
              )}
            </View>
          </ScrollView>
        )}
        <BottomTabs />
      </View>
    </ScreenWrapper>
  );
}
