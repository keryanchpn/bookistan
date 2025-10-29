import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="books"
        options={{
          headerTitle: "Catalogue",
        }}
      />
      <Stack.Screen
        name="bookDetail"
        options={{
          headerTitle: "Détail du livre",
        }}
      />
    </Stack>
  );
}
