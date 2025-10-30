import { Platform, StyleSheet } from "react-native";
import { Theme } from "@/theme";

const webTransitionStyles: any =
  Platform.OS === "web"
    ? {
        transitionProperty: "border-color, box-shadow",
        transitionDuration: "120ms",
      }
    : {};

export const createAddBookStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      gap: theme.spacing.sm + theme.spacing.xs,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radii.lg,
      padding: theme.spacing.md + 4,
    },
    headerRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: theme.spacing.xs,
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: theme.colors.text.primary,
    },
    closeButton: {
      paddingHorizontal: theme.spacing.md - 4,
      paddingVertical: theme.spacing.xs + 2,
      borderRadius: theme.radii.sm,
      backgroundColor: `rgba(${theme.colors.text.primaryRgb}, 0.06)`,
    },
    closeButtonText: {
      fontSize: 14,
      fontWeight: "500",
      color: theme.colors.text.primary,
    },
    field: {
      gap: theme.spacing.xs + 2,
    },
    label: {
      fontSize: theme.typography.body,
      fontWeight: "500",
      color: theme.colors.text.primary,
    },
    input: {
      width: "100%",
      borderWidth: 1,
      borderColor: theme.colors.mutedBorder,
      borderRadius: theme.radii.md,
      paddingHorizontal: theme.spacing.md - 2,
      paddingVertical: theme.spacing.sm + theme.spacing.xs,
      backgroundColor: theme.colors.inputBackground,
      fontSize: theme.typography.body,
      color: theme.colors.text.primary,
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: theme.colors.mutedBorder,
      borderRadius: theme.radii.md,
      overflow: "hidden",
      backgroundColor: theme.colors.inputBackground,
      ...Platform.select({
        android: {
          height: 48,
          justifyContent: "center",
        },
        web: {
          height: 48,
        },
      }),
      ...webTransitionStyles,
    },
    pickerWrapperIOS: {
      paddingVertical: 4,
    },
    pickerWrapperWeb: {
      display: "flex",
    },
    pickerGlobal: {
      width: "100%",
      color: theme.colors.text.primary,
    },
    pickerIOS: {
      height: 180,
    },
    pickerItemIOS: {
      color: theme.colors.text.primary,
    },
    pickerWeb: {
      height: "100%",
    },
    errorText: {
      color: theme.colors.danger,
      fontSize: 13,
      fontWeight: "500",
    },
    submitButton: {
      marginTop: theme.spacing.xs + 2,
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.sm + theme.spacing.xs,
      borderRadius: theme.radii.md,
      alignItems: "center",
    },
    submitButtonPressed: {
      opacity: 0.85,
    },
    submitButtonDisabled: {
      backgroundColor: theme.colors.placeholder,
    },
    submitButtonText: {
      color: theme.colors.text.inverse,
      fontSize: 16,
      fontWeight: "600",
    },
  });
