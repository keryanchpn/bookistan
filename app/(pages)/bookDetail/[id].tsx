import BookFormModal from "@/component/bookFormModal";
import { Book } from "@/model/Book";
import { Comment } from "@/model/Comment";
import { addBookComment, deleteBook, getBookById, getBookComments, updateBook } from "@/service/BookService";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { ComponentProps, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [favIconName, setFavIconName] = useState<ComponentProps<typeof MaterialIcons>["name"]>("favorite-outline");
  const [readIconName, setReadIconName] = useState<ComponentProps<typeof Ionicons>["name"]>("checkmark-done-circle-outline");
  const [isModalVisible, setModalVisible] = useState(false);

  const router = useRouter();

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

  const loadComments = async () => {
    getBookComments(book ? book.id : 0).then((comments) => {
      setComments(comments);
    });
  };
  const deleteBookAndRedirect = async (bookId: number) => {
     Alert.alert(
      "Supprimer le livre",
      "Voulez-vous vraiment supprimer ce livre ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            await deleteBook(bookId);
            router.push("/books");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const addComment = async () => {
    if (!book || !newComment.trim()) {
      return;
    }
    await addBookComment(book.id, newComment.trim());
    setNewComment("");
    loadComments();
  };
  
  useEffect(() => {
    if (book) {
      loadComments();
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

  console.log("Book detail render", { book, loading });

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
        {/* <Image source={{ uri: book.cover }} style={{ width: 80, height: 120, borderRadius: 8, backgroundColor: "#E2E8F0" }} /> */}
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
        <InfoRow label="Note" value={`${book.rating}/10`} />
        <InfoRow label="Thème" value={book.theme} />
      </View>

      <BookFormModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        book={book}
        onSuccess={() => loadBook(String(book.id))}
      />

      <View>
        <Pressable onPress={() => setModalVisible(true)} style={styles.section}>
          <Text style={{ color: "#2563EB", fontWeight: "600", textAlign: "center" }}>Modifier le livre</Text>
        </Pressable>
        <View style={styles.spaced}></View>
        <Pressable onPress={() => deleteBookAndRedirect(book.id)} style={styles.section}>
          <Text style={{ color: "#9B1B30", fontWeight: "600", textAlign: "center" }}>Supprimer le livre</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#1F2933", marginBottom: 8 }}>Commentaires</Text>
        {comments.length === 0 ? (
          <Text style={{ color: "#52606D" }}>Aucun commentaire pour ce livre.</Text>
        ) : (
          comments.map((comment) => (
            <View key={comment.id} style={{ marginBottom: 12 }}>
              <Text style={{ color: "#3E4C59" }}>{comment.content}</Text>
              <Text style={{ color: "#9CA3AF", fontSize: 12 }}>{new Date(comment.dateISO).toLocaleDateString()}</Text>
            </View>
          ))
        )}
        <TextInput style={styles.input} placeholder="Ajouter un commentaire..." value={newComment} onChangeText={setNewComment} />
        <Pressable onPress={addComment} style={styles.button}>
          <Text style={styles.buttonText}>Envoyer le commentaire</Text>
        </Pressable>
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
  spaced: {
    marginBottom: 12,
  },
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
  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#F8FAFC",
    fontSize: 14,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
