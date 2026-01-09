import { StartClient } from "@tanstack/react-start-client";
import { hydrateRoot } from "react-dom/client";
import { AppRegistry } from "react-native-web";
import { getRouter } from "./router";

const router = getRouter();

// Register the app with AppRegistry
AppRegistry.registerComponent("Main", () => () => <StartClient router={router} />);

// Hydrate the app
hydrateRoot(document, <StartClient router={router} />);
