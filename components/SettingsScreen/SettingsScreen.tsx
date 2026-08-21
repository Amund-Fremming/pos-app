import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardAvoidingView, Platform, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { colors } from "../../theme/tokens";
import { BackButton } from "../shared/BackButton/BackButton";
import { DayChip } from "../shared/DayChip/DayChip";
import { styles as layoutStyles } from "../shared/OnboardingLayout/OnboardingLayout.styles";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./SettingsScreen.styles";

const DAY_LABELS = ["M", "T", "O", "T", "F", "L", "S"];

type Props = NativeStackScreenProps<OnboardingStackParamList, "Settings">;

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function SettingsScreen({ navigation }: Props) {
  const { state, setHomeAddress, setWorkAddress, toggleDay } = useOnboarding();

  return (
    <LinearGradient colors={[colors.paperTop, colors.paperBottom]} style={layoutStyles.canvas}>
      <SafeAreaView style={layoutStyles.card} edges={["top", "bottom"]}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          <View style={styles.header}>
            <BackButton onPress={() => navigation.goBack()} />
          </View>
          <View style={[layoutStyles.content, layoutStyles.contentLeft]}>
            <Text style={styles.eyebrow}>Oppsettet ditt</Text>
            <Text style={styles.headline}>Slik står det</Text>

            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Hjemme</Text>
              <TextInput
                value={state.homeAddress}
                onChangeText={setHomeAddress}
                style={styles.fieldValue}
                returnKeyType="done"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Jobb</Text>
              <TextInput
                value={state.workAddress}
                onChangeText={setWorkAddress}
                style={styles.fieldValue}
                returnKeyType="done"
              />
            </View>
            <View style={styles.timeRow}>
              <View style={[styles.field, styles.timeField]}>
                <Text style={styles.fieldLabel}>Ut</Text>
                <Text style={styles.timeValue}>{formatTime(state.leaveHome)}</Text>
              </View>
              <View style={[styles.field, styles.timeField]}>
                <Text style={styles.fieldLabel}>Hjem</Text>
                <Text style={styles.timeValue}>{formatTime(state.leaveWork)}</Text>
              </View>
            </View>

            <View style={styles.dayRow}>
              {DAY_LABELS.map((label, index) => (
                <DayChip key={index} label={label} active={state.activeDays[index]} onPress={() => toggleDay(index)} size={48} />
              ))}
            </View>
          </View>
          <View style={layoutStyles.buttonBlock}>
            <PrimaryButton label="Lagre" onPress={() => navigation.navigate("Main")} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
