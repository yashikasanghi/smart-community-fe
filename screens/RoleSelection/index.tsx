import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import LogoImg from "@/components/ui/images/LogoImg";
import SubTitle from "@/components/ui/titles/SubTitle";
import Title from "@/components/ui/titles/Title";
import postRoleSelection from "@/services/selectRole";
import { RoleSelection } from "@/types/user.types";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useProfile } from "@/hooks/useProfile";
import { routeToIssueSummary } from "@/utils/routes";

export default function RoleSelectionScreen() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useProfile();

  const submitRole = async () => {
    if (!selectedRole) return;

    try {
      setLoading(true);

      const payload: RoleSelection = {
        role: selectedRole?.toLocaleLowerCase(),
      };

      // Authority requires ward assignment
      if (selectedRole === "AUTHORITY") {
        payload.authorityAssignment = {
          wardId: user?.location?.wardId as string,
        };
      }
      await postRoleSelection(payload);
      routeToIssueSummary();
    } catch (err) {
      console.error("Role selection failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <View className="bg-white w-full max-w-sm rounded-3xl px-6 py-8 items-center">
        <LogoImg />
        <Title label="Choose your role" />
        <SubTitle label="How will you use the app?" />

        <View className="flex-row gap-4 my-6">
          {/* Citizen */}
          <TouchableOpacity
            onPress={() => setSelectedRole("CITIZEN")}
            className={`w-36 rounded-2xl items-center p-6 ${
              selectedRole === "CITIZEN"
                ? "border-2 border-blue-600"
                : "border border-gray-200"
            }`}
            style={{ backgroundColor: "#6FB1E8", height: 200, width: 150 }}
            accessibilityRole="button"
            accessibilityLabel="Select Citizen role"
            accessibilityState={{ selected: selectedRole === "CITIZEN" }}
          >
            <Image
              source={require("@/assets/images/citizen.png")}
              style={{ width: 50, height: 50, marginBottom: 12 }}
              resizeMode="contain"
              accessibilityLabel="Citizen icon"
              accessible
            />
            <Text className="text-white font-semibold text-lg">Citizen</Text>
            <Text className="text-white text-sm text-center mt-2">
              Report issues, track progress.
            </Text>
          </TouchableOpacity>

          {/* Authority */}
          <TouchableOpacity
            onPress={() => setSelectedRole("AUTHORITY")}
            className={`w-36 rounded-2xl items-center p-6 ${
              selectedRole === "AUTHORITY"
                ? "border-2 border-green-600"
                : "border border-gray-200"
            }`}
            style={{ backgroundColor: "#57C37A", height: 200, width: 150 }}
            accessibilityRole="button"
            accessibilityLabel="Select Authority role"
            accessibilityState={{ selected: selectedRole === "AUTHORITY" }}
          >
            <Image
              source={require("@/assets/images/authority.png")}
              style={{ width: 50, height: 50, marginBottom: 12 }}
              resizeMode="contain"
              accessibilityLabel="Authority icon"
              accessible
            />
            <Text className="text-white font-semibold text-lg">Authority</Text>
            <Text className="text-white text-sm text-center mt-2">
              Manage issues, analyze data.
            </Text>
          </TouchableOpacity>
        </View>

        <ButtonPrimary
          label="Continue"
          onPress={submitRole}
          disabled={!selectedRole || loading}
          cssClass="rounded-full"
        />
      </View>
    </ScreenWrapper>
  );
}
