import { ModalSelect } from "@/components/common/ModalSelect";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import TextLink from "@/components/ui/buttons/TextLink";
import signupUser from "@/services/signup";
import fetchWardsByPincode from "@/services/wards";
import { routeToLogin, routeToRoleSelection } from "@/utils/routes";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type FormData = {
  firstName: string;
  lastName: string;
  contactNumber: string;
  email: string;
  password: string;
  pincode: string;
  ward: {
    wardId: string;
    wardName: string;
  };
  wardName: string;
  address: string;
  city: string;
  state: string;
};

export default function SignupForm() {
  const {
    control,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      contactNumber: "",
      email: "",
      password: "",
      pincode: "",
      ward: {
        wardId: "",
        wardName: "",
      },
      address: "",
      city: "",
      state: "",
    },
  });

  const pincode = watch("pincode");

  const [wards, setWards] = useState<{ label: string; value: string }[]>([]);

  console.log("wards", wards);

  type WardCache = {
    city: string;
    state: string;
    wards: { label: string; value: string }[];
  };
  const cacheRef = useRef<Record<string, WardCache>>({});
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!/^\d{6}$/.test(pincode || "")) {
      setWards([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (cacheRef.current[pincode]) {
        const cached = cacheRef.current[pincode];
        setWards(cached.wards);
        setValue("city", cached.city);
        setValue("state", cached.state);
        return;
      }

      setWardValue(pincode);
    }, 400);
  }, [pincode]);

  const setWardValue = async (pin: string) => {
    try {
      const data = await fetchWardsByPincode(pin);

      cacheRef.current[pin] = data;
      setWards(data.wards);

      // auto-fill
      setValue("city", data.city);
      setValue("state", data.state);
    } catch (e) {
      console.error("Failed to fetch wards by pincode:", e);
      setWards([]);
      setValue("city", "");
      setValue("state", "");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        contactNumber: data.contactNumber,
        email: data.email || undefined,
        password: data.password,
        location: {
          pincode: data.pincode,
          wardId: data.ward.wardId,
          wardName: data.ward.wardName,
          address: data.address.trim(),
          city: data.city,
          state: data.state,
        },
      };

      const response = await signupUser(payload);
      if (response) {
        routeToRoleSelection();
      }
    } catch (err) {
      console.error("Signup error:", err);
      //error banner
    }
  };

  const Error = ({ msg }: { msg?: string }) =>
    msg ? <Text className="text-red-500 text-sm mt-1">{msg}</Text> : null;

  return (
    <View>
      {/* Name */}
      <View className="flex-row gap-3 mb-4">
        <Controller
          control={control}
          name="firstName"
          rules={{ required: "First name required" }}
          render={({ field }) => (
            <TextInput
              placeholder="First Name"
              accessibilityLabel="First name"
              {...field}
              onChangeText={field.onChange}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base w-40"
            />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          rules={{ required: "Last name required" }}
          render={({ field }) => (
            <TextInput
              placeholder="Last Name"
              accessibilityLabel="Last name"
              {...field}
              onChangeText={field.onChange}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-base w-40"
            />
          )}
        />
      </View>

      {/* Contact */}
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
            accessibilityLabel="Contact number"
            keyboardType="number-pad"
            maxLength={10}
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3"
          />
        )}
      />
      <Error msg={errors.contactNumber?.message} />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{
          validate: (v) => !v || /\S+@\S+\.\S+/.test(v) || "Invalid email",
        }}
        render={({ field }) => (
          <TextInput
            placeholder="Email Address (optional)"
            accessibilityLabel="Email address"
            autoCapitalize="none"
            keyboardType="email-address"
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3 mt-4"
          />
        )}
      />
      <Error msg={errors.email?.message} />

      {/* Location */}
      <View className="flex-row gap-3 mt-4">
        <Controller
          control={control}
          name="pincode"
          rules={{
            required: "Pincode required",
            pattern: {
              value: /^\d{6}$/,
              message: "Invalid pincode",
            },
          }}
          render={({ field }) => (
            <TextInput
              placeholder="Pincode"
              accessibilityLabel="Pincode"
              keyboardType="number-pad"
              maxLength={6}
              {...field}
              onChangeText={field.onChange}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 w-40 h-12"
            />
          )}
        />

        <View className="flex-1" style={{ position: "relative", zIndex: 50 }}>
          <Controller
            control={control}
            name="ward"
            rules={{
              validate: (v) => (v?.wardId ? true : "Ward required"),
            }}
            render={({ field }) => (
              <ModalSelect
                title="Select Ward"
                placeholder="Select Ward"
                value={field.value?.wardId}
                options={wards}
                disabled={wards.length === 0}
                onChange={(selected) => {
                  const selectedWard = wards.find((w) => w.value === selected);

                  if (!selectedWard) return;

                  const wardValue = {
                    wardId: selectedWard.value,
                    wardName: selectedWard.label,
                  };
                  field.onChange(wardValue);
                  setValue("ward", wardValue, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setValue("wardName", selectedWard.label, {
                    shouldValidate: false,
                  });
                  trigger("ward");
                }}
              />
            )}
          />
        </View>
      </View>
      <Error msg={errors.ward?.message} />

      {/* Address */}
      <Controller
        control={control}
        name="address"
        rules={{ required: "Address required" }}
        render={({ field }) => (
          <TextInput
            placeholder="Address"
            accessibilityLabel="Address"
            multiline
            numberOfLines={3}
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3 mt-4"
          />
        )}
      />

      {/* City / State */}
      <View className="flex-row gap-3 mt-4">
        <Controller
          control={control}
          name="city"
          render={({ field }) => (
            <TextInput
              placeholder="City"
              accessibilityLabel="City"
              {...field}
              onChangeText={field.onChange}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 w-40"
              style={{ position: "relative", zIndex: 0 }}
            />
          )}
        />
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <TextInput
              placeholder="State"
              accessibilityLabel="State"
              {...field}
              onChangeText={field.onChange}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-3 w-40"
            />
          )}
        />
      </View>

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password required",
          minLength: {
            value: 6,
            message: "Min 6 characters",
          },
        }}
        render={({ field }) => (
          <TextInput
            placeholder="Password"
            accessibilityLabel="Password"
            secureTextEntry
            {...field}
            onChangeText={field.onChange}
            className="border border-gray-300 rounded-xl px-4 py-3 mt-4"
          />
        )}
      />
      <Error msg={errors.password?.message} />
      {/* Signup Button */}
      <ButtonPrimary
        onPress={handleSubmit(onSubmit)}
        label="Sign Up"
        cssClass="rounded-full"
      />

      {/* Footer */}
      <View className="flex-row justify-center">
        <Text className="text-gray-600">Already have an account? Try </Text>
        <TextLink label={"Login"} onPress={() => routeToLogin()} />
      </View>
    </View>
  );
}
