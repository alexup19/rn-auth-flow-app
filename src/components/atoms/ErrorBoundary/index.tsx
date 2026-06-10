import { Component } from "react";
import { Text, View, Pressable } from "react-native";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "./types";
import { styles } from "./styles";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className={styles.container}>
          <Text className={styles.title}>Something went wrong</Text>
          <Pressable onPress={() => this.setState({ hasError: false })}>
            <Text className={styles.retry}>Try again</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}
