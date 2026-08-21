import { Pressable, Text } from "react-native";
import { styles } from "./DayChip.styles";

type DayChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
  size?: number;
};

export function DayChip({ label, active, onPress, size = 56 }: DayChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, { height: size }, active ? styles.chipActive : styles.chipIdle]}
    >
      <Text style={[styles.label, active ? styles.labelActive : styles.labelIdle]}>{label}</Text>
    </Pressable>
  );
}
