import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScreenWrapper } from "../../components/common/wrappers/ScreenWrapper";

export default function SignupScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
    password: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm({ ...form, [key]: value });

  return (
    <ScreenWrapper>
      <ScrollView
        className="w-full"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* Title */}
        <View className="items-center mb-8">
          <Text className="text-2xl font-semibold text-gray-900">
            Smart Community
          </Text>
          <Text className="text-gray-500 mt-1">Create your account</Text>
        </View>

        {/* Name */}
        <View className="flex-row gap-3 mb-4">
          <TextInput
            placeholder="First Name"
            value={form.firstName}
            onChangeText={(v) => update("firstName", v)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base mr-8"
          />
          <TextInput
            placeholder="Last Name"
            value={form.lastName}
            onChangeText={(v) => update("lastName", v)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base"
          />
        </View>

        {/* Contact */}
        <TextInput
          placeholder="Contact Number"
          keyboardType="number-pad"
          maxLength={10}
          value={form.contactNumber}
          onChangeText={(v) => update("contactNumber", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        <TextInput
          placeholder="Email Address (optional)"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(v) => update("email", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        {/* Password */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={form.password}
          onChangeText={(v) => update("password", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
        />

        {/* Location */}
        <TextInput
          placeholder="Pincode"
          keyboardType="number-pad"
          maxLength={6}
          value={form.pincode}
          onChangeText={(v) => update("pincode", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        <TextInput
          placeholder="City"
          value={form.city}
          onChangeText={(v) => update("city", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        <TextInput
          placeholder="State"
          value={form.state}
          onChangeText={(v) => update("state", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        <TextInput
          placeholder="Address"
          multiline
          numberOfLines={3}
          value={form.address}
          onChangeText={(v) => update("address", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
        />

        {/* Signup Button */}
        <TouchableOpacity className="bg-blue-600 py-4 rounded-full mb-4">
          <Text className="text-white text-center font-semibold text-base">
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View className="flex-row justify-center">
          <Text className="text-gray-600">Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text className="text-blue-600 font-medium">Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
