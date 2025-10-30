import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const commentSectionStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.md,
    padding: theme.spacing.md,
    gap: theme.spacing.md,
    ...theme.shadows.card,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.text.primary,
  },
  emptyState: {
    color: theme.colors.text.secondary,
  },
  commentItem: {
    marginBottom: theme.spacing.sm + theme.spacing.xs,
  },
  commentContent: {
    color: theme.colors.text.muted,
  },
  commentDate: {
    color: theme.colors.text.secondary,
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.mutedBorder,
    borderRadius: theme.radii.md,
    paddingHorizontal: theme.spacing.md - 2,
    paddingVertical: theme.spacing.sm + theme.spacing.xs,
    backgroundColor: theme.colors.inputBackground,
    fontSize: theme.typography.body,
    marginTop: theme.spacing.sm,
    color: theme.colors.text.primary,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md - 4,
    borderRadius: theme.radii.sm + 4,
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.text.inverse,
    fontSize: 16,
    fontWeight: "600",
  },
});
