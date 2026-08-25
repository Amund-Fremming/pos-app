import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { patchUserData } from "../../clients/backendClient";
import { useApiError } from "../../context/ApiErrorContext";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { colors } from "../../theme/tokens";
import { AddressField } from "../shared/AddressField/AddressField";
import { BackButton } from "../shared/BackButton/BackButton";
import { DayChip } from "../shared/DayChip/DayChip";
import { MinutesChip } from "../shared/MinutesChip/MinutesChip";
import { styles as layoutStyles } from "../shared/OnboardingLayout/OnboardingLayout.styles";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { TimePickerModal } from "../shared/TimePickerModal/TimePickerModal";
import { styles } from "./SettingsScreen.styles";

const DAY_LABELS = ["M", "T", "O", "T", "F", "L", "S"];
const DURATION_OPTIONS = [10, 15, 20, 30, 45, 60];

function formatDurationLabel(minutes: number): string {
  return minutes === 60 ? "1 time" : `${minutes} min`;
}

type EditingField = "home" | "work" | null;

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
  const {
    state,
    setHomeAddress,
    setHomeCoords,
    setWorkAddress,
    setWorkCoords,
    setLeaveHome,
    setLeaveWork,
    toggleDay,
    setCommuteMinutes,
  } = useOnboarding();
  const { showApiError } = useApiError();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<EditingField>(null);

  const handleSave = async () => {
    if (!state.userId) {
      setError("Fant ikke brukeren. Prøv å starte appen på nytt.");
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      await patchUserData(state.userId, {
        home_time: toTimeString(state.leaveHome),
        home_lat: state.homeLat ?? undefined,
        home_lon: state.homeLon ?? undefined,
        home_display: state.homeAddress,
        work_time: toTimeString(state.leaveWork),
        work_lat: state.workLat ?? undefined,
        work_lon: state.workLon ?? undefined,
        work_display: state.workAddress,
        alert_days: state.activeDays,
        commute_minutes: state.commuteMinutes,
        push_token: state.pushToken ?? undefined,
      });
      navigation.navigate("Main");
    } catch (err) {
      console.warn("Failed to update user data", err);
      showApiError(handleSave);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.paperTop, colors.paperBottom]}
      style={layoutStyles.canvas}
    >
      <SafeAreaView style={layoutStyles.card} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
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
                onSelected={(suggestion) =>
                  setHomeCoords(suggestion.lat, suggestion.lon)
                }
                placeholder="Storgata 12"
              />
            </View>
            <View style={styles.addressField}>
              <Text style={styles.addressFieldLabel}>Jobb</Text>
              <AddressField
                value={state.workAddress}
                onChangeText={setWorkAddress}
                onSelected={(suggestion) =>
                  setWorkCoords(suggestion.lat, suggestion.lon)
                }
                placeholder="Akersgata 55"
              />
            </View>
            {error ? <Text style={styles.fieldLabel}>{error}</Text> : null}
            <View style={styles.timeRow}>
              <Pressable
                style={[styles.field, styles.timeField]}
                onPress={() => setEditingField("home")}
              >
                <Text style={styles.fieldLabel}>Ut</Text>
                <Text style={styles.timeValue}>
                  {formatTime(state.leaveHome)}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.field, styles.timeField]}
                onPress={() => setEditingField("work")}
              >
                <Text style={styles.fieldLabel}>Hjem</Text>
                <Text style={styles.timeValue}>
                  {formatTime(state.leaveWork)}
                </Text>
              </Pressable>
            </View>

            <View style={styles.dayRow}>
              {DAY_LABELS.map((label, index) => (
                <DayChip
                  key={index}
                  label={label}
                  active={state.activeDays[index]}
                  onPress={() => toggleDay(index)}
                  size={48}
                />
              ))}
            </View>

            <Text style={styles.addressFieldLabel}>Reisetid</Text>
            <View style={styles.durationGrid}>
              {DURATION_OPTIONS.map((minutes) => (
                <MinutesChip
                  key={minutes}
                  label={formatDurationLabel(minutes)}
                  selected={state.commuteMinutes === minutes}
                  onPress={() => setCommuteMinutes(minutes)}
                />
              ))}
            </View>
          </View>
          <View style={layoutStyles.buttonBlock}>
            <PrimaryButton
              label="Lagre"
              onPress={handleSave}
              disabled={isSaving}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <TimePickerModal
        visible={editingField !== null}
        value={editingField === "work" ? state.leaveWork : state.leaveHome}
        onClose={() => setEditingField(null)}
        onConfirm={(value) =>
          editingField === "work" ? setLeaveWork(value) : setLeaveHome(value)
        }
      />
    </LinearGradient>
  );
}
