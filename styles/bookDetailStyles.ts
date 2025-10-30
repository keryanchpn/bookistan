import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const bookDetailStyles = StyleSheet.create({
  spaced: {
    marginBottom: theme.spacing.sm + theme.spacing.xs,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md + 4,
    gap: theme.spacing.md,
    backgroundColor: theme.colors.background,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    gap: theme.spacing.sm,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  author: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.text.secondary,
  },
  section: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    gap: theme.spacing.md - 4,
    ...theme.shadows.card,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowLabel: {
    fontSize: theme.typography.body,
    fontWeight: "600",
    color: theme.colors.text.muted,
  },
  rowValue: {
    fontSize: theme.typography.body,
    fontWeight: "400",
    color: theme.colors.text.secondary,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.colors.danger,
  },
  coverRow: {
    flexDirection: "row",
    gap: theme.spacing.md,
    alignItems: "stretch",
  },
  coverWrapper: {
    position: "relative",
  },
  coverImage: {
    width: 110,
    height: 165,
    borderRadius: theme.radii.md - 6,
    backgroundColor: theme.colors.mutedSurface,
  },
  coverOverlay: {
    position: "absolute",
    right: 6,
    bottom: 6,
    backgroundColor: `rgba(${theme.colors.primaryRgb}, 0.9)`,
    borderRadius: theme.radii.pill,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  coverOverlayText: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 20,
  },
  coverInfo: {
    flex: 1,
    gap: theme.spacing.md - 4,
  },
  coverInfoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.text.primary,
  },
  infoList: {
    gap: theme.spacing.sm + 2,
  },
  stars: {
    flexDirection: "row",
    gap: theme.spacing.xs,
    justifyContent: "flex-start",
  },
  actionSection: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    ...theme.shadows.card,
  },
  primaryActionText: {
    color: theme.colors.primary,
    fontWeight: "600",
    textAlign: "center",
  },
  deleteActionText: {
    color: theme.colors.danger,
    fontWeight: "600",
    textAlign: "center",
  },
});
