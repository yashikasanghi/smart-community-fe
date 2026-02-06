import LoginForm from "@/components/auth/LoginForm";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextLink from "@/components/ui/buttons/TextLink";
import LogoImg from "@/components/ui/images/LogoImg";
import Title from "@/components/ui/titles/Title";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper cssClass="bg-background">
      {/* Background */}
      <View className="flex-1 w-full items-center justify-center">
        {/* Card */}
        <View
          className="bg-white w-full max-w-sm rounded-3xl px-6 py-8"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.12,
            shadowRadius: 20,
            elevation: 12,
          }}
        >
          {/* Logo + Title */}
          <View className="items-center mb-8">
            <LogoImg />
            <Title />
          </View>

          <LoginForm />
          {/* Login Button */}
          <ButtonPrimary label="Login" onPress={() => router.push("/login")} />
          <View className="justify-center items-center">
            {/* Forgot Password */}
            <TextLink label="Forgot Password?" onPress={() => {}} />
          </View>

          {/* Footer */}
          <View className="flex-row justify-center gap-2 mt-4">
            <Text className="text-gray-600">Don't have an account?</Text>
            <TextLink label="Sign Up" onPress={() => router.push("/signup")} />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
