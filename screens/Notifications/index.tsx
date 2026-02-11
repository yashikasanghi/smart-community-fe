import Header from "@/components/common/Header";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import BottomTabs from "@/components/navigation/BottomTabs";
import Title from "@/components/ui/titles/Title";
import {
  fetchNotifications,
  markNotificationRead,
  markNotificationsReadByIssue,
} from "@/services/notifications";
import { useNotificationsStore } from "@/store/notificationsStore";
import { routeToIssueDetails } from "@/utils/routes";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function NotificationsScreen() {
  const { items, setItems, setCount } = useNotificationsStore();

  useEffect(() => {
    const fetchNotificationsList = async () => {
      try {
        const list = await fetchNotifications();
        setItems(list);
        const unread = list.filter((n: any) => !n.read).length;
        setCount(unread);
      } catch {
        setItems([]);
      }
    };
    fetchNotificationsList();
  }, [setCount, setItems]);

  const markRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      const updated = items.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      );
      setItems(updated);
      const unread = updated.filter((n) => !n.read).length;
      setCount(unread);
    } catch {
      // ignore
    }
  };

  const markIssueRead = async (issueId: string) => {
    try {
      await markNotificationsReadByIssue(issueId);
      const updated = items.map((n) =>
        n.issueId === issueId ? { ...n, read: true } : n,
      );
      setItems(updated);
      const unread = updated.filter((n) => !n.read).length;
      setCount(unread);
    } catch {
      // ignore
    }
  };

  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 w-full bg-[#F6F9FC]">
        <Header name="Notifications" flag={false} />

        <ScrollView className="px-6 -mt-8" showsVerticalScrollIndicator={false}>
          <View className="bg-white rounded-3xl px-4 py-4 mb-10">
            {items.length === 0 && (
              <Text className="text-gray-500 text-sm py-6 text-center">
                No notifications yet.
              </Text>
            )}
            {items.map((n: any, index: number) => (
              <TouchableOpacity
                key={n.id || n._id || index}
                onPress={() => {
                  const issueId = n.issueId;
                  const id = n.id || n._id;
                  if (issueId) {
                    markIssueRead(issueId);
                  } else if (id) {
                    markRead(id);
                  }
                  routeToIssueDetails(n.issueId);
                }}
                className={`py-3 ${
                  index !== items.length - 1 ? "border-b border-gray-100" : ""
                }`}
                accessibilityRole="button"
                accessibilityLabel={`Notification: ${n.title}. ${n.read ? "Read" : "Unread"}.`}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1 pr-3">
                    <Text
                      className={`text-sm ${
                        n.read ? "text-gray-700" : "text-gray-900 font-semibold"
                      }`}
                    >
                      {n.title}
                    </Text>
                    <Text className="text-gray-500 text-xs mt-1">
                      {n.message}
                    </Text>
                  </View>
                  {!n.read && (
                    <View className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <BottomTabs />
    </ScreenWrapper>
  );
}
