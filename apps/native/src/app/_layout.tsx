import { RootProvider } from "@libs/app";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <RootProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="about" options={{ title: "About" }} />
      </Stack>
    </RootProvider>
  );
}
