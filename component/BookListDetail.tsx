import { Book } from "@/model/Book";
import { updateBook } from "@/service/BookService";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, StyleSheet, Text, View } from "react-native";
type BookListDetailProps = {
  book: Book;
  onSuccess?: () => void;
};

export default function BookListDetail({ book, onSuccess }: BookListDetailProps) {
  const favIconName : any = book.favorite ? "favorite" : "favorite-outline";
  const readIconName : any = book.read ? "checkmark-done-circle" : "checkmark-done-circle-outline";

  const setFavorite = async () => {
    book.favorite = !book.favorite;
    await updateBook(book.id, { favorite: book.favorite });
    onSuccess?.();
  };

  const setRead = async () => {
    book.read = !book.read;
    await updateBook(book.id, { read: book.read });
    onSuccess?.();
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.author}>{book.author}</Text>
      </View>
      <View style={styles.rightSection}>
        <Pressable onPress={setFavorite}>
          <MaterialIcons name={favIconName} size={30} color={book.favorite ? "#FF6B6B" : "#CBD5E1"} />
        </Pressable>
        <Pressable onPress={setRead}>
          <Ionicons name={readIconName} size={30} color={book.read ? "#34C759" : "#CBD5E1"} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
    gap: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2933",
    flexShrink: 1,
  },
  author: {
    fontSize: 14,
    fontWeight: "400",
    color: "#52606D",
  },
  leftSection: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  rightSection: {
    flexDirection: "row",
  },
  year: {
    fontSize: 13,
    fontWeight: "500",
    color: "#3E4C59",
  },
});
