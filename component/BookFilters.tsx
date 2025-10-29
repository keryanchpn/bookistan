import { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  isFilteredByRead: boolean | null;
  setIsFilteredByRead: Dispatch<SetStateAction<boolean | null>>;
  isFilteredByFavorite: boolean | null;
  setIsFilteredByFavorite: Dispatch<SetStateAction<boolean | null>>;
};

const BookFilters = ({
  isFilteredByRead,
  setIsFilteredByRead,
  isFilteredByFavorite,
  setIsFilteredByFavorite,
}: Props) => {
  return (
    <View style={styles.filterSection}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
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
