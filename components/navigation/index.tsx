import { Redirect } from "expo-router";

export default function Navigation() {
  const isLoggedIn = false; // later from Zustand

  return isLoggedIn
    ? <Redirect href="/home" />
    : <Redirect href="/welcome" />;
}