import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import Reactotron from 'reactotron-react-native';
import type { AuthUser } from 'types/auth';

const secureStorage = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

type AuthState = {
  token: string | null;
  user: AuthUser | null;
  _hydrated: boolean;
  setAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
  setHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        token: null,
        user: null,
        _hydrated: false,
        setAuth: (token, user) => {
          Reactotron.log?.('setAuth', { token, user });
          set({ token, user });
        },
        clearAuth: () => {
          Reactotron.log?.('clearAuth');
          set({ token: null, user: null });
        },
        setHydrated: () => {
          Reactotron.log?.('setHydrated');
          set({ _hydrated: true });
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => secureStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHydrated();
        },
      },
    ),
    { name: 'AuthStore' },
  ),
);