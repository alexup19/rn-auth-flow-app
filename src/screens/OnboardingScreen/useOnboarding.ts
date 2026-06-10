import { useEffect } from 'react';
import { Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useAuthStore } from 'store/authStore';
import { getParam } from 'utils';
import { ROUTES } from '@constants';
import * as DocumentPicker from 'expo-document-picker';

export function useOnboarding() {
  const params = useLocalSearchParams<Record<string, string>>();
  const rejected = getParam(params.rejected);
  const reason = getParam(params.reason);
  const supportReference = getParam(params.supportReference);

  const clearAuth = useAuthStore((s) => s.clearAuth);

  useEffect(() => {
    if (rejected === 'true') {
      Alert.alert(
        'Application rejected',
        `Your onboarding application was rejected.\n\nReason: ${reason}\n\nFor support, reference: ${supportReference}`,
        [{ text: 'OK' }],
      );
    }
  }, [rejected]);

  const handleLogout = () => {
    clearAuth();
    router.replace(ROUTES.login);
  };

  const handleUploadDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'application/pdf'],
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    Alert.alert(
      'Document uploaded',
      `${file.name} was uploaded successfully.`,
      [{ text: 'OK' }],
    );
  };

  return { handleLogout, handleUploadDocument };
}