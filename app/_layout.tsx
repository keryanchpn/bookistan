import { HapticTab } from "@/app-example/components/haptic-tab";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="(pages)"
        options={{
          title: 'Books',
          tabBarLabel: 'Livres',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="statistique"
        options={{
          title: 'Statistique',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="stats-chart" color={color} />,
        }}
      />
    </Tabs>
    // <Stack
    //   screenOptions={{
    //     headerShown: true,
    //   }}
    // >
    //   <Stack.Screen
    //     name="index"
    //     options={{
    //       headerTitle: "Bookistan",
    //       headerLeft: () => (
    //         <Image
    //           source={require("@/assets/images/bookistan.png")}
    //           style={{ width: 35, height: 35 }}
    //           resizeMode="contain"
    //         />
    //       ),
    //     }}
    //   />
    //   <Stack.Screen name="(pages)" options={{ headerShown: false }} />
    // </Stack>
  );
}
