import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenWrapper({
  children,
  cssClass = "px-6 py-8 px-4",
}: {
  children: React.ReactNode;
  cssClass?: string;
}) {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View
          className={`flex-1 bg-white items-center justify-center bg-white rounded-3xl shadow-lg ${cssClass}`}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.12,
            shadowRadius: 20,
            elevation: 12,
          }}
        >
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
