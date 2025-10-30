import { Platform } from "react-native";

export const theme = {
  colors: {
    background: "#F4F6F8",
    surface: "#FFFFFF",
    primary: "#2563EB",
    primaryRgb: "37, 99, 235",
    success: "#34D399",
    warning: "#FBBF24",
    accent: "#FB7185",
    danger: "#DC2626",
    border: "#E2E8F0",
    mutedBorder: "#CBD5E1",
    mutedSurface: "#F1F5F9",
    inputBackground: "#F8FAFC",
    placeholder: "#94A3B8",
    chart: {
      background: "#EEF2FF",
      gradientTo: "#E0E7FF",
      read: "#34D399",
      unread: "#FB7185",
    },
    icon: {
      muted: "#CBD5E1",
      favorite: "#FF6B6B",
      read: "#34C759",
    },
    badge: {
      info: "#2563EB",
      caution: "#F59E0B",
    },
    rating: {
      star: "#FACC15",
    },
    text: {
      primary: "#0F172A",
      primaryRgb: "15, 23, 42",
      secondary: "#475569",
      muted: "#64748B",
      inverse: "#FFFFFF",
      subtle: "#F8FAFC",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 12,
    md: 16,
    lg: 20,
    pill: 999,
  },
  typography: {
    title: 28,
    subtitle: 15,
    body: 14,
    caption: 13,
    display: 48,
  },
  fonts: {
    regular: Platform.select({
      ios: "HelveticaNeue",
      android: "Roboto",
      default: "System",
    }),
    medium: Platform.select({
      ios: "HelveticaNeue-Medium",
      android: "Roboto-Medium",
      default: "System",
    }),
    bold: Platform.select({
      ios: "HelveticaNeue-Bold",
      android: "Roboto-Bold",
      default: "System",
    }),
  },
  shadows: {
    card: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.06,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    highlight: {
      shadowColor: "#0F172A",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
  },
} as const;

export type Theme = typeof theme;
