import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, View } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { DayChip } from "../shared/DayChip/DayChip";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { TimePickerModal } from "../shared/TimePickerModal/TimePickerModal";
import { TimeTile } from "../shared/TimeTile/TimeTile";
import { styles } from "./TimesDaysScreen.styles";

const DAY_LABELS = ["M", "T", "O", "T", "F", "L", "S"];

type EditingField = "home" | "work" | null;

type Props = NativeStackScreenProps<OnboardingStackParamList, "TimesDays">;

function toTimeString(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}:00`;
}

export function TimesDaysScreen({ navigation }: Props) {
  const { state, toggleDay, setLeaveHome, setLeaveWork } = useOnboarding();
  const [error, setError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<EditingField>(null);
  const count = state.activeDays.filter(Boolean).length;
  const summary = count === 0 ? "Ingen dager valgt." : `${count} dager med varsel.`;

  const handleNext = () => {
    if (state.homeLat === null || state.homeLon === null || state.workLat === null || state.workLon === null) {
      setError("Velg adresse fra listen på forrige steg.");
      return;
    }

    setError(null);
    navigation.navigate("Reisetid");
  };

  return (
    <OnboardingLayout
      step={5}
      align="left"
      footer={<PrimaryButton label="Neste" variant="teal" onPress={handleNext} />}
    >
      <Text style={styles.eyebrow}>Tider</Text>
      <Text style={styles.headline}>Når drar du?</Text>
      <Text style={styles.body}>Varsel kommer 15 min før.</Text>

      <View style={styles.tileRow}>
        <TimeTile label="Ut" value={state.leaveHome} onPress={() => setEditingField("home")} />
        <TimeTile label="Hjem" value={state.leaveWork} onPress={() => setEditingField("work")} />
      </View>

      <View style={styles.dayRow}>
        {DAY_LABELS.map((label, index) => (
          <DayChip key={index} label={label} active={state.activeDays[index]} onPress={() => toggleDay(index)} />
        ))}
      </View>
      <Text style={styles.summary}>{error ?? summary}</Text>

      <TimePickerModal
        visible={editingField !== null}
        value={editingField === "work" ? state.leaveWork : state.leaveHome}
        onClose={() => setEditingField(null)}
        onConfirm={(value) => (editingField === "work" ? setLeaveWork(value) : setLeaveHome(value))}
      />
    </OnboardingLayout>
  );
}
