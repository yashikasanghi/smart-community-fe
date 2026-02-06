import { Text } from "react-native";

type SubTitleProps = {
  label: string;
};

export default function SubTitle({ label }: Readonly<SubTitleProps>) {
  return (
    <Text className="text-base text-gray-700 text-center mt-2">{label}</Text>
  );
}
