import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { routeToIssueSummary } from "@/utils/routes";
import { ModalSelect } from "@/components/common/ModalSelect";
import { uploadIssueImage } from "@/services/uploadImage";
import { CATEGORIES } from "@/constants/issue-constants";
import { createIssue } from "@/services/createIssue";

type WardValue = {
  wardId: string;
  wardName: string;
};

type FormData = {
  shortDescription: string;
  description: string;
  category: string;
  pincode: string;
  location: string;
  ward: WardValue;
};

export default function CreateIssueForm() {
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      shortDescription: "",
      description: "",
      category: "",
      pincode: "302039", // prefilled
      location: "",
      ward: {
        wardId: "W001",
        wardName: "Ward 1", // prefilled
      },
    },
  });

  const Error = ({ msg }: { msg?: string }) =>
    msg ? <Text className="text-red-500 text-sm mt-1">{msg}</Text> : null;

  const onSubmit = async (form: FormData) => {
    try {
      const issue = await createIssue({
        shortDescription: form.shortDescription,
        description: form.description,
        category: form.category,
        location: {
          address: form.location,
          pincode: form.pincode,
          wardId: form.ward.wardId,
          wardName: form.ward.wardName,
        },
      });

      // issue.id is the REAL DB id
      if (selectedImage && issue?.id) {
        await uploadIssueImage(issue?.id, {
          uri: selectedImage.uri,
          type: selectedImage.mimeType,
          name: selectedImage.fileName ?? undefined,
        });
      }
      routeToIssueSummary();
    } catch (err) {
      console.error("Create issue failed:", err);
    }
  };

  return (
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
      {/* Short Description */}
      <Text className="text-gray-700 font-medium mb-2">Short description</Text>
      <Controller
        control={control}
        name="shortDescription"
        rules={{
          required: "Short description required",
          maxLength: {
            value: 200,
            message: "Max 200 characters allowed",
          },
        }}
        render={({ field }) => (
          <TextInput
            placeholder="Eg. Street light not working"
            maxLength={200}
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
        )}
      />
      <Error msg={errors.shortDescription?.message} />

      {/* Description */}
      <Text className="text-gray-700 font-medium mb-2 mt-4">Description</Text>
      <Controller
        control={control}
        name="description"
        rules={{ required: "Description required" }}
        render={({ field }) => (
          <TextInput
            placeholder="Describe the issue in detail"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
        )}
      />
      <Error msg={errors.description?.message} />

      {/* Category (Modal Select) */}
      <View className="mt-4" style={{ position: "relative", zIndex: 50 }}>
        <Controller
          control={control}
          name="category"
          rules={{ required: "Category required" }}
          render={({ field }) => (
            <ModalSelect
              title="Select Category"
              placeholder="Select Category"
              value={CATEGORIES.find((c) => c.value === field.value)?.label}
              options={CATEGORIES}
              onChange={(val) => field.onChange(val)}
            />
          )}
        />
        <Error msg={errors.category?.message} />
      </View>

      {/* Ward (Prefilled + Disabled) */}
      <Text className="text-gray-700 font-medium mb-2 mt-4">Ward</Text>
      <Controller
        control={control}
        name="ward"
        render={({ field }) => (
          <TextInput
            value={field.value.wardName}
            editable={false}
            className="border border-gray-200 bg-gray-100 rounded-xl px-4 py-3 text-base"
          />
        )}
      />

      {/* Pincode (Prefilled + Disabled) */}
      <Text className="text-gray-700 font-medium mb-2 mt-4">Pincode</Text>
      <Controller
        control={control}
        name="pincode"
        render={({ field }) => (
          <TextInput
            value={field.value}
            editable={false}
            keyboardType="number-pad"
            className="border border-gray-200 bg-gray-100 rounded-xl px-4 py-3 text-base"
          />
        )}
      />

      {/* Location */}
      <Text className="text-gray-700 font-medium mb-2 mt-4">
        Location / Landmark
      </Text>
      <Controller
        control={control}
        name="location"
        rules={{ required: "Location required" }}
        render={({ field }) => (
          <TextInput
            placeholder="Near main gate, sector 4"
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
        )}
      />
      <Error msg={errors.location?.message} />

      {/* Upload Image */}
      <Text className="text-gray-700 font-medium mb-2 mt-4">Upload Image</Text>

      <TouchableOpacity
        onPress={pickImage}
        className="border border-dashed border-gray-400 rounded-xl px-4 py-4 items-center justify-center"
      >
        <Text className="text-gray-500">
          {selectedImage ? "Change Image" : "Upload Image"}
        </Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image
          source={{ uri: selectedImage.uri }}
          className="w-full h-40 rounded-xl mt-3"
          resizeMode="cover"
        />
      )}

      {/* Submit */}
      <ButtonPrimary
        label="Submit Issue"
        onPress={handleSubmit(onSubmit)}
        cssClass="rounded-full mt-6"
      />
    </View>
  );
}
