import { ActivityIndicator, Text, View } from "react-native";

type LoaderProps = {
  message?: string;
};

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <View
      className="flex-1 items-center justify-center py-10"
      accessibilityRole="progressbar"
      accessibilityLabel={message}
    >
      <ActivityIndicator size="large" color="#2563EB" />
      <Text className="text-gray-500 text-sm mt-3">{message}</Text>
    </View>
  );
}
