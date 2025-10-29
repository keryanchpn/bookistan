import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useBookCover } from "@/hooks/useBookCover";
import { Book } from "@/model/Book";
import { updateBook } from "@/service/BookService";
type BookListDetailProps = {
  book: Book;
  onSuccess?: () => void;
};

export default function BookListDetail({ book, onSuccess }: BookListDetailProps) {
  const favIconName : any = book.favorite ? "favorite" : "favorite-outline";
  const readIconName : any = book.read ? "checkmark-done-circle" : "checkmark-done-circle-outline";
  const { coverSource } = useBookCover(book);

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

  const setRating = async (rating: number) => {
    if (book.rating === rating) {
      return;
    }
    book.rating = rating;
    await updateBook(book.id, { rating });
    onSuccess?.();
  };

  return (
    <View style={styles.container}>
      <Image source={coverSource} style={styles.coverImage} />
      <View style={styles.leftSection}>
        <Text style={styles.title} numberOfLines={2}>{book.name}</Text>
        <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        <Text style={styles.theme} numberOfLines={1}>{book.theme}</Text>
        <View style={styles.ratingRow}>
          {Array.from({ length: 5 }, (_, index) => (
            <Pressable key={index} onPress={() => setRating(index + 1)}>
              <FontAwesome
                name={index < Math.round(book.rating) ? "star" : "star-o"}
                size={18}
                color="#FACC15"
              />
            </Pressable>
          ))}
        </View>
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
    gap: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coverImage: {
    width: 50,
    height: 75,
    borderRadius: 6,
    backgroundColor: "#E2E8F0",
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
  theme: {
    fontSize: 12,
    fontWeight: "500",
    color: "#64748B",
  },
  leftSection: {
    flex: 1,
    alignItems: "flex-start",
    gap: 6,
  },
  rightSection: {
    flexDirection: "row",
    gap: 8,
  },
  ratingRow: {
    flexDirection: "row",
    gap: 4,
  },
  year: {
    fontSize: 13,
    fontWeight: "500",
    color: "#3E4C59",
  },
});
