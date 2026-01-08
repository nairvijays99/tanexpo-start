import { User } from "@basicapp/test-router";
import { createFileRoute } from "@tanstack/react-router";

export function UserScreen() {
  return <User />;
}

export const Route = createFileRoute("/user/$id/")({ component: UserScreen });
