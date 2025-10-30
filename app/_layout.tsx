import { HapticTab } from "@/app-example/components/haptic-tab";
import { ThemeProvider, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useMemo } from "react";

function TabsNavigator() {
  const { theme } = useTheme();
  const tabBarStyle = useMemo(
    () => ({
      backgroundColor: theme.colors.surface,
      borderTopColor: theme.colors.border,
    }),
    [theme],
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text.muted,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(pages)"
        options={{
          title: "Books",
          tabBarLabel: "Livres",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="book" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistique"
        options={{
          title: "Statistique",
          tabBarIcon: ({ color }) => (
            <Ionicons size={28} name="stats-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TabsNavigator />
    </ThemeProvider>
  );
}
