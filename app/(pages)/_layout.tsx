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
        name="bookDetail/[id]"
        options={{
          headerTitle: "Détail du livre",
        }}
      />
    </Stack>
  );
}
