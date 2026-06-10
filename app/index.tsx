import { useEffect } from "react";
import { ActivityIndicator, View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuthStore } from "store";
import { LoginScreen } from "screens";
import { ROUTES } from "@constants";
import { useBiometricUnlock } from "hooks";

export default function Index() {
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s._hydrated);
  const { isChecking, isUnlocked, isUnavailable, isFailed, retry } =
    useBiometricUnlock();

  useEffect(() => {
    if (!hydrated) return;
    if (!token) return;
    if (isUnavailable || isUnlocked) {
      router.replace(ROUTES.loading);
    }
  }, [token, hydrated, isUnlocked, isUnavailable]);

  if (!hydrated || isChecking) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (token && isFailed) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-50 p-6">
        <Text className="mb-2 text-base font-semibold text-slate-900">
          Authentication required
        </Text>
        <Text className="mb-6 text-center text-sm text-slate-500">
          Please verify your identity to continue.
        </Text>
        <Pressable
          className="items-center rounded-[10px] bg-blue-600 px-6 py-3.5"
          onPress={retry}
        >
          <Text className="text-base font-semibold text-white">Try again</Text>
        </Pressable>
      </View>
    );
  }

  if (token) return null;

  return (
    <>
      <LoginScreen />
      <StatusBar style="dark" />
    </>
  );
}
