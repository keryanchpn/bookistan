import BookFormModal from "@/component/bookFormModal";
import coverNotFound from "@/assets/images/cover-not-found.png";
import logo from "@/assets/images/bookistan.png";
import { Book } from "@/model/Book";
import { getBooksWithParams } from "@/service/BookService";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const [unreadBooks, setUnreadBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 16,
  },
  brand: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2933",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2933",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#52606D",
  },
  carouselHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2933",
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  carousel: {
    minHeight: 200,
  },
  carouselContent: {
    gap: 16,
    paddingRight: 8,
  },
  bookCard: {
    width: 140,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  bookCover: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    backgroundColor: "#E2E8F0",
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2933",
  },
  bookAuthor: {
    fontSize: 12,
    fontWeight: "400",
    color: "#64748B",
  },
  infoText: {
    fontSize: 14,
    color: "#64748B",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryAction: {
    backgroundColor: "#2563EB",
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: "#2563EB",
    backgroundColor: "#FFFFFF",
  },
  actionTextPrimary: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  actionTextSecondary: {
    color: "#2563EB",
    fontSize: 15,
    fontWeight: "600",
  },
});
