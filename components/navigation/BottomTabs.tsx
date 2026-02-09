import { Ionicons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { routeToIssueSummary, routeToIssuesList } from "@/utils/routes";
import { routeToDashboard } from "@/utils/routes";
import { useProfile } from "@/hooks/useProfile";

type TabItem = {
  key: "home" | "issues" | "dashboard";
  label: string;
  icon: "home-outline" | "list-outline" | "analytics-outline";
  onPress: () => void;
  isActive: (path: string) => boolean;
};

export default function BottomTabs() {
  const { user } = useProfile();
  const pathname = usePathname();

  const isAuthority = user?.role === "authority" || user?.role === "AUTHORITY";
  if (!isAuthority) return null;

  const tabs: TabItem[] = [
    {
      key: "home",
      label: "My Home",
      icon: "home-outline",
      onPress: () => routeToIssueSummary(),
      isActive: (path) => path.includes("issues-summary"),
    },
    {
      key: "issues",
      label: "My Issues",
      icon: "list-outline",
      onPress: () => routeToIssuesList("ALL"),
      isActive: (path) => path.includes("issues-list"),
    },
    {
      key: "dashboard",
      label: "Dashboard",
      icon: "analytics-outline",
      onPress: () => routeToDashboard(),
      isActive: (path) => path.includes("dashboard"),
    },
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex-row justify-between">
      {tabs.map((tab) => {
        const active = tab.isActive(pathname);
        const color = active ? "#2563EB" : "#6B7280";
        return (
          <TouchableOpacity
            key={tab.key}
            className="items-center flex-1"
            onPress={tab.onPress}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: active }}
          >
            <Ionicons name={tab.icon} size={20} color={color} />
            <Text
              className={`text-xs mt-1 ${active ? "text-blue-600" : "text-gray-500"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
