import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import { Image, ScrollView, Text, View } from "react-native";

const ISSUES = [
  {
    id: "0021037",
    title: "Illegal Dumping on Elm St",
    status: "Open",
    image: "https://via.placeholder.com/60",
  },
  {
    id: "202451232",
    title: "Illegal Dumping on Elm St",
    status: "Open",
    image: "https://via.placeholder.com/60",
  },
  {
    id: "0022037",
    title: "Pothole on Wide Ave",
    status: "Open",
    image: "https://via.placeholder.com/60",
  },
  {
    id: "0021039",
    title: "Signboard Damaged",
    status: "Open",
    image: "https://via.placeholder.com/60",
  },
];

export default function IssuesList() {
  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 w-full">
        {/* Header */}
        <Header />

        {/* Content */}
        <ScrollView className="px-6 -mt-8" showsVerticalScrollIndicator={false}>
          {/* AI Summary */}
          <View className="bg-gray-200 rounded-xl px-4 py-3 mb-6">
            <Text className="text-gray-700 text-sm">
              <Text className="font-semibold">AI Summary:</Text> Pothole sent 2
              days ago. High priority.
            </Text>
          </View>

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
            {ISSUES.map((issue, index) => (
              <View
                key={issue.id}
                className={`flex-row items-center py-3 ${
                  index !== ISSUES.length - 1 ? "border-b border-gray-100" : ""
                }`}
              >
                {/* Image */}
                <Image
                  source={{ uri: issue.image }}
                  className="w-14 h-14 rounded-lg mr-4"
                />

                {/* Info */}
                <View className="flex-1">
                  <Text className="text-gray-900 font-medium">
                    {issue.title}
                  </Text>
                  <Text className="text-gray-400 text-xs mt-1">{issue.id}</Text>
                </View>

                {/* Status */}
                <View className="bg-red-500 px-3 py-1 rounded-full">
                  <Text className="text-white text-xs font-semibold">
                    {issue.status}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}
