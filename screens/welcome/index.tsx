import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextLink from "@/components/ui/buttons/TextLink";
import WelcomeLogo from "@/components/ui/logo/WelcomeLogo";
import SubTitle from "@/components/ui/titles/SubTitle";
import Title from "@/components/ui/titles/Title";
import { routeToLogin, routeToSignup } from "@/utils/routes";
import { View } from "react-native";

export default function WelcomeScreen() {
  return (
    <ScreenWrapper>
      {/* Logo + Title */}
      <View>
        <View className="items-center">
          <WelcomeLogo />

          <Title label="Smart Community" />
          <SubTitle label="Report. Resolve. Improve." />
        </View>

        {/* Actions */}
        <View className="mt-auto mb-10">
          <ButtonPrimary label="Get Started" onPress={() => routeToSignup()} />
          <TextLink
            label="Login"
            onPress={() => routeToLogin()}
            cssClass="px-16 mx-6 text-center"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
