import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white px-4 items-center justify-center">
        {children}
      </View>
    </SafeAreaView>
  );
}
