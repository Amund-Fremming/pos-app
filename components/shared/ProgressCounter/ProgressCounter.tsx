import { View } from "react-native";
import { styles } from "./ProgressCounter.styles";

type ProgressCounterProps = {
  step: number; // 1..4
  total?: number;
};

export function ProgressCounter({ step, total = 4 }: ProgressCounterProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.bar, i < step && styles.barFilled]} />
      ))}
    </View>
  );
}
