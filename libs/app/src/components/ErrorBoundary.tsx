import { type Theme, useAppTheme } from "@libs/theme";
import { Component, type ErrorInfo, type ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  // Router props support
  error?: Error;
  retry?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
    this.props.retry?.();
  };

  public render() {
    // If error is passed via props (from a router), use it
    const error = this.props.error || this.state.error;
    const hasError = !!this.props.error || this.state.hasError;

    if (hasError) {
      console.log("ErrorBoundary: hasError is true, rendering ErrorView", { error });
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorView error={error} onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}

export const ErrorView = ({ error, onReset }: { error: Error | null; onReset: () => void }) => {
  console.log("ErrorView: Rendering", { errorMessage: error?.message });
  let theme: Theme | undefined;
  try {
    // biome-ignore lint/correctness/useHookAtTopLevel: intentional safeguard in error view
    theme = useAppTheme().theme;
  } catch (_e) {
    // Fallback if theme context is missing to avoid recursive crash
  }

  const colors = theme?.colors || {
    background: "#FFFFFF",
    text: "#000000",
    tint: "#C76542",
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Oops! Something went wrong.</Text>
        <Text style={[styles.message, { color: colors.text }]}>
          {error?.message || "An unexpected error occurred."}
        </Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.tint }]}
          onPress={onReset}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    alignItems: "center",
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
