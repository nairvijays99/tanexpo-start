import { AppTheme } from "@libs/app";
import { createFileRoute } from "@tanstack/react-router";

export function ThemeScreen() {
  return <AppTheme />;
}

export const Route = createFileRoute("/theme")({ component: ThemeScreen });
