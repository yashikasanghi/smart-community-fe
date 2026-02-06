import { Text } from "react-native";

type TitleProps = {
  label?: string;
  cssClass?: string;
};

export default function Title({
  label = "Smart Community",
  cssClass,
}: Readonly<TitleProps>) {
  return (
    <Text
      className={`text-3xl font-bold text-gray-900 mb-1 text-center ${cssClass}`}
    >
      {label}
    </Text>
  );
}
