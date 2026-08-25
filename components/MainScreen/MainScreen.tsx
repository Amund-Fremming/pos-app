import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getWeather } from "../../clients/backendClient";
import { useApiError } from "../../context/ApiErrorContext";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { colors } from "../../theme/tokens";
import { DepartureTile } from "../shared/DepartureTile/DepartureTile";
import { GearButton } from "../shared/GearButton/GearButton";
import { styles as layoutStyles } from "../shared/OnboardingLayout/OnboardingLayout.styles";
import { WeatherIcon, type WeatherOutcome } from "../shared/WeatherIcon/WeatherIcon";
import { styles } from "./MainScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Main">;

const COPY: Record<WeatherOutcome, { headline: string; body: string }> = {
  rain: { headline: "Ta med regnjakka", body: "Regn fra 07:10 til 09:40 langs ruta di." },
  sun: { headline: "La regnjakka ligge hjemme", body: "Tørt hele veien, både ut og hjem." },
  cloudy: { headline: "Jakke ja, regnjakke nei", body: "Overskyet og tørt. Vanlig jakke holder." },
};

const OUTCOMES: WeatherOutcome[] = ["rain", "sun", "cloudy"];

export function MainScreen({ navigation }: Props) {
  const { state, resetUser } = useOnboarding();
  const { showApiError } = useApiError();
  const [outcomeIndex, setOutcomeIndex] = useState(() => Math.floor(Math.random() * OUTCOMES.length));

  const handleResetUser = () => {
    resetUser()
      .then(() => navigation.reset({ index: 0, routes: [{ name: "Intro" }] }))
      .catch((error) => console.warn("Failed to reset user", error));
  };

  useEffect(() => {
    const userId = state.userId;
    if (!userId) return;

    const fetchWeather = () =>
      getWeather(userId)
        .then((outcome) => setOutcomeIndex(OUTCOMES.indexOf(outcome)))
        .catch((error) => {
          console.warn("Failed to fetch weather", error);
          showApiError(fetchWeather);
        });
    fetchWeather();
  }, [state.userId, showApiError]);

  const outcome = OUTCOMES[outcomeIndex];
  const { headline, body } = COPY[outcome];

  return (
    <LinearGradient colors={[colors.paperTop, colors.paperBottom]} style={layoutStyles.canvas}>
      <SafeAreaView style={layoutStyles.card} edges={["top", "bottom"]}>
        <View style={styles.header}>
          <GearButton onPress={() => navigation.navigate("Settings")} />
        </View>
        <View style={styles.content}>
          <View style={styles.icon}>
            <WeatherIcon outcome={outcome} />
            {/* TODO - delete after dev */}
            <View style={styles.debugButtonWrap}>
              <Pressable
                style={styles.debugButton}
                onPress={() => setOutcomeIndex((i) => (i + 1) % OUTCOMES.length)}
              >
                <Text style={styles.debugButtonLabel}>Debug: neste vær</Text>
              </Pressable>
              <Pressable style={styles.debugButton} onPress={handleResetUser}>
                <Text style={styles.debugButtonLabel}>Reset user</Text>
              </Pressable>
            </View>
          </View>
          <Text style={styles.headline}>{headline}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>
        <View style={layoutStyles.buttonBlock}>
          <DepartureTile value={state.leaveHome} onPress={() => navigation.navigate("Settings")} />
          <Text style={styles.caption}>Trykk for å endre</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
