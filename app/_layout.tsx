import useThemeColors from '@/hooks/useThemeColors';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from 'react-query';



// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient()
export default function RootLayout() {
  const colors =  useThemeColors()

  const [loaded] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    "Outfit-Regular": require('../assets/fonts/Outfit-Regular.ttf'),
    "Outfit-SemiBold": require('../assets/fonts/Outfit-SemiBold.ttf'),
    "Striger": require('../assets/fonts/STRIGER.ttf'),
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
    <QueryClientProvider client={queryClient}>

      <Stack>
        <Stack.Screen name="index"  options={{ headerShown: false }} />
        <Stack.Screen name="home"  options={{ headerShown: false }} />
        <Stack.Screen name="add-listing"  options={{ headerShown: false }} />
        <Stack.Screen name="auth"   options={{
          headerStyle: {backgroundColor: colors.backgroundCode},
          headerTintColor: colors.foregroundCode,
          presentation: 'modal',
          headerTitle: "Authentication",
          headerShown: true,
         
        }} />
        <Stack.Screen name="select"  options={{ headerShown: true }} />
     
      </Stack>
    </QueryClientProvider>
    
  );
}
