import { UserPost } from "@basicapp/test-router";
import { createFileRoute } from "@tanstack/react-router";

export function UserPostScreen() {
  return <UserPost />;
}

export const Route = createFileRoute("/user/$id/post/$postId")({ component: UserPostScreen });
