import { User } from "@libs/app";
import { createFileRoute } from "@tanstack/react-router";

export function UserScreen() {
  return <User />;
}

export const Route = createFileRoute("/user/$id/")({ component: UserScreen });
