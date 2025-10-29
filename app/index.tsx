import { Book } from "@/model/Book";
import getBooks from "@/service/BookService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
export default function Index() {
  const [books, setBooks] = useState<Book[]>([]);

  const router = useRouter();

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);
  console.log(books);
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
