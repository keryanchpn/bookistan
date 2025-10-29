import { Book } from "@/model/Book";
import { getBookById, updateBook } from "@/service/BookService";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams } from "expo-router";
import { ComponentProps, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [favIconName, setFavIconName] = useState<ComponentProps<typeof MaterialIcons>["name"]>("favorite-outline");
  const [readIconName, setReadIconName] = useState<ComponentProps<typeof Ionicons>["name"]>("checkmark-done-circle-outline");

  useEffect(() => {
    if (id){
      loadBook(id);
    }
  }, [id]);

  const loadBook = async (bookId: string) => {
    if (!id) {
      setLoading(false);
      return;
    }
    getBookById(parseInt(id, 10)).then((fetchedBook) => {
      setBook(fetchedBook);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (book) {
      setFavIconName(book.favorite ? "favorite" : "favorite-outline");
      setReadIconName(book.read ? "checkmark-done-circle" : "checkmark-done-circle-outline");
    }
  }, [book]);

  const setFavorite = async () => {
    if(!book) return;
    book.favorite = !book.favorite;
    await updateBook(book.id, { favorite: book.favorite });
    loadBook(String(book.id));
  };

  const setRead = async () => {
    if(!book) return;
    book.read = !book.read;
    await updateBook(book.id, { read: book.read });
    loadBook(String(book.id));
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#3E4C59" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Livre introuvable.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{book.name}</Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Pressable onPress={setFavorite}>
            <MaterialIcons name={favIconName} size={30} color={book.favorite ? "#FF6B6B" : "#CBD5E1"} />
          </Pressable>
          <Pressable onPress={setRead}>
            <Ionicons name={readIconName} size={30} color={book.read ? "#34C759" : "#CBD5E1"} />
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <InfoRow label="Éditeur" value={book.editor} />
        <InfoRow label="Année" value={String(book.year)} />
        <InfoRow label="Lu" value={book.read ? "Oui" : "Non"} />
        <InfoRow label="Favori" value={book.favorite ? "Oui" : "Non"} />
        <InfoRow label="Note" value={`${book.rating}/10`} />
        <InfoRow label="Thème" value={book.theme} />
      </View>
    </ScrollView>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  content: {
    padding: 20,
    gap: 16,
    backgroundColor: "#F4F6F8",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2933",
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    color: "#52606D",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3E4C59",
  },
  rowValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#52606D",
  },
  errorText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#9B1B30",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
