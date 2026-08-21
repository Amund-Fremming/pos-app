import { View } from "react-native";
import { styles } from "./ProgressCounter.styles";

type ProgressCounterProps = {
  step: number; // 1..5
  total?: number;
};

export function ProgressCounter({ step, total = 5 }: ProgressCounterProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.bar, i < step && styles.barFilled]} />
      ))}
    </View>
  );
}
