import { Pressable, Text, View } from "react-native";
import { styles } from "./DepartureTile.styles";

type DepartureTileProps = {
  value: Date;
  onPress: () => void;
};

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function DepartureTile({ value, onPress }: DepartureTileProps) {
  return (
    <View>
      <View style={styles.shadow} />
      <Pressable onPress={onPress} style={styles.tile}>
        <Text style={styles.label}>Du drar</Text>
        <Text style={styles.value}>{formatTime(value)}</Text>
      </Pressable>
    </View>
  );
}
