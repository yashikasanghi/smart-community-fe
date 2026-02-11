import Header from "@/components/common/Header";
import Loader from "@/components/common/Loader";
import { ScreenWrapper } from "@/components/common/wrappers/ScreenWrapper";
import BottomTabs from "@/components/navigation/BottomTabs";
import ButtonPrimary from "@/components/ui/buttons/ButtonPrimary";
import { useProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/store/authStore";
import { routeToWelcome } from "@/utils/routes";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 8,
  },
});

export default function ProfileScreen() {
  const { user } = useProfile();
  const logout = useAuthStore((state) => state.logout);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fullName = useMemo(() => {
    const first = user?.firstName ?? "";
    const last = user?.lastName ?? "";
    return `${first} ${last}`.trim();
  }, [user?.firstName, user?.lastName]);

  const contactNumber = user?.contactNumber ?? "-";

  const handleLogout = useCallback(async () => {
    if (isLoggingOut) return;
    setError(null);
    setIsLoggingOut(true);
    try {
      await logout();
      routeToWelcome();
    } catch (err) {
      console.error("[Profile] logout failed", err);
      setError("Unable to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  }, [isLoggingOut, logout]);

  return (
    <ScreenWrapper cssClass="p-0">
      <View className="flex-1 bg-[#F6F9FC] w-full">
        <Header name={user?.firstName} />

        {!user ? (
          <Loader message="Loading profile..." />
        ) : (
          <View className="flex-1 px-6 -mt-8 pb-24">
            <View className="bg-white rounded-3xl px-6 py-6" style={styles.card}>
              <Text className="text-xl font-semibold text-gray-900">
                Profile
              </Text>

              <View className="mt-5">
                <Text className="text-xs text-gray-500">Name</Text>
                <Text className="text-gray-900 text-base font-medium">
                  {fullName || "-"}
                </Text>
              </View>

              <View className="mt-4">
                <Text className="text-xs text-gray-500">Contact Number</Text>
                <Text className="text-gray-900 text-base font-medium">
                  {contactNumber}
                </Text>
              </View>

              {error && (
                <Text className="text-red-600 text-sm mt-4">{error}</Text>
              )}
            </View>

            <View className="mt-auto mb-6">
              <ButtonPrimary
                label={isLoggingOut ? "Logging out..." : "Logout"}
                onPress={handleLogout}
                disabled={isLoggingOut}
                cssClass="rounded-full"
              />
            </View>
          </View>
        )}

        <BottomTabs />
      </View>
    </ScreenWrapper>
  );
}
