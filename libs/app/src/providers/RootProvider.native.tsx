import { customFontsToLoad, ThemeProvider, useAppTheme } from "@libs/theme";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import type { FC, PropsWithChildren } from "react";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const NavigationThemeBridge: FC<PropsWithChildren> = ({ children }) => {
  const { navigationTheme } = useAppTheme();

  return <NavigationThemeProvider value={navigationTheme}>{children}</NavigationThemeProvider>;
};

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  // Load fonts
  const [fontsLoaded, fontError] = useFonts(customFontsToLoad);

  const loaded = fontsLoaded;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish (remove SplashScreen.preventAutoHideAsync)
  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GestureHandlerRootView style={styles.container}>
        <KeyboardProvider>
          <ThemeProvider>
            <NavigationThemeBridge>{children}</NavigationThemeBridge>
          </ThemeProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
