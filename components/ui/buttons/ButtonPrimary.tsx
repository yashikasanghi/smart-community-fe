import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  cssClass?: string;
};

export default function ButtonPrimary({
  label,
  onPress,
  cssClass = "rounded-lg",
}: Readonly<Props>) {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-primary py-3 px-16 shadow-sm my-4 ${cssClass}`}
    >
      <Text className="text-white text-base font-semibold text-center">
        {label}
      </Text>
    </Pressable>
  );
}
