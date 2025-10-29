import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { Book } from "@/model/Book";
import { getBooks } from "@/service/BookService";
import BookListDetail from "@/component/BookListDetail";
import { useRouter } from "expo-router";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);

  const router = useRouter();

  useEffect(() => {
    getBooks().then((data) => setBooks(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Livres</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/bookDetail/[id]",
                params: { id: item.id.toString() },
              })
            }
          >
            <BookListDetail book={item} />
          </Pressable>
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F4F6F8",
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2933",
    marginBottom: 12,
  },
  listContent: {
    gap: 10,
    paddingBottom: 24,
  },
  separator: {
    height: 10,
  },
});
