import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createIndexStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md + theme.spacing.sm,
      gap: theme.spacing.lg,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      borderRadius: theme.radii.md + 2,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.card,
    },
    logo: {
      width: 56,
      height: 56,
      borderRadius: theme.radii.md,
    },
    brand: {
      fontSize: 24,
      fontWeight: "700",
      color: theme.colors.text.primary,
      flex: 1,
    },
    title: {
      fontSize: theme.typography.title,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "400",
      color: theme.colors.text.secondary,
    },
    themeToggleButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: theme.radii.pill,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    themeToggleText: {
      fontSize: 13,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    carouselHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    sectionAction: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.primary,
    },
    carousel: {
      minHeight: 200,
    },
    carouselContent: {
      gap: theme.spacing.md,
      paddingRight: theme.spacing.sm,
    },
    bookCard: {
      width: 140,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.md,
      padding: theme.spacing.sm + theme.spacing.xs,
      gap: theme.spacing.sm,
      ...theme.shadows.card,
    },
    bookCover: {
      width: "100%",
      height: 160,
      borderRadius: theme.radii.sm,
      backgroundColor: theme.colors.mutedSurface,
    },
    bookTitle: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    bookAuthor: {
      fontSize: 12,
      fontWeight: "400",
      color: theme.colors.text.muted,
    },
    infoText: {
      fontSize: 14,
      color: theme.colors.text.muted,
    },
    actionsRow: {
      flexDirection: "row",
      gap: theme.spacing.sm + theme.spacing.xs,
    },
    actionButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: theme.radii.pill,
      alignItems: "center",
      justifyContent: "center",
    },
    primaryAction: {
      backgroundColor: theme.colors.primary,
    },
    secondaryAction: {
      borderWidth: 1,
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surface,
    },
    actionTextPrimary: {
      color: theme.colors.text.inverse,
      fontSize: 15,
      fontWeight: "600",
    },
    actionTextSecondary: {
      color: theme.colors.primary,
      fontSize: 15,
      fontWeight: "600",
    },
  });
