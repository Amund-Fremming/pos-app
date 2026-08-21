import { Pressable, Text, View } from "react-native";
import { colors } from "../../../theme/tokens";
import { styles } from "./PrimaryButton.styles";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "ink" | "teal" | "outline";
};

const SHADOW_COLOR: Record<NonNullable<PrimaryButtonProps["variant"]>, string> = {
  ink: colors.deepTeal,
  teal: colors.ink,
  outline: colors.cardShadow,
};

const FILL_STYLE: Record<NonNullable<PrimaryButtonProps["variant"]>, [object, object]> = {
  ink: [styles.inkFill, styles.inkFillPressed],
  teal: [styles.tealFill, styles.tealFillPressed],
  outline: [styles.outlineFill, styles.outlineFillPressed],
};

export function PrimaryButton({ label, onPress, variant = "ink" }: PrimaryButtonProps) {
  const shadowColor = SHADOW_COLOR[variant];
  const [fillStyle, pressedFillStyle] = FILL_STYLE[variant];

  return (
    <View>
      {variant !== "outline" && (
        <View style={{ position: "absolute", top: 7, left: 6, right: -6, bottom: -7, backgroundColor: shadowColor, borderRadius: 22 }} />
      )}
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.button,
          fillStyle,
          pressed && pressedFillStyle,
          variant !== "outline" && {
            transform: pressed ? [{ translateX: 3 }, { translateY: 4 }] : [{ translateX: 0 }, { translateY: 0 }],
          },
        ]}
      >
        <Text style={[styles.label, variant === "outline" && styles.labelInk]}>{label}</Text>
      </Pressable>
    </View>
  );
}
