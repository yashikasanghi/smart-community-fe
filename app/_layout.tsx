import { apolloClient } from "@/graphql/apolloClient";
import { useAuthStore } from "@/store/authStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloProvider } from "@apollo/client/react";
import "../global.css";
import ErrorFallback from "@/components/common/ErrorFallback";
import { useAppErrorStore } from "@/store/appErrorStore";
import { useNotificationStream } from "@/hooks/useNotificationStream";

export default function RootLayout() {
  const hydrate = useAuthStore((state) => state.hydrate);
  const hasError = useAppErrorStore((state) => Boolean(state.error));
  useNotificationStream();

  useEffect(() => {
    hydrate();
  }, []);
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
        {hasError ? <ErrorFallback /> : null}
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
