import { Home } from "@libs/app";
import { createFileRoute } from "@tanstack/react-router";

export function HomeScreen() {
  return <Home />;
}

export const Route = createFileRoute("/")({ component: HomeScreen });
