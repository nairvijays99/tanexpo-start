import { RootProvider } from "@libs/app";
import { fontLinks } from "@libs/theme";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AppRegistry, StyleSheet } from "react-native-web";

import appCss from "../styles.css?url";

function ThemeScript() {
  const code = `
(function () {
  try {
    var theme = localStorage.getItem("app.themeScheme");
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

function RootDocument({ children }: { children: React.ReactNode }) {
  let styles: React.ReactNode = null;

  if (typeof document === "undefined") {
    try {
      // Ensure application is registered
      AppRegistry.registerComponent("Main", () => () => null);
      const { getStyleElement } = AppRegistry.getApplication("Main");
      styles = getStyleElement();

      // If getStyleElement is not enough, try raw text
      if (!styles) {
        const sheet = StyleSheet.getSheet();
        styles = <style id="react-native-web-stylesheet">{sheet.textContent}</style>;
      }
    } catch (e) {
      console.error("Failed to get react-native-web styles:", e);
    }
  }

  // ⚠️ DO NOT REMOVE <html suppressHydrationWarning />:
  // This suppresses an intentional hydration mismatch caused by applying
  // the theme before first paint to avoid light/dark flash.
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <ThemeScript />
        <HeadContent />
        {styles}
      </head>
      <body>
        <RootProvider>{children}</RootProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      ...fontLinks,
      // App css
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});
