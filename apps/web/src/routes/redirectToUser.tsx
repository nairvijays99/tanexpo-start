import { RedirectToUser } from "@libs/app";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/redirectToUser")({ component: RedirectToUser });
