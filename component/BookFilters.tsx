import { Dispatch, SetStateAction, useMemo } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { BookSortKey, SortOrder } from "@/service/BookService";
import { createBookFiltersStyles } from "@/styles/bookFiltersStyles";
import { useTheme } from "@/theme";

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
  const { theme } = useTheme();
  const styles = useMemo(() => createBookFiltersStyles(theme), [theme]);
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
          placeholderTextColor={theme.colors.placeholder}
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

export default BookFilters;
