import { Text, View } from "react-native";
import { styles } from "./TimeTile.styles";

type TimeTileProps = {
  label: string;
  value: Date;
};

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function TimeTile({ label, value }: TimeTileProps) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.shadow} />
      <View style={styles.tile}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{formatTime(value)}</Text>
      </View>
    </View>
  );
}
