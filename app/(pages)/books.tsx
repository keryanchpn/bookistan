import { FlatList, Text, View, StyleSheet, Pressable, Modal } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Book } from "@/model/Book";
import { getBooks } from "@/service/BookService";
import BookListDetail from "@/component/BookListDetail";
import { useRouter } from "expo-router";
import AddBook from "./addBook";

export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const loadBooks = useCallback(async () => {
    try {
      const data = await getBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load books", err);
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Livres</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Ajouter un livre</Text>
        </Pressable>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <AddBook
              onClose={() => setModalVisible(false)}
              onSuccess={loadBooks}
            />
          </View>
        </View>
      </Modal>
      {loading ? (
        <Text>Chargement des livres... ( l'api peut prendre du temps à se reveiller )</Text>
      ) : books.length === 0 ? (
        <Text>Aucun livre disponible. Ajoutez-en un !</Text>
      ) : null}
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
            <BookListDetail book={item} onSuccess={loadBooks} />
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2933",
  },
  addButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    shadowColor: "#2563EB",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  listContent: {
    gap: 10,
    paddingBottom: 24,
  },
  separator: {
    height: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 20,
    overflow: "hidden",
  },
});
