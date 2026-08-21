import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { DayChip } from "../shared/DayChip/DayChip";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { TimeTile } from "../shared/TimeTile/TimeTile";
import { styles } from "./TimesDaysScreen.styles";

const DAY_LABELS = ["M", "T", "O", "T", "F", "L", "S"];

type Props = NativeStackScreenProps<OnboardingStackParamList, "TimesDays">;

export function TimesDaysScreen({ navigation }: Props) {
  const { state, toggleDay } = useOnboarding();
  const count = state.activeDays.filter(Boolean).length;
  const summary = count === 0 ? "Ingen dager valgt." : `${count} dager med varsel.`;

  return (
    <OnboardingLayout
      step={5}
      align="left"
      footer={
        <PrimaryButton
          label="Ferdig"
          variant="teal"
          // TODO: persist onboarding config and schedule notifications
          onPress={() => navigation.navigate("Completion")}
        />
      }
    >
      <Text style={styles.eyebrow}>Tider</Text>
      <Text style={styles.headline}>Når drar du?</Text>
      <Text style={styles.body}>Varsel kommer 30 min før.</Text>

      <View style={styles.tileRow}>
        <TimeTile label="Ut" value={state.leaveHome} />
        <TimeTile label="Hjem" value={state.leaveWork} />
      </View>

      <View style={styles.dayRow}>
        {DAY_LABELS.map((label, index) => (
          <DayChip key={index} label={label} active={state.activeDays[index]} onPress={() => toggleDay(index)} />
        ))}
      </View>
      <Text style={styles.summary}>{summary}</Text>
    </OnboardingLayout>
  );
}
