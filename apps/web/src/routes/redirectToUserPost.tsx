import { RedirectToUserPost } from "@basicapp/test-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/redirectToUserPost")({ component: RedirectToUserPost });
