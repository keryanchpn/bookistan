import BookFormModal from "@/component/bookFormModal";
import { Book } from "@/model/Book";
import { Comment } from "@/model/Comment";
import { addBookComment, deleteBook, getBookById, getBookComments, updateBook } from "@/service/BookService";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { ComponentProps, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useBookCover } from "@/hooks/useBookCover";
import CommentSection from "@/component/CommentSection";
export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [favIconName, setFavIconName] = useState<ComponentProps<typeof MaterialIcons>["name"]>("favorite-outline");
  const [readIconName, setReadIconName] = useState<ComponentProps<typeof Ionicons>["name"]>("checkmark-done-circle-outline");
  const [isModalVisible, setModalVisible] = useState(false);
  const { isbn, coverSource } = useBookCover(book);
  const [localCoverUri, setLocalCoverUri] = useState<string | null>(null);

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
    } else {
      setFavIconName("favorite-outline");
      setReadIconName("checkmark-done-circle-outline");
    }
  }, [book]);

  useEffect(() => {
    setLocalCoverUri(null);
  }, [book?.id]);

  const displayedCover = localCoverUri ? { uri: localCoverUri } : coverSource;

  const handleSelectCover = async () => {
    try {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        Alert.alert("Accès refusé", "Activez l'accès à la bibliothèque pour changer la couverture.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setLocalCoverUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Image picker error", error);
      Alert.alert("Erreur", "Impossible de sélectionner une image pour le moment.");
    }
  };

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

  const setRating = async (rating: number) => {
    if(!book) return;
    book.rating = rating;
    await updateBook(book.id, { rating: book.rating });
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
        <View style={styles.coverRow}>
          <Pressable style={styles.coverWrapper} onPress={handleSelectCover}>
            <Image source={displayedCover} style={styles.coverImage} />
            <View style={styles.coverOverlay}>
              <Text style={styles.coverOverlayText}>+</Text>
            </View>
          </Pressable>
          <View style={styles.coverInfo}>
            <Text style={styles.coverInfoTitle}>Informations</Text>
            <View style={styles.infoList}>
              <InfoRow label="Éditeur" value={book.editor} />
              <InfoRow label="Année" value={String(book.year)} />
              <InfoRow label="Thème" value={book.theme} />
              {isbn ? <InfoRow label="ISBN" value={isbn} /> : null}
              <View style={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Pressable key={i} onPress={() => setRating(i + 1)}>
                    <FontAwesome
                      name={i < Math.round(book.rating) ? "star" : "star-o"}
                      size={30}
                      color="#FBBF24"
                    />
                  </Pressable>
                ))}
              </View>
            </View>
          </View>
        </View>
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
      <CommentSection
        comments={comments}
        newComment={newComment}
        setNewComment={setNewComment}
        onSubmit={addComment}
      />

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
  stars: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-around"
  },
  coverRow: {
    flexDirection: "row",
    gap: 16,
    alignItems: "stretch",
  },
  coverWrapper: {
    position: "relative",
  },
  coverImage: {
    width: 110,
    height: 165,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },
  coverOverlay: {
    position: "absolute",
    right: 6,
    bottom: 6,
    backgroundColor: "rgba(37, 99, 235, 0.9)",
    borderRadius: 999,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  coverOverlayText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 20,
  },
  coverInfo: {
    flex: 1,
    gap: 12,
  },
  coverInfoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2933",
  },
  infoList: {
    gap: 10,
  },
  ratingRow: {
    alignItems: "center",
  },
});
