import { TextInput, View } from "react-native";

export default function LoginForm() {
  return (
    <View>
      {/* Email */}
      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#9CA3AF"
        autoCapitalize="none"
        keyboardType="email-address"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#9CA3AF"
        secureTextEntry
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
      />
    </View>
  );
}
