/**
 * Web typography configuration.
 *
 * This file is the single source of truth for:
 * - Font families used by the design system
 * - How fonts are loaded on the web (preconnect / preload / stylesheet)
 *
 * NOTE:
 * Actual <link> rendering happens in _root.tsx (SSR-safe).
 */

export const fontFamily = "Space Grotesk";

export const googleFontHref =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap";

/**
 * <link> metadata required to load fonts on the web.
 * Consumed by createRootRoute({ head }).
 */
export const fontLinks = [
  // Preconnect for faster font fetch
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },

  // Preload font stylesheet (critical for first paint)
  {
    rel: "preload",
    as: "style",
    href: googleFontHref,
  },

  // Load stylesheet normally
  {
    rel: "stylesheet",
    href: googleFontHref,
  },
] as const;

const fonts = {
  spaceGrotesk: {
    light: fontFamily,
    normal: fontFamily,
    medium: fontFamily,
    semiBold: fontFamily,
    bold: fontFamily,
  },
  system: {
    normal: "system-ui",
  },
  monospace: {
    normal: "monospace",
  },
} as const;

export const typography = {
  /**
   * Raw font families (rarely used directly).
   */
  fonts,

  /**
   * Primary font used throughout the app.
   */
  primary: fonts.spaceGrotesk,

  /**
   * Secondary/system font.
   */
  secondary: fonts.system,

  /**
   * Monospace font for code blocks.
   */
  code: fonts.monospace,
} as const;
