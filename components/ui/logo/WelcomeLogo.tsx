import { Image } from "react-native";

export default function WelcomeLogo() {
  return (
    <Image
      source={require("@/assets/images/sc-splash.png")}
      className="w-44 h-44"
      resizeMode="contain"
    />
  );
}
