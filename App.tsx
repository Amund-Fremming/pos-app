import { InstrumentSerif_400Regular, InstrumentSerif_400Regular_Italic } from "@expo-google-fonts/instrument-serif";
import { Karla_400Regular, Karla_500Medium, Karla_600SemiBold } from "@expo-google-fonts/karla";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CompletionScreen } from "./components/CompletionScreen/CompletionScreen";
import { HomeAddressScreen } from "./components/HomeAddressScreen/HomeAddressScreen";
import { IntroScreen } from "./components/IntroScreen/IntroScreen";
import { MainScreen } from "./components/MainScreen/MainScreen";
import { NotificationsScreen } from "./components/NotificationsScreen/NotificationsScreen";
import { SettingsScreen } from "./components/SettingsScreen/SettingsScreen";
import { TimesDaysScreen } from "./components/TimesDaysScreen/TimesDaysScreen";
import { WorkAddressScreen } from "./components/WorkAddressScreen/WorkAddressScreen";
import { OnboardingProvider } from "./context/OnboardingContext";
import type { OnboardingStackParamList } from "./navigation/types";

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export default function App() {
  const [fontsLoaded] = useFonts({
    InstrumentSerif_400Regular,
    InstrumentSerif_400Regular_Italic,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <OnboardingProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Intro"
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              fullScreenGestureEnabled: true,
              animation: "slide_from_right",
            }}
          >
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="HomeAddress" component={HomeAddressScreen} />
            <Stack.Screen name="WorkAddress" component={WorkAddressScreen} />
            <Stack.Screen name="TimesDays" component={TimesDaysScreen} />
            <Stack.Screen name="Completion" component={CompletionScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}
