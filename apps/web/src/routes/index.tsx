import { Home } from "@basicapp/test-router";
import { createFileRoute } from "@tanstack/react-router";

export function HomeScreen() {
  return <Home />;
}

export const Route = createFileRoute("/")({ component: HomeScreen });
