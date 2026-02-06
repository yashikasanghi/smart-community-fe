import { Image } from "react-native";

export default function Logo() {
  return (
    <Image
      source={require("../assets/images/login.png")}
      style={{
        width: 90,
        height: 90,
        alignSelf: "center",
        marginBottom: 12,
      }}
      resizeMode="contain"
    />
  );
}
