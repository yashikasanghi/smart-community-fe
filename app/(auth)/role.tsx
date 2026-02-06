import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ChooseRoleScreen() {
  const [role, setRole] = useState<"citizen" | "authority" | null>(null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EEF6FB",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* Card */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 24,
          padding: 24,
          alignItems: "center",
          elevation: 6,
        }}
      >
        {/* Logo */}
        {/* <Image
          source={require("../assets/images/login.png")}
          style={{ width: 90, height: 90, marginBottom: 16 }}
          resizeMode="contain"
        /> */}

        <Text style={{ fontSize: 22, fontWeight: "600" }}>
          Choose your role
        </Text>

        <Text style={{ color: "#666", marginBottom: 24 }}>
          How will you use the app?
        </Text>

        {/* Role Cards */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          {/* Citizen */}
          <TouchableOpacity
            onPress={() => setRole("citizen")}
            style={{
              flex: 1,
              backgroundColor: "#6FAFE8",
              borderRadius: 16,
              padding: 16,
              alignItems: "center",
              borderWidth: role === "citizen" ? 2 : 0,
              borderColor: "#2E6CF6",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
              I am a Citizen
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#EAF3FF",
                textAlign: "center",
                marginTop: 6,
              }}
            >
              Report issues, track progress.
            </Text>
          </TouchableOpacity>

          {/* Authority */}
          <TouchableOpacity
            onPress={() => setRole("authority")}
            style={{
              flex: 1,
              backgroundColor: "#4FC37A",
              borderRadius: 16,
              padding: 16,
              alignItems: "center",
              borderWidth: role === "authority" ? 2 : 0,
              borderColor: "#2E6CF6",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600", color: "#fff" }}>
              I am an Authority
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#E8FFF0",
                textAlign: "center",
                marginTop: 6,
              }}
            >
              Manage issues, analyze data.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Continue */}
        <TouchableOpacity
          disabled={!role}
          onPress={() => router.push("/login")}
          style={{
            marginTop: 28,
            backgroundColor: role ? "#2E6CF6" : "#B0C4DE",
            paddingVertical: 14,
            paddingHorizontal: 60,
            borderRadius: 28,
          }}
        >
          <Text
            style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
            onPress={() => router.push("/home")}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
