import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import LogoImg from "@/components/ui/images/LogoImg";
import SubTitle from "@/components/ui/titles/SubTitle";
import Title from "@/components/ui/titles/Title";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Role = "CITIZEN" | "AUTHORITY";

export default function RoleSelectionScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <ScreenWrapper>
      {/* Card */}
      <View
        className="bg-white w-full max-w-sm rounded-3xl px-6 py-8 items-center"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.12,
          shadowRadius: 20,
          elevation: 12,
        }}
      >
        {/* Icon */}
        <LogoImg />

        {/* Title */}
        <Title label="Choose your role" />
        <SubTitle label="How will you use the app?" />

        {/* Role cards */}
        <View className="flex-row gap-4 my-6">
          {/* Citizen */}
          <TouchableOpacity
            onPress={() => setSelectedRole("CITIZEN")}
            className={`w-36 h-fit rounded-2xl items-center justify-center p-6
                ${
                  selectedRole === "CITIZEN"
                    ? "border-2 border-blue-600"
                    : "border border-gray-200"
                }
              `}
            style={{
              backgroundColor: "#6FB1E8",
            }}
          >
            <Image
              source={require("@/assets/images/citizen.png")}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                marginBottom: 12,
              }}
              resizeMode="contain"
            />
            <Text className="text-white text-lg font-semibold">I am a</Text>
            <Text className="text-white text-lg font-semibold">Citizen</Text>
            <Text className="text-white text-center text-sm opacity-90">
              Report issues,{"\n"}track progress.
            </Text>
          </TouchableOpacity>

          {/* Authority */}
          <TouchableOpacity
            onPress={() => router.push("/issues-list")}
            className={`w-36 h-fit rounded-2xl items-center justify-center p-6
                ${
                  selectedRole === "AUTHORITY"
                    ? "border-2 border-green-600"
                    : "border border-gray-200"
                }
              `}
            style={{
              backgroundColor: "#57C37A",
            }}
          >
            <Image
              source={require("@/assets/images/authority.png")}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                marginBottom: 12,
              }}
            />
            <Text className="text-white text-lg font-semibold">I am an</Text>
            <Text className="text-white text-lg font-semibold">Authority</Text>
            <Text className="text-white text-center text-sm opacity-90">
              Manage issues,{"\n"}analyze data.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Continue */}

        <ButtonPrimary
          label="Continue"
          onPress={() =>
            router.push({
              pathname: "/create-issue",
              params: { role: selectedRole },
            })
          }
          cssClass="rounded-full"
        />
      </View>
    </ScreenWrapper>
  );
}
