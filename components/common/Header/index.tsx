import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useNotificationsStore } from "@/store/notificationsStore";
import { routeToNotifications } from "@/utils/routes";

export default function Header({
  name = "User",
  flag = true,
}: {
  name?: string;
  flag?: boolean;
}) {
  const { count } = useNotificationsStore();

  return (
    <View className="bg-blue-600 px-6 pt-8 pb-10 rounded-b-3xl">
      <View className="flex-row justify-between items-center">
        <View>
          {flag && <Text className="text-white text-lg opacity-90">Hey,</Text>}
          <Text className="text-white text-2xl font-semibold">{name}</Text>
        </View>

        {flag && (
          <TouchableOpacity
            onPress={routeToNotifications}
            accessibilityRole="button"
            accessibilityLabel={`Notifications${count ? `, ${count} unread` : ""}`}
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
            {count > 0 && (
              <View className="absolute -top-2 -right-2 bg-red-500 rounded-full min-w-[18px] h-[18px] px-1 items-center justify-center">
                <Text className="text-white text-[10px] font-semibold">
                  {count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
