import { StyleSheet } from "react-native";
import { theme } from "@/theme";

export const bookFormModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: `rgba(${theme.colors.text.primaryRgb}, 0.4)`,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.md + theme.spacing.sm,
  },
  modalCard: {
    width: "100%",
    maxWidth: 420,
    borderRadius: theme.radii.lg,
    overflow: "hidden",
  },
});
