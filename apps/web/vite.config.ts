import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import viteTsConfigPaths from "vite-tsconfig-paths";
import viteTanexpo from "vite-plugin-tanexpo";

export default defineConfig(() => {
  return {
    plugins: [
      devtools(),
      viteTsConfigPaths({
        projects: ["../../tsconfig.base.json", "./tsconfig.json"],
      }),
      tanstackStart(),
      viteReact({
        babel: {
          plugins: ["babel-plugin-react-compiler"],
        },
      }),
      nitro(),
      viteTanexpo({
        externalPackages: [
          "moti",
          "react-native-reanimated",
          "react-native-gesture-handler",
          "@libs/app",
        ],
      }),
    ],
  };
});
