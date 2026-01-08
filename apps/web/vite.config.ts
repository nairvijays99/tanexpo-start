import path from "node:path";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";

const rootTsconfig = path.resolve(__dirname, "../../tsconfig.base.json");
const webTsconfig = path.resolve(__dirname, "./tsconfig.json");

export default defineConfig(({ command, isSsrBuild }) => {
  const isBuild = command === "build" || isSsrBuild === true;
  const styleqAliases = isBuild
    ? [
        { find: /^styleq\/(.*)/, replacement: "styleq/dist/$1" },
        { find: /^styleq$/, replacement: "styleq/dist/styleq" },
      ]
    : [];

  return {
    plugins: [
      devtools(),
      viteTsConfigPaths({
        projects: [rootTsconfig, webTsconfig],
      }),
      tanstackStart(),
      viteReact(),
      nitro(),
    ],
    resolve: {
      alias: [
        {
          find: "@basicapp/ui",
          replacement: path.resolve(__dirname, "../../libs/ui/src"),
        },
        {
          find: "@basicapp/test-router",
          replacement: path.resolve(__dirname, "../../libs/test-router/src"),
        },
        { find: "react-native", replacement: "react-native-web" },
        { find: /^react-native\//, replacement: "react-native-web/" },
        {
          find: "react-native/Libraries/Image/AssetRegistry",
          replacement: "react-native-web/dist/modules/AssetRegistry",
        },
        {
          find: "react-native/Libraries/EventEmitter/RCTDeviceEventEmitter$",
          replacement:
            "react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter",
        },
        {
          find: "react-native/Libraries/vendor/emitter/EventEmitter$",
          replacement: "react-native-web/dist/vendor/react-native/emitter/EventEmitter",
        },
        {
          find: "react-native/Libraries/EventEmitter/NativeEventEmitter$",
          replacement: "react-native-web/dist/vendor/react-native/NativeEventEmitter",
        },

        ...styleqAliases,
        { find: /^inline-style-prefixer\/lib\/(.*)/, replacement: "inline-style-prefixer/es/$1" },
        { find: /^inline-style-prefixer\/lib$/, replacement: "inline-style-prefixer/es" },
        { find: /^css-in-js-utils\/lib\/(.*)/, replacement: "css-in-js-utils/es/$1" },
        { find: /^css-in-js-utils\/lib$/, replacement: "css-in-js-utils/es" },
      ],
      mainFields: ["module", "main"],
    },
    define: {
      __DEV__: JSON.stringify(process.env.NODE_ENV !== "production"),
      global: "window",
    },
    optimizeDeps: {
      include: [
        "react-native-web",
        "css-to-react-native",
        "inline-style-prefixer",
        "hyphenate-style-name",
        "style-to-css-string",
      ],
    },
    ssr: {
      noExternal: [
        "react-native-web",
        "inline-style-prefixer",
        "css-to-react-native",
        "hyphenate-style-name",
        "style-to-css-string",
        /^@basicapp\/.*/,
        isBuild ? "styleq" : false,
      ].filter(Boolean),
    },
    server: {
      fs: {
        allow: [path.resolve(__dirname, "../../")],
      },
    },
  };
});
