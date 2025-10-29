import { Stack } from "expo-router";
import { Image } from "react-native";


export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Bookistan",
          headerLeft: () => (
            <Image
              source={require("@/assets/images/bookistan.png")}
              style={{ width: 35, height: 35 }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Stack.Screen name="(pages)" options={{ headerShown: false }} />
    </Stack>
  );
}
