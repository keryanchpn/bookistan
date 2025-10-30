import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createBookFiltersStyles = (theme: Theme) =>
  StyleSheet.create({
    filterSection: {
      marginBottom: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      gap: theme.spacing.sm + theme.spacing.xs,
    },
    searchContainer: {
      width: "100%",
      position: "relative",
      marginBottom: theme.spacing.sm + theme.spacing.xs,
    },
    searchInput: {
      width: "100%",
      borderRadius: theme.radii.pill,
      borderWidth: 1,
      borderColor: theme.colors.mutedBorder,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: 10,
      backgroundColor: theme.colors.surface,
      fontSize: theme.typography.body,
      color: theme.colors.text.primary,
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
      backgroundColor: theme.colors.mutedSurface,
    },
    clearButtonText: {
      color: theme.colors.text.secondary,
      fontSize: 16,
      fontWeight: "600",
    },
    filterRow: {
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
      gap: theme.spacing.sm,
    },
    sortRow: {
      flexWrap: "wrap",
    },
    filterButton: {
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: theme.radii.pill,
      borderWidth: 1,
      borderColor: theme.colors.mutedBorder,
      backgroundColor: theme.colors.surface,
    },
    filterButtonActive: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    filterButtonText: {
      fontSize: 13,
      fontWeight: "500",
      color: theme.colors.text.primary,
    },
    filterButtonTextActive: {
      color: theme.colors.text.inverse,
    },
    filterLabel: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.text.secondary,
    },
    filterLabelSpacing: {
      marginLeft: theme.spacing.sm,
    },
  });
