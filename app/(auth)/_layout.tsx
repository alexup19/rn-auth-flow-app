import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Slot, router } from "expo-router";
import { useAuthStore } from "store";
import { ROUTES } from "@constants";

export default function AuthLayout() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hydrated);

  useEffect(() => {
    if (!hydrated) return;
    if (!token) router.replace(ROUTES.login);
  }, [token, hydrated]);

  if (!hydrated || !token) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return <Slot />;
}
