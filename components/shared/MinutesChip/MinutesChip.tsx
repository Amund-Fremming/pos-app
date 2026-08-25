import { Pressable, Text } from "react-native";
import { styles } from "./MinutesChip.styles";

type MinutesChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function MinutesChip({ label, selected, onPress }: MinutesChipProps) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected ? styles.chipActive : styles.chipIdle]}>
      <Text style={[styles.label, selected ? styles.labelActive : styles.labelIdle]}>{label}</Text>
    </Pressable>
  );
}
