import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  return (
    <View className="bg-blue-600 px-6 pt-8 pb-10 rounded-b-3xl">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-lg opacity-90">Hey,</Text>
          <Text className="text-white text-2xl font-semibold">Citizen</Text>
        </View>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
