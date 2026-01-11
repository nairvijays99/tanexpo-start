import { StartClient } from "@tanstack/react-start-client";
import { hydrateRoot } from "react-dom/client";
import * as RNWeb from "react-native-web";

// biome-ignore lint/suspicious/noExplicitAny: AppRegistry is incorrectly typed
const AppRegistry = (RNWeb as any).AppRegistry;

// Register the app with AppRegistry
AppRegistry.registerComponent("Main", () => () => <StartClient />);

// Hydrate the app
hydrateRoot(document, <StartClient />);
