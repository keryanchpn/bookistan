import { Book } from "@/model/Book";
import getBooks from "@/service/BookService";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
export default function Index() {
  const [books, setBooks] = useState<Book[]>([]);

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
      <Text>Books fetched from server:</Text>
      {books.map((book) => (
        <Text key={book.id}>{book.name}</Text>
      ))}
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
