import { Pressable, Text, View } from "react-native";
import { colors } from "../../../theme/tokens";
import { styles } from "./PrimaryButton.styles";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "ink" | "teal";
};

export function PrimaryButton({ label, onPress, variant = "ink" }: PrimaryButtonProps) {
  const shadowColor = variant === "ink" ? colors.deepTeal : colors.ink;
  const fillStyle = variant === "ink" ? styles.inkFill : styles.tealFill;
  const pressedFillStyle = variant === "ink" ? styles.inkFillPressed : styles.tealFillPressed;

  return (
    <View>
      <View style={{ position: "absolute", top: 7, left: 6, right: -6, bottom: -7, backgroundColor: shadowColor, borderRadius: 22 }} />
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          fillStyle,
          pressed && pressedFillStyle,
          { transform: pressed ? [{ translateX: 3 }, { translateY: 4 }] : [{ translateX: 0 }, { translateY: 0 }] },
        ]}
      >
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </View>
  );
}
