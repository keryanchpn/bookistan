import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
export default function Index() {

  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Bienvenue au Bookistan !</Text>
      <Pressable onPress={() => {
        router.push("/books");
      }}>
        <Text>Voir les livres</Text>
      </Pressable>
    </View>
  );
}
