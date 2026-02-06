import { router } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#EEF6FB",
        justifyContent: "center",
        padding: 24,
      }}
    >
      {/* <Image
                source={require("../assets/images/login.png")}
                style={{
                    width: 100,
                    height: 100,
                    alignSelf: "center",
                    marginBottom: 12,
                }}
                resizeMode="contain"
            /> */}

      {/* Card */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: 24,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}
      >
        {/* Title */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "600",
            textAlign: "center",
            marginBottom: 24,
          }}
        >
          Smart Community
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#999"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 14,
            marginBottom: 14,
          }}
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 10,
            padding: 14,
            marginBottom: 20,
          }}
        />

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#2E6CF6",
            paddingVertical: 14,
            borderRadius: 25,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text
            style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
            onPress={() => router.push("/role")}
          >
            Login
          </Text>
        </TouchableOpacity>

        {/* Forgot password */}
        <Text
          style={{ textAlign: "center", color: "#2E6CF6", marginBottom: 20 }}
        >
          Forgot Password?
        </Text>

        {/* Sign up */}
        <Text style={{ textAlign: "center" }}>
          Don’t have an account?{" "}
          <Text
            style={{ color: "#2E6CF6", fontWeight: "600" }}
            //onPress={() => router.push("/register")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
