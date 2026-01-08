import { Pressable, Text, View } from "react-native";
import { Link, useRouter } from "tanexpo";

export function Home() {
  const router = useRouter();

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text>Home</Text>

      {/* Static */}
      <Link href="/about">Go to About</Link>

      {/* Static */}
      <Link href="/about" prefetch={true}>
        Go to About (prefetch)
      </Link>

      {/* Static */}
      <Link href="/about" push={true}>
        Go to About (push - native only, web ignores)
      </Link>

      {/* Static */}
      <Link href="/about" replace={true}>
        Go to About (replace)
      </Link>

      {/* Dynamic: single param */}
      <Link
        href={{
          pathname: "/user/[id]",
          params: { id: "bacon" },
        }}
      >
        User bacon
      </Link>

      {/* Dynamic: multiple params */}
      <Link
        href={{
          pathname: "/user/[id]/post/[postId]",
          params: { id: "bacon", postId: "42", ref: "social" },
        }}
      >
        User bacon – Post 42
      </Link>

      {/* Dynamic + query */}
      <Link
        href={{
          pathname: "/user/[id]",
          params: { id: "bacon", tab: "settings" },
        }}
      >
        User bacon (tab=settings)
      </Link>

      {/* useRouter.push */}
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/user/[id]",
            params: { id: "router-push" },
          })
        }
      >
        <Text>router.push → /user/router-push</Text>
      </Pressable>

      {/* useRouter.replace */}
      <Pressable
        onPress={() =>
          router.replace({
            pathname: "/user/[id]/post/[postId]",
            params: { id: "replace", postId: "99" },
          })
        }
      >
        <Text>router.replace → user/replace/post/99</Text>
      </Pressable>

      {/* useRouter.navigate */}
      <Pressable
        onPress={() =>
          router.navigate({
            pathname: "/user/[id]/post/[postId]",
            params: { id: "navigate", postId: "99" },
          })
        }
      >
        <Text>router.navigate → user/navigate/post/99</Text>
      </Pressable>

      {/* Static */}
      <Link href="/redirectToUser">Redirect to user</Link>
      <Link href="/redirectToUserPost">Redirect to user post</Link>
    </View>
  );
}
