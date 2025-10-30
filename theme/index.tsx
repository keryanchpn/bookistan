import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Platform, useColorScheme } from "react-native";

const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

const radii = {
  sm: 12,
  md: 16,
  lg: 20,
  pill: 999,
} as const;

const typography = {
  title: 28,
  subtitle: 15,
  body: 14,
  caption: 13,
  display: 48,
} as const;

const fonts = {
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
} as const;

const lightColors = {
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
} as const;

const darkColors = {
  background: "#0F172A",
  surface: "#1E293B",
  primary: "#60A5FA",
  primaryRgb: "96, 165, 250",
  success: "#22C55E",
  warning: "#FBBF24",
  accent: "#F472B6",
  danger: "#F87171",
  border: "#334155",
  mutedBorder: "#1F2937",
  mutedSurface: "#1E293B",
  inputBackground: "#111827",
  placeholder: "#94A3B8",
  chart: {
    background: "#1E293B",
    gradientTo: "#0F172A",
    read: "#34D399",
    unread: "#F472B6",
  },
  icon: {
    muted: "#475569",
    favorite: "#FB7185",
    read: "#4ADE80",
  },
  badge: {
    info: "#60A5FA",
    caution: "#F59E0B",
  },
  rating: {
    star: "#FACC15",
  },
  text: {
    primary: "#E2E8F0",
    primaryRgb: "226, 232, 240",
    secondary: "#CBD5F5",
    muted: "#94A3B8",
    inverse: "#0F172A",
    subtle: "#F1F5F9",
  },
} as const;

const lightShadows = {
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
} as const;

const darkShadows = {
  card: {
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  highlight: {
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
} as const;

export type ThemeMode = "light" | "dark";

const createTheme = (mode: ThemeMode) => ({
  colors: mode === "light" ? lightColors : darkColors,
  spacing,
  radii,
  typography,
  fonts,
  shadows: mode === "light" ? lightShadows : darkShadows,
});

export type Theme = ReturnType<typeof createTheme>;

type ThemeContextValue = {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemPreference = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(
    systemPreference === "dark" ? "dark" : "light",
  );

  const theme = useMemo(() => createTheme(mode), [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      mode,
      theme,
      toggleTheme,
      setMode,
    }),
    [mode, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
