import { RedirectToUser } from "@basicapp/test-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/redirectToUser")({ component: RedirectToUser });
