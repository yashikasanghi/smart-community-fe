import SignupForm from "@/components/auth/SignupForm";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextLink from "@/components/ui/buttons/TextLink";
import LogoImg from "@/components/ui/images/LogoImg";
import SubTitle from "@/components/ui/titles/SubTitle";
import Title from "@/components/ui/titles/Title";
import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { ScreenWrapper } from "../../components/common/wrappers/ScreenWrapper";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <ScrollView
        className="w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <LogoImg />
        {/* Title */}
        <View className="items-center mb-8">
          <Title label="Smart Community" />
          <SubTitle label="Create your account" />
        </View>

        <SignupForm />

        {/* Signup Button */}

        <ButtonPrimary
          onPress={() => router.replace("/role-selection")}
          label="Sign Up"
          cssClass="rounded-full"
        />

        {/* Footer */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? Try </Text>
          <TextLink label={"Login"} onPress={() => router.replace("/login")} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
