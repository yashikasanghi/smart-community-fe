import SignupForm from "@/components/auth/SignupForm";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import LogoImg from "@/components/ui/images/LogoImg";
import SubTitle from "@/components/ui/titles/SubTitle";
import Title from "@/components/ui/titles/Title";
import { ScrollView, View } from "react-native";

export default function SignupScreen() {
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
      </ScrollView>
    </ScreenWrapper>
  );
}
