import { FlatList, Text, View, StyleSheet, Pressable } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { Book } from "@/model/Book";
import { getBooksFiltered } from "@/service/BookService";
import BookListDetail from "@/component/BookListDetail";
import { useRouter } from "expo-router";
import BookFormModal from "@/component/bookFormModal";
import { useFocusEffect } from "expo-router";
import BookFilters from "@/component/BookFilters";


export default function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLoadingText, setShowLoadingText] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFilteredByRead, setIsFilteredByRead] = useState<boolean | null>(null);
  const [isFilteredByFavorite, setIsFilteredByFavorite] = useState<boolean | null>(null);

  const router = useRouter();

  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getBooksFiltered(isFilteredByRead, isFilteredByFavorite);
      setBooks(data);
    } catch (err) {
      console.error("Failed to load books", err);
    } finally {
      setLoading(false);
    }
  }, [isFilteredByRead, isFilteredByFavorite]);

  useFocusEffect(
    useCallback(() => {
      loadBooks();
    }, [loadBooks])
  );

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    if (loading) {
      timeout = setTimeout(() => setShowLoadingText(true), 400);
    } else {
      setShowLoadingText(false);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [loading]);

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

      <BookFormModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onSuccess={loadBooks}
      />

      <BookFilters
        isFilteredByRead={isFilteredByRead}
        setIsFilteredByRead={setIsFilteredByRead}
        isFilteredByFavorite={isFilteredByFavorite}
        setIsFilteredByFavorite={setIsFilteredByFavorite}
      />

      
      {loading && showLoadingText ? (
        <Text>Chargement des livres... ( l'api peut prendre du temps à se reveiller )</Text>
      ) : !loading && books.length === 0 ? (
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
});
