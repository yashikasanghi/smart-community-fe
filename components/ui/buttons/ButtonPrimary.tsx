import { Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
};

export default function ButtonPrimary({ label, onPress }: Readonly<Props>) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-primary py-3 px-16 rounded-lg shadow-sm my-4"
    >
      <Text className="text-white text-base font-semibold text-center">
        {label}
      </Text>
    </Pressable>
  );
}
