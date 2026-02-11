import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  cssClass?: string;
};

export default function TextLink({
  label,
  onPress,
  cssClass,
}: Readonly<Props>) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      accessibilityLabel={label}
    >
      <Text
        className={`text-primary font-medium ${cssClass}`}
        onPress={onPress}
      >
        {label}
      </Text>
    </Pressable>
  );
}
