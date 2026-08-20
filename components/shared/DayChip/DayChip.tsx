import { Pressable, Text } from "react-native";
import { styles } from "./DayChip.styles";

type DayChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function DayChip({ label, active, onPress }: DayChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}>
      <Text style={[styles.label, active ? styles.labelActive : styles.labelIdle]}>{label}</Text>
    </Pressable>
  );
}
