import { Pressable, Text, View } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "tanexpo";

export function UserPost() {
  const router = useRouter();
  const params = useLocalSearchParams();
  return (
    <View style={{ padding: 16 }}>
      <Link href="/">Go to Home</Link>
      {/* useRouter.replace */}
      <Pressable onPress={() => router.back()}>
        <Text>router.back</Text>
      </Pressable>
      <Text>User Post Screen</Text>
      <Text>{JSON.stringify(params)}</Text>
    </View>
  );
}
