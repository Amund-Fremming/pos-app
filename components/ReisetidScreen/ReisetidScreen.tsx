import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, View } from "react-native";
import { createUserData } from "../../clients/backendClient";
import { useApiError } from "../../context/ApiErrorContext";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { MinutesChip } from "../shared/MinutesChip/MinutesChip";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./ReisetidScreen.styles";

const DURATION_OPTIONS = [10, 15, 20, 30, 45, 60];

function formatLabel(minutes: number): string {
  return minutes === 60 ? "1 time" : `${minutes} min`;
}

function toTimeString(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}:00`;
}

type Props = NativeStackScreenProps<OnboardingStackParamList, "Reisetid">;

export function ReisetidScreen({ navigation }: Props) {
  const { state, setCommuteMinutes, setUserId } = useOnboarding();
  const { showApiError } = useApiError();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFinish = async () => {
    if (state.homeLat === null || state.homeLon === null || state.workLat === null || state.workLon === null) {
      setError("Velg adresse fra listen på forrige steg.");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      const created = await createUserData({
        home_time: toTimeString(state.leaveHome),
        home_lat: state.homeLat,
        home_lon: state.homeLon,
        home_display: state.homeAddress,
        work_time: toTimeString(state.leaveWork),
        work_lat: state.workLat,
        work_lon: state.workLon,
        work_display: state.workAddress,
        alert_days: state.activeDays,
        commute_minutes: state.commuteMinutes,
        push_token: state.pushToken ?? undefined,
      });
      setUserId(created.id);
      navigation.navigate("Completion");
    } catch (err) {
      console.warn("Failed to create user data", err);
      showApiError(handleFinish);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <OnboardingLayout
      step={6}
      align="left"
      footer={<PrimaryButton label="Neste" variant="teal" onPress={handleFinish} disabled={isSubmitting} />}
    >
      <Text style={styles.eyebrow}>Reisetid</Text>
      <Text style={styles.headline}>Hvor lenge er du ute?</Text>
      <Text style={styles.body}>Vi sjekker været i hele dette vinduet, ikke bare i det du går ut.</Text>

      <View style={styles.grid}>
        {DURATION_OPTIONS.map((minutes) => (
          <MinutesChip
            key={minutes}
            label={formatLabel(minutes)}
            selected={state.commuteMinutes === minutes}
            onPress={() => setCommuteMinutes(minutes)}
          />
        ))}
      </View>
      <Text style={styles.hint}>{error ?? "Går du innom noe på veien? Velg litt lengre."}</Text>
    </OnboardingLayout>
  );
}
