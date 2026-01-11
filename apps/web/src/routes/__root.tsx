import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import * as RNWeb from "react-native-web";

// biome-ignore lint/suspicious/noExplicitAny: AppRegistry is incorrectly typed as only a type in @types/react-native-web
const AppRegistry = (RNWeb as any).AppRegistry;
// biome-ignore lint/suspicious/noExplicitAny: StyleSheet is incorrectly typed as only a type in @types/react-native-web
const StyleSheet = (RNWeb as any).StyleSheet;

import appCss from "../styles.css?url";

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

  return (
    <html lang="en">
      <head>
        <HeadContent />
        {styles}
      </head>
      <body>
        {children}
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
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
});
