import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function IssueStatusSummary({
  count,
  status,
  iconDetails,
  cssClass,
}: Readonly<{
  count: number;
  status: string;
  iconDetails: {
    name:
      | "document-text-outline"
      | "checkmark-circle-outline"
      | "close-circle-outline";
    color: string;
  };
  cssClass: string;
}>) {
  return (
    <View className="flex-1 flex-row items-center">
      <View
        className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${cssClass}`}
      >
        <Ionicons
          name={iconDetails?.name}
          size={20}
          color={iconDetails?.color}
        />
      </View>
      <View>
        <Text className="text-lg font-semibold text-gray-900">{count}</Text>
        <Text className="text-gray-500 text-sm">{status}</Text>
      </View>
    </View>
  );
}
