import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextLink from "@/components/ui/buttons/TextLink";
import WelcomeLogo from "@/components/ui/logo/WelcomeLogo";
import Title from "@/components/ui/titles/Title";
import { router } from "expo-router";
import { Text, View } from "react-native";

export default function WelcomeScreen() {
  return (
    <ScreenWrapper>
      {/* Logo + Title */}
      <View className="items-center mb-16">
        <WelcomeLogo />

        <Title label="Smart Community" />

        <Text className="text-base text-gray-700 text-center mt-2">
          Report. Resolve. Improve.
        </Text>
      </View>

      {/* Actions */}
      <View className="mt-auto mb-10">
        <ButtonPrimary
          label="Get Started"
          onPress={() => router.push("/signup")}
        />
        <TextLink label="Login" onPress={() => router.push("/login")} />
      </View>
    </ScreenWrapper>
  );
}
