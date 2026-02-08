import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextLink from "@/components/ui/buttons/TextLink";
import {
  routeToIssueSummary,
  routeToRoleSelection,
  routeToSignup,
} from "@/utils/routes";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import loginService from "@/services/login";

type FormData = {
  contactNumber: string;
  password: string;
};

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      contactNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        loginKey: data.contactNumber,
        password: data.password,
      };

      const response = await loginService(payload);

      if (response) {
        // If role not selected yet
        if (!response.user?.role) {
          routeToRoleSelection();
          return;
        }
        routeToIssueSummary();
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const Error = ({ msg }: { msg?: string }) =>
    msg ? <Text className="text-red-500 text-sm mt-1">{msg}</Text> : null;

  return (
    <View>
      {/* Contact number */}
      <Controller
        control={control}
        name="contactNumber"
        rules={{
          required: "Contact number required",
          pattern: {
            value: /^[6-9]\d{9}$/,
            message: "Invalid mobile number",
          },
        }}
        render={({ field }) => (
          <TextInput
            placeholder="Contact Number"
            keyboardType="number-pad"
            maxLength={10}
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3 mb-1 text-base"
          />
        )}
      />
      <Error msg={errors.contactNumber?.message} />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password required" }}
        render={({ field }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3 mt-4 mb-1 text-base"
          />
        )}
      />
      <Error msg={errors.password?.message} />

      {/* Login button */}
      <ButtonPrimary
        onPress={handleSubmit(onSubmit)}
        label="Login"
        cssClass="rounded-full mt-6"
      />
    </View>
  );
}
