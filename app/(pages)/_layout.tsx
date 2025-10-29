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
          headerShown: false,
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
