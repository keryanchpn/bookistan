import BookFormModal from "@/component/bookFormModal";
import coverNotFound from "@/assets/images/cover-not-found.png";
import logo from "@/assets/images/bookistan.png";
import { Book } from "@/model/Book";
import { getBooksWithParams } from "@/service/BookService";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createIndexStyles } from "@/styles/indexStyles";
import { useTheme } from "@/theme";

export default function Index() {
  const router = useRouter();
  const [unreadBooks, setUnreadBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { theme, toggleTheme, mode } = useTheme();
  const styles = useMemo(() => createIndexStyles(theme), [theme]);

  const loadUnreadBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooksWithParams({ read: false });
      setUnreadBooks(data);
    } catch (error) {
      console.error("Failed to load unread books", error);
    } finally {
      setLoading(false);
    }
  };
  useFocusEffect(
    useCallback(() => {
      loadUnreadBooks();
    }, [])
  );

  const renderUnreadBook = ({ item }: { item: Book }) => {
    const coverSource = item.cover ? { uri: item.cover } : coverNotFound;
    return (
      <Pressable
        style={styles.bookCard}
        onPress={() =>
          router.push({
            pathname: "/bookDetail/[id]",
            params: { id: item.id.toString() },
          })
        }
      >
        <Image source={coverSource} style={styles.bookCover} />
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.bookAuthor} numberOfLines={1}>
          {item.author}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.brand}>Bookistan</Text>
          <Pressable style={styles.themeToggleButton} onPress={toggleTheme}>
            <Text style={styles.themeToggleText}>
              {mode === "light" ? "Mode sombre" : "Mode clair"}
            </Text>
          </Pressable>
        </View>

        <Text style={styles.title}>Bienvenue !</Text>
        <Text style={styles.subtitle}>Poursuivez vos découvertes littéraires.</Text>

        <View style={styles.carouselHeader}>
          <Text style={styles.sectionTitle}>À continuer</Text>
          <Pressable onPress={() => router.push("/books")}>
            <Text style={styles.sectionAction}>Voir tout</Text>
          </Pressable>
        </View>

        <View style={styles.carousel}>
          {loading ? (
            <Text style={styles.infoText}>Chargement des livres...</Text>
          ) : unreadBooks.length === 0 ? (
            <Text style={styles.infoText}>Aucun livre à lire pour le moment.</Text>
          ) : (
            <FlatList
              data={unreadBooks}
              horizontal
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderUnreadBook}
              contentContainerStyle={styles.carouselContent}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={[styles.actionButton, styles.primaryAction]} onPress={() => setModalVisible(true)}>
            <Text style={styles.actionTextPrimary}>Ajouter un livre</Text>
          </Pressable>
          <Pressable style={[styles.actionButton, styles.secondaryAction]} onPress={() => router.push("/books")}>
            <Text style={styles.actionTextSecondary}>Voir mes livres</Text>
          </Pressable>
        </View>

        <BookFormModal
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
          onSuccess={() => {
            setModalVisible(false);
            loadUnreadBooks();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
