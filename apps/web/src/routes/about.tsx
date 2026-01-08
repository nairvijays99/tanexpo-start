import { About } from "@libs/app";
import { createFileRoute } from "@tanstack/react-router";

export function AboutScreen() {
  return <About />;
}

export const Route = createFileRoute("/about")({ component: AboutScreen });
