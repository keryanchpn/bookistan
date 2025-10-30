import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createBookListDetailStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      paddingVertical: theme.spacing.sm + theme.spacing.xs,
      paddingHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.md - 6,
      gap: theme.spacing.sm,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      ...theme.shadows.card,
    },
    coverImage: {
      width: 50,
      height: 75,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.mutedSurface,
    },
    leftSection: {
      flex: 1,
      alignItems: "flex-start",
      gap: theme.spacing.xs + 2,
    },
    rightSection: {
      flexDirection: "row",
      gap: theme.spacing.sm,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.colors.text.primary,
      flexShrink: 1,
    },
    author: {
      fontSize: 14,
      fontWeight: "400",
      color: theme.colors.text.secondary,
    },
    theme: {
      fontSize: 12,
      fontWeight: "500",
      color: theme.colors.text.muted,
    },
    ratingRow: {
      flexDirection: "row",
      gap: theme.spacing.xs,
    },
  });
