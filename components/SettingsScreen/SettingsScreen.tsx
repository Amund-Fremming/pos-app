import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { patchUserData } from "../../clients/backendClient";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { colors } from "../../theme/tokens";
import { AddressField } from "../shared/AddressField/AddressField";
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

function toTimeString(date: Date): string {
  return `${formatTime(date)}:00`;
}

export function SettingsScreen({ navigation }: Props) {
  const { state, setHomeAddress, setHomeCoords, setWorkAddress, setWorkCoords, toggleDay } = useOnboarding();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      await patchUserData({
        home_time: toTimeString(state.leaveHome),
        home_lat: state.homeLat ?? undefined,
        home_lon: state.homeLon ?? undefined,
        home_display: state.homeAddress,
        work_time: toTimeString(state.leaveWork),
        work_lat: state.workLat ?? undefined,
        work_lon: state.workLon ?? undefined,
        work_display: state.workAddress,
        alert_days: state.activeDays,
        push_token: state.pushToken ?? undefined,
      });
      navigation.navigate("Main");
    } catch (err) {
      console.warn("Failed to update user data", err);
      setError("Klarte ikke å lagre. Prøv igjen.");
    } finally {
      setIsSaving(false);
    }
  };

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

            <View style={styles.addressField}>
              <Text style={styles.addressFieldLabel}>Hjemme</Text>
              <AddressField
                value={state.homeAddress}
                onChangeText={setHomeAddress}
                onSelected={(suggestion) => setHomeCoords(suggestion.lat, suggestion.lon)}
                placeholder="Storgata 12, Oslo"
              />
            </View>
            <View style={styles.addressField}>
              <Text style={styles.addressFieldLabel}>Jobb</Text>
              <AddressField
                value={state.workAddress}
                onChangeText={setWorkAddress}
                onSelected={(suggestion) => setWorkCoords(suggestion.lat, suggestion.lon)}
                placeholder="Akersgata 55, Oslo"
              />
            </View>
            {error ? <Text style={styles.fieldLabel}>{error}</Text> : null}
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
            <PrimaryButton label="Lagre" onPress={handleSave} disabled={isSaving} />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
