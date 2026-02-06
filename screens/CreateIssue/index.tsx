import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import LogoImg from "@/components/ui/images/LogoImg";
import SubTitle from "@/components/ui/titles/SubTitle";
import Title from "@/components/ui/titles/Title";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function CreateIssueScreen() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm({ ...form, [key]: value });

  return (
    <ScreenWrapper>
      {/* Header */}
      <LogoImg />
      <Title label="Report New Issue" />
      <SubTitle label="Help us resolve community issues faster" />

      {/* Card */}
      <View
        className="bg-white rounded-3xl px-6 py-6 w-full max-w-md mt-6"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.1,
          shadowRadius: 18,
          elevation: 10,
        }}
      >
        {/* Issue Title */}
        <Text className="text-gray-700 font-medium mb-2">
          Short description
        </Text>
        <TextInput
          placeholder="Eg. Street light not working"
          value={form.title}
          onChangeText={(v) => update("title", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        {/* Description */}
        <Text className="text-gray-700 font-medium mb-2">Description</Text>
        <TextInput
          placeholder="Describe the issue in detail"
          multiline
          numberOfLines={4}
          value={form.description}
          onChangeText={(v) => update("description", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
          textAlignVertical="top"
        />

        {/* Category */}
        <Text className="text-gray-700 font-medium mb-2">Category</Text>
        <TextInput
          placeholder="Eg. Electricity, Road, Water"
          value={form.category}
          onChangeText={(v) => update("category", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-base"
        />

        {/* Pincode */}
        <Text className="text-gray-700 font-medium mb-2">Pincode</Text>
        <TextInput
          placeholder=""
          value={form.location}
          onChangeText={(v) => update("location", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
        />

        {/* Location */}
        <Text className="text-gray-700 font-medium mb-2">
          Location / Landmark
        </Text>
        <TextInput
          placeholder="Near main gate, sector 4"
          value={form.location}
          onChangeText={(v) => update("location", v)}
          className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-base"
        />

        {/* Submit */}
        <ButtonPrimary
          label="Submit Issue"
          onPress={() => {
            router.push("/issues-summary");
          }}
          cssClass="rounded-full"
        />
      </View>
    </ScreenWrapper>
  );
}
