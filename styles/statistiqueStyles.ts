import { StyleSheet } from "react-native";
import { Theme } from "@/theme";

export const createStatistiqueStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingHorizontal: theme.spacing.md,
      paddingTop: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
      gap: theme.spacing.lg,
    },
    header: {
      gap: 6,
    },
    title: {
      fontSize: theme.typography.title,
      fontWeight: "700",
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontSize: theme.typography.subtitle,
      color: theme.colors.text.secondary,
    },
    highlightRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    highlightCard: {
      flex: 1,
      minWidth: 120,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: 18,
      borderRadius: theme.radii.md,
      ...theme.shadows.highlight,
    },
    highlightPrimary: {
      backgroundColor: theme.colors.primary,
    },
    highlightSuccess: {
      backgroundColor: theme.colors.success,
    },
    highlightWarning: {
      backgroundColor: theme.colors.warning,
    },
    highlightLabel: {
      fontSize: theme.typography.caption,
      color: theme.colors.text.subtle,
      marginBottom: 6,
    },
    highlightValue: {
      fontSize: 24,
      fontWeight: "700",
      color: "#FFFFFF",
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.lg,
      padding: theme.spacing.lg,
      ...theme.shadows.card,
      gap: theme.spacing.md,
    },
    chartWrapper: {
      alignItems: "center",
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    cardDescription: {
      fontSize: theme.typography.body,
      color: theme.colors.text.muted,
      lineHeight: 20,
    },
    averageValue: {
      fontSize: theme.typography.display,
      fontWeight: "700",
      color: theme.colors.primary,
      textAlign: "center",
    },
    stateContainer: {
      alignItems: "center",
      justifyContent: "center",
      gap: theme.spacing.sm + theme.spacing.xs,
      paddingVertical: theme.spacing.lg,
    },
    stateText: {
      fontSize: theme.typography.body,
      color: theme.colors.text.secondary,
      textAlign: "center",
    },
    errorText: {
      fontSize: theme.typography.body,
      color: theme.colors.danger,
      textAlign: "center",
    },
  });
