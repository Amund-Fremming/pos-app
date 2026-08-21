import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import { useCallback, useState } from "react";
import { AppState, Linking, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import type { OnboardingStackParamList } from "../../navigation/types";
import { BellIcon } from "../shared/BellIcon/BellIcon";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./NotificationsScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Notifications">;

type PermissionStatus = "undetermined" | "granted" | "denied";

export function NotificationsScreen({ navigation }: Props) {
  const [status, setStatus] = useState<PermissionStatus>("undetermined");

  const refreshStatus = useCallback(async () => {
    const { status: current } = await Notifications.getPermissionsAsync();
    setStatus(current === "granted" ? "granted" : current === "denied" ? "denied" : "undetermined");
  }, []);

  useFocusEffect(
    useCallback(() => {
      refreshStatus();
      const sub = AppState.addEventListener("change", (next) => {
        if (next === "active") refreshStatus();
      });
      return () => sub.remove();
    }, [refreshStatus])
  );

  const handlePress = async () => {
    if (status === "granted") {
      navigation.navigate("HomeAddress");
      return;
    }
    if (status === "denied") {
      Linking.openSettings();
      return;
    }
    const { status: result } = await Notifications.requestPermissionsAsync();
    setStatus(result === "granted" ? "granted" : "denied");
  };

  const granted = status === "granted";

  return (
    <OnboardingLayout
      step={2}
      align="center"
      footer={
        <PrimaryButton
          label={granted ? "Neste" : "Slå på varsler"}
          onPress={handlePress}
          variant={granted ? "ink" : "outline"}
        />
      }
    >
      <View style={styles.icon}>
        <BellIcon />
      </View>
      <Text style={styles.headline}>Slå på varsler</Text>
      <Text style={styles.body}>
        {granted
          ? "Varsler er på. Vi sier fra 30 minutter før du drar."
          : "Hele appen er varselet. Uten tillatelse kan vi ikke si fra når regnet kommer."}
      </Text>
    </OnboardingLayout>
  );
}
