import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { fetchNotificationCount } from "@/services/notifications";
import { useNotificationsStore } from "@/store/notificationsStore";
import { routeToNotifications } from "@/utils/routes";
import { useAuthStore } from "@/store/authStore";

export default function Header({ name = "User" }: { name?: string }) {
  const { count, setCount, setLastFetchedAt } = useNotificationsStore();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    let isMounted = true;

    const fetchCount = async () => {
      try {
        const value = await fetchNotificationCount();
        if (!isMounted) return;
        setCount(value ?? 0);
        setLastFetchedAt(Date.now());
      } catch {
        // ignore count failures
      }
    };

    fetchCount();
    const intervalId = setInterval(fetchCount, 15000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [setCount, setLastFetchedAt, user]);

  return (
    <View className="bg-blue-600 px-6 pt-8 pb-10 rounded-b-3xl">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-lg opacity-90">Hey,</Text>
          <Text className="text-white text-2xl font-semibold">{name}</Text>
        </View>

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
      </View>
    </View>
  );
}
