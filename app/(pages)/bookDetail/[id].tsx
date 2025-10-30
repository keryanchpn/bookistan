import BookFormModal from "@/component/bookFormModal";
import { Book } from "@/model/Book";
import { Comment } from "@/model/Comment";
import { addBookComment, deleteBook, getBookById, getBookComments, updateBook } from "@/service/BookService";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ComponentProps, useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, ScrollView, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useBookCover } from "@/hooks/useBookCover";
import CommentSection from "@/component/CommentSection";
import { createBookDetailStyles } from "@/styles/bookDetailStyles";
import { useTheme } from "@/theme";
export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [favIconName, setFavIconName] = useState<ComponentProps<typeof MaterialIcons>["name"]>("favorite-outline");
  const [readIconName, setReadIconName] = useState<ComponentProps<typeof Ionicons>["name"]>("checkmark-done-circle-outline");
  const [isModalVisible, setModalVisible] = useState(false);
  const handleCoverPersisted = useCallback((url: string) => {
    setBook((prev) => (prev ? { ...prev, cover: url } : prev));
  }, []);
  const { isbn, coverSource } = useBookCover(book, { onCoverPersisted: handleCoverPersisted });
  const [localCoverUri, setLocalCoverUri] = useState<string | null>(null);
  const { theme } = useTheme();
  const styles = useMemo(() => createBookDetailStyles(theme), [theme]);

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
    if (!book) {
      return;
    }

    try {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) {
        Alert.alert("Accès refusé", "Activez l'accès à la bibliothèque pour changer la couverture.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images" as any,
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

  const InfoRow = ({ label, value }: InfoRowProps) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );

  console.log("Book detail render", { book, loading });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.text.primary} />
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
        <View style={styles.iconRow}>
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
                      color={theme.colors.rating.star}
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
        <Pressable onPress={() => setModalVisible(true)} style={styles.actionSection}>
          <Text style={styles.primaryActionText}>Modifier le livre</Text>
        </Pressable>
        <View style={styles.spaced}></View>
        <Pressable onPress={() => deleteBookAndRedirect(book.id)} style={styles.actionSection}>
          <Text style={styles.deleteActionText}>Supprimer le livre</Text>
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
