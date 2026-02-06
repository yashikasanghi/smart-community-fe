import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import { Ionicons } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export default function IssueDetailsScreen() {
  return (
    <ScreenWrapper>
      <View className="flex-1 bg-[#F6F9FC]">
        {/* Header */}
        <Header />

        {/* Content */}
        <View className="px-6 -mt-8">
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
              Pothole on Main St
            </Text>

            {/* Image */}
            <View className="mb-4">
              <Image
                source={{
                  uri: "https://via.placeholder.com/150",
                }}
                className="w-24 h-24 rounded-xl"
              />
              <Text className="text-xs text-gray-500 mt-1">Uploaded</Text>
            </View>

            {/* Status Tracker */}
            <View className="flex-row items-center justify-between mb-6">
              {/* Open */}
              <View className="items-center flex-1">
                <Ionicons name="checkmark-circle" size={22} color="#22C55E" />
                <Text className="text-xs text-gray-600 mt-1">Open</Text>
              </View>

              <View className="h-px bg-gray-300 flex-1 mx-1" />

              {/* In Progress */}
              <View className="items-center flex-1">
                <View className="w-6 h-6 rounded-full border-2 border-blue-600 items-center justify-center">
                  <View className="w-2 h-2 rounded-full bg-blue-600" />
                </View>
                <Text className="text-xs font-semibold text-blue-600 mt-1">
                  In Progress
                </Text>
              </View>

              <View className="h-px bg-gray-300 flex-1 mx-1" />

              {/* Resolved */}
              <View className="items-center flex-1">
                <Ionicons name="ellipse" size={18} color="#D1D5DB" />
                <Text className="text-xs text-gray-400 mt-1">Resolved</Text>
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
                Large pothole causing traffic congestion and vehicle damage.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
