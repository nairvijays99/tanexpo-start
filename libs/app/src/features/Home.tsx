import { HomeKeys, useT } from "@libs/i18n";
import { Suspense, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { Link, useRouter } from "tanexpo";

function HomeContent() {
  const router = useRouter();
  const [shouldCrash, setShouldCrash] = useState(false);
  const { t, currentLanguage, changeLanguage } = useT("home");

  if (shouldCrash) {
    throw new Error("This is a test rendering error triggered from the Home screen!");
  }

  const toggleLanguage = () => {
    changeLanguage(currentLanguage === "en" ? "es" : "en");
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 36, color: "black" }}>{t(HomeKeys.welcome)}</Text>
      <Text style={{ fontSize: 16, color: "#666" }}>{t(HomeKeys.description)}</Text>

      <View
        style={{
          padding: 12,
          backgroundColor: "#f3f4f6",
          borderRadius: 8,
          marginVertical: 8,
          gap: 8,
        }}
      >
        <Text style={{ fontWeight: "600" }}>
          {t(HomeKeys.detectedLanguage)}: {currentLanguage}
        </Text>
        <Pressable
          onPress={toggleLanguage}
          style={({ pressed }) => ({
            backgroundColor: "#3b82f6",
            padding: 8,
            borderRadius: 4,
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text style={{ color: "white", textAlign: "center" }}>{t(HomeKeys.toggleLanguage)}</Text>
        </Pressable>
      </View>

      {/* Static */}
      <Link href="/about">Go to About</Link>

      {/* Static */}
      <Link href="/theme">Go to App Theme</Link>

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

      <View
        style={{
          marginTop: 20,
          paddingTop: 20,
          borderTopWidth: 1,
          borderTopColor: "#eee",
          gap: 12,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Test Shared Components:</Text>

        {/* Test Not Found */}
        <Link href="/this-route-does-not-exist">Test 404 (Not Found)</Link>

        {/* Test Error Boundary */}
        <Pressable
          onPress={() => {
            console.log("Home: Triggering error state");
            setShouldCrash(true);
          }}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
            padding: 8,
            backgroundColor: "#fee2e2",
            borderRadius: 4,
          })}
        >
          <Text style={{ color: "#991b1b" }}>Trigger Runtime Error (ErrorBoundary)</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function Home() {
  return (
    <Suspense fallback={<ActivityIndicator style={{ flex: 1 }} />}>
      <HomeContent />
    </Suspense>
  );
}
