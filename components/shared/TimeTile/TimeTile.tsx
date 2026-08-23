import { Pressable, Text } from "react-native";
import { styles } from "./TimeTile.styles";

type TimeTileProps = {
  label: string;
  value: Date;
  onPress: () => void;
};

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function TimeTile({ label, value, onPress }: TimeTileProps) {
  return (
    <Pressable style={[styles.tile, { flex: 1 }]} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{formatTime(value)}</Text>
    </Pressable>
  );
}
