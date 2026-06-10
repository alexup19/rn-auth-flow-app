# Auth Flow App

A mobile onboarding authentication sample app for iOS and Android powered by React Native, demonstrating a complete auth flow with status-based routing, protected routes, and persistent sessions.

## Features

- Atomic Design
- Auth Guard with Route Groups
- Biometric Unlock (Face ID / Touch ID)
- Document Upload
- Expo Router
- Expo Secure Store
- Haptic Feedback
- React Query
- TypeScript
- Unit Tests
- Zustand

## Demo Accounts

All demo accounts use `password` as the password.

| Email | Expected behavior |
|---|---|
| `user@example.com` | Success → onboarded → Dashboard |
| `onboarding@example.com` | Success → in progress → Onboarding (step 2 of 4) |
| `rejected@example.com` | Success → rejected → Onboarding + rejection alert |
| `mfa@example.com` | MFA required screen |
| `reset@example.com` | Reset password screen |
| `verify@example.com` | Verify email screen |
| `locked@example.com` | Account locked screen |
| Any other email | Invalid credentials error |

## Run Locally

Clone the project

```bash
git clone https://github.com/alexup19/rn-auth-flow-app.git
```

Go to the project directory

```bash
cd rn-auth-flow-app
```

Install dependencies

```bash
npm install
cd ios
pod install
cd ..
```

Start the app

```bash
npm start
```

Run on iOS

```bash
npm run ios
```

Run on Android

```bash
npm run android
```

## Run Tests

```bash
npm test
```

30 tests across 4 suites:

| Suite | Coverage |
|---|---|
| `getParam` utility | Pure function edge cases |
| `mockAuthApi` | All login status paths |
| `mockCustomerApi` | All customer status paths |
| `useLogin` hook | Full login flow including error handling |

## Tech Stack

| Package | Purpose |
|---|---|
| `expo-router` | File-based routing with route group auth guards |
| `zustand` | Global auth state with persistence |
| `expo-secure-store` | Hardware-backed token storage (iOS Keychain / Android Keystore) |
| `@tanstack/react-query` | Customer status fetching with caching and auto-retry |
| `expo-haptics` | Tactile feedback on login outcomes |
| `expo-local-authentication` | Biometric unlock on app resume |
| `expo-document-picker` | Identity document upload in onboarding flow |
| `reactotron-react-native` | Development state and network inspector |
| `reactotron-redux` | Redux DevTools integration for Zustand state visualization |

## Roadmap

- Complete onboarding wizard (steps 3 and 4)
- MFA code input screen
- Password reset form
- Email verification resend flow
- Push notifications
