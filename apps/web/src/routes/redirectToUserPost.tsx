import { RedirectToUserPost } from "@libs/app";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/redirectToUserPost")({ component: RedirectToUserPost });
