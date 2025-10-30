import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image, Pressable, Text, View } from "react-native";
import { useBookCover } from "@/hooks/useBookCover";
import { Book } from "@/model/Book";
import { updateBook } from "@/service/BookService";
import { createBookListDetailStyles } from "@/styles/bookListDetailStyles";
import { useTheme } from "@/theme";
import { useMemo } from "react";
type BookListDetailProps = {
  book: Book;
  onSuccess?: () => void;
};

export default function BookListDetail({ book, onSuccess }: BookListDetailProps) {
  const favIconName : any = book.favorite ? "favorite" : "favorite-outline";
  const readIconName : any = book.read ? "checkmark-done-circle" : "checkmark-done-circle-outline";
  const { coverSource } = useBookCover(book);
  const { theme } = useTheme();
  const styles = useMemo(() => createBookListDetailStyles(theme), [theme]);

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
                color={theme.colors.rating.star}
              />
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.rightSection}>
        <Pressable onPress={setFavorite}>
          <MaterialIcons
            name={favIconName}
            size={30}
            color={book.favorite ? theme.colors.icon.favorite : theme.colors.icon.muted}
          />
        </Pressable>
        <Pressable onPress={setRead}>
          <Ionicons
            name={readIconName}
            size={30}
            color={book.read ? theme.colors.icon.read : theme.colors.icon.muted}
          />
        </Pressable>
      </View>
    </View>
  );
}
