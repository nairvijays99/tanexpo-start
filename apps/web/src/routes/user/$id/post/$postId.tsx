import { UserPost } from "@libs/app";
import { createFileRoute } from "@tanstack/react-router";

export function UserPostScreen() {
  return <UserPost />;
}

export const Route = createFileRoute("/user/$id/post/$postId")({ component: UserPostScreen });
