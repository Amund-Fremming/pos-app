import { InstrumentSerif_400Regular, InstrumentSerif_400Regular_Italic } from "@expo-google-fonts/instrument-serif";
import { Karla_400Regular, Karla_500Medium, Karla_600SemiBold } from "@expo-google-fonts/karla";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { HomeAddressScreen } from "./components/HomeAddressScreen/HomeAddressScreen";
import { IntroScreen } from "./components/IntroScreen/IntroScreen";
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
            <Stack.Screen name="HomeAddress" component={HomeAddressScreen} />
            <Stack.Screen name="WorkAddress" component={WorkAddressScreen} />
            <Stack.Screen name="TimesDays" component={TimesDaysScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </OnboardingProvider>
    </SafeAreaProvider>
  );
}
