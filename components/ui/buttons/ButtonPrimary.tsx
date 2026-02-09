import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  cssClass?: string;
  disabled?: boolean;
};

export default function ButtonPrimary({
  label,
  onPress,
  cssClass = "rounded-lg",
  disabled = false,
}: Readonly<Props>) {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-primary py-3 px-16 shadow-sm my-4 ${cssClass}`}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
    >
      <Text className="text-white text-base font-semibold text-center">
        {label}
      </Text>
    </Pressable>
  );
}
