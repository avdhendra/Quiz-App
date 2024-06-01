import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import QuizProvider from '@/context/QuizContext';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QuizProvider>

      <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "purple",
        },
        headerTintColor: "white",

      }}
      >
        <Stack.Screen name="(tabs)" options={{ title:"Quiz" }} />
        <Stack.Screen name="category/[id]" options={{title:"Quiz"}} />
        <Stack.Screen name="(edit)/[id]" options={{title:"Quiz"}}  />
        <Stack.Screen name="(quiz)/[id]" options={{title:"Quiz"}} />
        <Stack.Screen name="(quiz)/createquiz" options={{title:"Quiz"}} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </QuizProvider>
    </ThemeProvider>
  );
}
