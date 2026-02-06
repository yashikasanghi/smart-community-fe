import { Image } from "react-native";

export default function LogoImg() {
  return (
    <Image
      source={require("../../../assets/images/login.png")}
      style={{
        width: 100,
        height: 100,
        alignSelf: "center",
        marginBottom: 12,
      }}
      resizeMode="contain"
    />
  );
}
