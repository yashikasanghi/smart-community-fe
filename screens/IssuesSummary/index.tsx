import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import IssueStatusSummary from "@/components/issue/issues-summary/IssueStatus";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function IssueSummaryScreen() {
  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 bg-[#F6F9FC] w-full">
        {/* Header */}
        <Header />

        {/* Content */}
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

            <View className="flex-row items-center">
              {/* Open */}
              <IssueStatusSummary
                count={2}
                status={"Open"}
                iconDetails={{
                  name: "document-text-outline",
                  color: "#EF4444",
                }}
                cssClass="bg-red-100 "
              />

              {/* Divider */}
              <View className="w-px h-10 bg-gray-200 mx-4" />

              {/* Resolved */}

              <IssueStatusSummary
                count={2}
                status={"Resolved"}
                iconDetails={{
                  name: "checkmark-circle-outline",
                  color: "#22C55E",
                }}
                cssClass="bg-green-100"
              />
            </View>
          </View>

          {/* Report New Issue Button */}
          <TouchableOpacity
            className=" rounded-2xl mt-6 bg-blue-600"
            onPress={() => router.push("/issue-details")}
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
      </View>
    </ScreenWrapper>
  );
}
