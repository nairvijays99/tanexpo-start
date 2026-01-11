import {
  createStartHandler,
  defaultRenderHandler,
  StartServer,
} from "@tanstack/react-start/server";
import * as RNWeb from "react-native-web";

// biome-ignore lint/suspicious/noExplicitAny: AppRegistry is incorrectly typed
const AppRegistry = (RNWeb as any).AppRegistry;

export default createStartHandler((ctx) => {
  // Register the app with AppRegistry on the server
  AppRegistry.registerComponent("Main", () => () => <StartServer router={ctx.router} />);

  return defaultRenderHandler(ctx);
});
