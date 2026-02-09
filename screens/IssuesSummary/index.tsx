import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import IssueStatusSummary from "@/components/issue/issues-summary/IssueStatus";
import { MY_ISSUE_COUNTS } from "@/graphql/queries/issues";
import { useProfile } from "@/hooks/useProfile";
import { routeToCreateIssue, routeToIssuesList } from "@/utils/routes";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client/react";
import { Text, TouchableOpacity, View } from "react-native";
import BottomTabs from "@/components/navigation/BottomTabs";
import Loader from "@/components/common/Loader";

export default function IssueSummaryScreen() {
  const { user } = useProfile();
  type IssueCounts = {
    open: number;
    inProgress: number;
    resolved: number;
    rejected: number;
  };

  const { data, loading } = useQuery<{ myIssueCounts: IssueCounts }>(
    MY_ISSUE_COUNTS,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
    },
  );

  const counts = data?.myIssueCounts ?? {
    open: 0,
    inProgress: 0,
    resolved: 0,
    rejected: 0,
  };
  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 bg-[#F6F9FC] w-full">
        {/* Header */}
        <Header name={user?.firstName} />

        {/* Content */}
        {loading && !data ? (
          <Loader message="Loading issue summary..." />
        ) : (
          <View className="px-6 mt-8">
          {/* Issue Summary Card */}
          <View
            className="bg-white rounded-2xl px-6 py-5"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.1,
              shadowRadius: 14,
              elevation: 8,
            }}
          >
            <Text className="text-gray-900 font-semibold mb-4">
              My Issues Summary
            </Text>

            <View className="gap-6">
              <View className="flex-row items-center">
                <View className="flex-1">
                  {/* Open */}
                  <IssueStatusSummary
                    count={counts.open}
                    status={"Open"}
                    iconDetails={{
                      name: "document-text-outline",
                      color: "#EF4444",
                    }}
                    cssClass="bg-red-100 "
                    onIconPress={() => routeToIssuesList("OPEN")}
                    iconDisabled={counts.open < 1}
                  />
                </View>

                {/* Divider */}
                <View className="w-px self-stretch bg-gray-300 mx-4" />

                <View className="flex-1">
                  {/* In Progress */}
                  <IssueStatusSummary
                    count={counts.inProgress}
                    status={"In Progress"}
                    iconDetails={{
                      name: "document-text-outline",
                      color: "#F59E0B",
                    }}
                    cssClass="bg-amber-100"
                    onIconPress={() => routeToIssuesList("IN_PROGRESS")}
                    iconDisabled={counts.inProgress < 1}
                  />
                </View>
              </View>

              <View className="flex-row items-center">
                <View className="flex-1">
                  {/* Resolved */}
                  <IssueStatusSummary
                    count={counts.resolved}
                    status={"Resolved"}
                    iconDetails={{
                      name: "checkmark-circle-outline",
                      color: "#22C55E",
                    }}
                    cssClass="bg-green-100"
                    onIconPress={() => routeToIssuesList("RESOLVED")}
                    iconDisabled={counts.resolved < 1}
                  />
                </View>

                {/* Divider */}
                <View className="w-px self-stretch bg-gray-300 mx-4" />

                <View className="flex-1">
                  {/* Rejected */}
                  <IssueStatusSummary
                    count={counts.rejected}
                    status={"Rejected"}
                    iconDetails={{
                      name: "close-circle-outline",
                      color: "#F97316",
                    }}
                    cssClass="bg-orange-100"
                    onIconPress={() => routeToIssuesList("REJECTED")}
                    iconDisabled={counts.rejected < 1}
                  />
                </View>
              </View>
            </View>
          </View>

          {/* Report New Issue Button */}
          <TouchableOpacity
            className=" rounded-2xl mt-6 bg-blue-600"
            onPress={() => routeToCreateIssue()}
          >
            <View className="flex-row gap-4 rounded-2xl p-4 items-center justify-center">
              <View className="bg-white w-8 h-8 rounded-full items-center justify-center">
                <Ionicons name="add" size={28} color="#2563EB" />
              </View>
              <Text className="text-white text-lg font-semibold">
                Report New Issue
              </Text>
            </View>
          </TouchableOpacity>
          </View>
        )}
        <BottomTabs />
      </View>
    </ScreenWrapper>
  );
}
