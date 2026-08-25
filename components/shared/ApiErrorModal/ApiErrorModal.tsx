import { Modal, Text, View } from "react-native";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon";
import { styles } from "./ApiErrorModal.styles";

type ApiErrorModalProps = {
  visible: boolean;
  occurredAt: Date | null;
  isRetrying: boolean;
  onRetry: () => void;
};

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function ApiErrorModal({ visible, occurredAt, isRetrying, onRetry }: ApiErrorModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.cardWrap}>
          <View style={styles.shadow} />
          <View style={styles.card}>
            <View style={styles.iconWrap}>
              <WeatherIcon outcome="cloudy" size={64} />
            </View>
            <Text style={styles.headline}>Vi får ikke tak i været</Text>
            <Text style={styles.body}>
              Noe er nede hos oss akkurat nå. Vi jobber med saken — varslene dine er fortsatt satt opp.
            </Text>
            <View style={styles.buttonWrap}>
              <PrimaryButton label={isRetrying ? "Prøver…" : "Prøv igjen"} onPress={onRetry} disabled={isRetrying} />
            </View>
            {occurredAt ? <Text style={styles.caption}>Sist oppdatert {formatTime(occurredAt)}</Text> : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}
