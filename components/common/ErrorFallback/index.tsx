import { Text, TouchableOpacity, View } from "react-native";
import { useAppErrorStore } from "@/store/appErrorStore";

export default function ErrorFallback() {
  const error = useAppErrorStore((state) => state.error);
  const clearError = useAppErrorStore((state) => state.clearError);

  if (!error) return null;

  return (
    <View
      className="absolute inset-0 z-50"
      pointerEvents="box-none"
      accessibilityRole="alert"
      accessibilityLabel="Something went wrong"
    >
      <View className="absolute inset-0 bottom-20 bg-white/95" />
      <View className="flex-1 items-center justify-center px-6 pb-20">
        <View className="bg-white border border-red-100 rounded-2xl px-6 py-5 w-full max-w-[420px] shadow-lg">
          <Text className="text-red-600 text-lg font-semibold mb-2">
            Something went wrong
          </Text>
          <Text className="text-gray-700 text-sm mb-4">
            We can't load this content right now. Our team is on it, and it
            should be back shortly. Please try again in a moment.
          </Text>
          <TouchableOpacity
            className="bg-blue-600 rounded-full px-4 py-2 self-start"
            onPress={clearError}
          >
            <Text className="text-white text-sm font-semibold">Dismiss</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
