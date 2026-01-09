import { useFonts } from "@expo-google-fonts/space-grotesk";
import { customFontsToLoad, ThemeProvider } from "@libs/ui";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <KeyboardProvider>
          <Slot />
        </KeyboardProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
