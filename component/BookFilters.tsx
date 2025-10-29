import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { BookSortKey, SortOrder } from "@/service/BookService";

type Props = {
  isFilteredByRead: boolean | null;
  setIsFilteredByRead: Dispatch<SetStateAction<boolean | null>>;
  isFilteredByFavorite: boolean | null;
  setIsFilteredByFavorite: Dispatch<SetStateAction<boolean | null>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  sortKey: BookSortKey;
  setSortKey: Dispatch<SetStateAction<BookSortKey>>;
  sortOrder: SortOrder;
  setSortOrder: Dispatch<SetStateAction<SortOrder>>;
};

const BookFilters = ({
  isFilteredByRead,
  setIsFilteredByRead,
  isFilteredByFavorite,
  setIsFilteredByFavorite,
  searchQuery,
  setSearchQuery,
  sortKey,
  setSortKey,
  sortOrder,
  setSortOrder,
}: Props) => {
  const sortOptions: { label: string; value: BookSortKey }[] = [
    { label: "Titre", value: "title" },
    { label: "Auteur", value: "author" },
    { label: "Thème", value: "theme" },
  ];

  return (
    <View style={styles.filterSection}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un livre"
          placeholderTextColor="#94A3B8"
        />
        {searchQuery.length > 0 ? (
          <Pressable
            onPress={() => setSearchQuery("")}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>×</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.filterRow}>
        <Pressable
          style={[styles.filterButton, isFilteredByRead === null && styles.filterButtonActive]}
          onPress={() => setIsFilteredByRead(null)}
        >
          <Text style={[styles.filterButtonText, isFilteredByRead === null && styles.filterButtonTextActive]}>
            Tous
          </Text>
        </Pressable>
        <Pressable
          style={[styles.filterButton, isFilteredByRead === true && styles.filterButtonActive]}
          onPress={() => setIsFilteredByRead(true)}
        >
          <Text style={[styles.filterButtonText, isFilteredByRead === true && styles.filterButtonTextActive]}>
            Lus
          </Text>
        </Pressable>
        <Pressable
          style={[styles.filterButton, isFilteredByRead === false && styles.filterButtonActive]}
          onPress={() => setIsFilteredByRead(false)}
        >
          <Text style={[styles.filterButtonText, isFilteredByRead === false && styles.filterButtonTextActive]}>
            À lire
          </Text>
        </Pressable>
        <Text style={[styles.filterLabel, styles.filterLabelSpacing]}>/</Text>
        <Pressable
          style={[styles.filterButton, isFilteredByFavorite === true && styles.filterButtonActive]}
          onPress={() => setIsFilteredByFavorite((prev) => (prev ? null : true))}
        >
          <Text style={[styles.filterButtonText, isFilteredByFavorite === true && styles.filterButtonTextActive]}>
            Favoris
          </Text>
        </Pressable>
      </View>
      <View style={[styles.filterRow, styles.sortRow]}>
        <Text style={styles.filterLabel}>Tri :</Text>
        {sortOptions.map((option) => {
          const isActive = sortKey === option.value;
          const nextOrder = isActive && sortOrder === "asc" ? "desc" : "asc";
          const arrow = isActive ? (sortOrder === "asc" ? "↑" : "↓") : "";

          return (
            <Pressable
              key={option.value}
              style={[styles.filterButton, isActive && styles.filterButtonActive]}
              onPress={() => {
                if (isActive) {
                  setSortOrder(nextOrder);
                } else {
                  setSortKey(option.value);
                  setSortOrder("asc");
                }
              }}
            >
              <Text style={[styles.filterButtonText, isActive && styles.filterButtonTextActive]}>
                {option.label} {arrow}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: 16,
    paddingVertical: 8,
    gap: 12,
  },
  searchContainer: {
    width: "100%",
    position: "relative",
    marginBottom: 12,
  },
  searchInput: {
    width: "100%",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    color: "#1E293B",
  },
  clearButton: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
  },
  clearButtonText: {
    color: "#475569",
    fontSize: 16,
    fontWeight: "600",
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  sortRow: {
    flexWrap: "wrap",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
  },
  filterButtonActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  filterButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#1F2937",
  },
  filterButtonTextActive: {
    color: "#FFFFFF",
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },
  filterLabelSpacing: {
    marginLeft: 8,
  },
});

export default BookFilters;
