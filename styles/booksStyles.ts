import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createBooksStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      padding: theme.spacing.md,
      backgroundColor: theme.colors.background,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.md,
    },
    header: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    addButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 10,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radii.pill,
      shadowColor: theme.colors.primary,
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    addButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 14,
      fontWeight: "600",
    },
    listContent: {
      gap: theme.spacing.sm + theme.spacing.xs,
      paddingBottom: theme.spacing.lg,
    },
    separator: {
      height: theme.spacing.sm + theme.spacing.xs,
    },
    emptyState: {
      color: theme.colors.text.muted,
      fontSize: theme.typography.body,
      marginBottom: theme.spacing.sm,
    },
  });
