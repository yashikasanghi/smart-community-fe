import { Text } from "react-native";

type TitleProps = {
  label: string;
};

export default function Title({ label }: Readonly<TitleProps>) {
  return (
    <Text className="text-3xl font-bold text-gray-900 mb-2 text-center">
      {label}
    </Text>
  );
}
