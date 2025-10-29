import { Book } from "@/model/Book";
import { View, Text, StyleSheet } from "react-native";

type BookListDetailProps = {
  book: Book;
};

export default function BookListDetail({ book }: BookListDetailProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.year}>{book.year}</Text>
      </View>
      <Text style={styles.author}>{book.author}</Text>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  year: {
    fontSize: 13,
    fontWeight: "500",
    color: "#3E4C59",
  },
});
