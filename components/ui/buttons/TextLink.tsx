import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
};

export default function TextLink({ label, onPress }: Readonly<Props>) {
  return (
    <Pressable>
      <Text className="text-primary font-medium px-16 mx-6" onPress={onPress}>
        {label}
      </Text>
    </Pressable>
  );
}
