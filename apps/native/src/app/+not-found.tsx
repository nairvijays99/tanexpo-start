import { NotFound } from "@libs/app";
import { Stack } from "expo-router";
import { useRouter } from "tanexpo";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <NotFound
        onGoBack={() => {
          router.back();
        }}
      />
    </>
  );
}
