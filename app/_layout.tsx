import "~/global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { Platform, View, Text } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "@rn-primitives/portal";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const { status, title } = useLocalSearchParams(); // Pega o status e o título da máquina

  const getStatusColor = (status: string) => {
    if (status === "Rodando") {
      return isDarkColorScheme ? "lightgreen" : "green";
    } else if (status === "Parado") {
      return isDarkColorScheme ? "lightcoral" : "red";
    } else if (status === "Pendente") {
      return isDarkColorScheme ? "yellow" : "orange";
    } else {
      return isDarkColorScheme ? "lightblue" : "blue";
    }
  };

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios",
        }}
        initialRouteName="login"
      >
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="machine_detail"
          options={({ route }) => ({
            headerShown: true,
            headerTitle: route.params?.title || "Detalhes da Máquina",
            headerShadowVisible: false,
            headerRight: () => (
              <Text
                style={{
                  color: getStatusColor(route.params?.status as string),
                  paddingRight: 20,
                }}
              >
                {route.params?.status}
              </Text>
            ),
          })}
        />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  );
}
