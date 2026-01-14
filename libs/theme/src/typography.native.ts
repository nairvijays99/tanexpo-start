import {
  SpaceGrotesk_700Bold as spaceGroteskBold,
  SpaceGrotesk_300Light as spaceGroteskLight,
  SpaceGrotesk_500Medium as spaceGroteskMedium,
  SpaceGrotesk_400Regular as spaceGroteskRegular,
  SpaceGrotesk_600SemiBold as spaceGroteskSemiBold,
} from "@expo-google-fonts/space-grotesk";
import { Platform } from "react-native";

export const customFontsToLoad = {
  spaceGroteskLight,
  spaceGroteskRegular,
  spaceGroteskMedium,
  spaceGroteskSemiBold,
  spaceGroteskBold,
};

const fonts = {
  spaceGrotesk: {
    // Cross-platform Google font with numeric weights
    light: { fontFamily: "spaceGroteskLight" as const, fontWeight: "300" as const },
    normal: { fontFamily: "spaceGroteskRegular" as const, fontWeight: "400" as const },
    medium: { fontFamily: "spaceGroteskMedium" as const, fontWeight: "500" as const },
    semiBold: { fontFamily: "spaceGroteskSemiBold" as const, fontWeight: "600" as const },
    bold: { fontFamily: "spaceGroteskBold" as const, fontWeight: "700" as const },
  },
  helveticaNeue: {
    // iOS only font.
    thin: { fontFamily: "HelveticaNeue-Thin" as const },
    light: { fontFamily: "HelveticaNeue-Light" as const },
    normal: { fontFamily: "Helvetica Neue" as const },
    medium: { fontFamily: "HelveticaNeue-Medium" as const },
  },
  courier: {
    // iOS only font.
    normal: { fontFamily: "Courier" as const },
  },
  sansSerif: {
    // Android only font.
    thin: { fontFamily: "sans-serif-thin" as const },
    light: { fontFamily: "sans-serif-light" as const },
    normal: { fontFamily: "sans-serif" as const },
    medium: { fontFamily: "sans-serif-medium" as const },
  },
  monospace: {
    // Android only font.
    normal: { fontFamily: "monospace" as const },
  },
};

// Platform-specific secondary font
// @ts-expect-error - Platform.select types are overly strict, runtime behavior is correct
const secondaryFont = Platform.select({
  ios: fonts.helveticaNeue,
  android: fonts.sansSerif,
}) as typeof fonts.helveticaNeue | typeof fonts.sansSerif;

// Platform-specific code font
// @ts-expect-error - Platform.select types are overly strict, runtime behavior is correct
const codeFont = Platform.select({
  ios: fonts.courier,
  android: fonts.monospace,
}) as typeof fonts.courier | typeof fonts.monospace;

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.spaceGrotesk,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: secondaryFont,
  /**
   * Lets get fancy with a monospace font!
   */
  code: codeFont,
};
