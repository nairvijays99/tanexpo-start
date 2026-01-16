import { RootProvider, ErrorBoundary as SharedErrorBoundary } from "@libs/app";
import { Stack } from "expo-router";

interface ErrorBoundaryProps {
  error: Error;
  retry: () => void;
}

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return <SharedErrorBoundary {...props} />;
}

export default function RootLayout() {
  return (
    <RootProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="theme" options={{ title: "App Theme" }} />
      </Stack>
    </RootProvider>
  );
}
