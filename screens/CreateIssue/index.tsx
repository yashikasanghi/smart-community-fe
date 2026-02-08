import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import CreateIssueForm from "@/components/issue/CreateIssueForm";
import LogoImg from "@/components/ui/images/LogoImg";
import SubTitle from "@/components/ui/titles/SubTitle";
import Title from "@/components/ui/titles/Title";
import { ScrollView } from "react-native";

export default function CreateIssueScreen() {
  return (
    <ScreenWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "100%" }}
      >
        {/* Header */}
        <LogoImg />
        <Title label="Report New Issue" />
        <SubTitle label="Help us resolve community issues faster" />

        {/* Card */}
        <CreateIssueForm />
      </ScrollView>
    </ScreenWrapper>
  );
}
