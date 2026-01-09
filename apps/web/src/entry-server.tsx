import {
  createStartHandler,
  defaultRenderHandler,
  StartServer,
} from "@tanstack/react-start/server";
import { AppRegistry } from "react-native-web";

export default createStartHandler((ctx) => {
  // Register the app with AppRegistry on the server
  AppRegistry.registerComponent("Main", () => () => <StartServer router={ctx.router} />);

  return defaultRenderHandler(ctx);
});
