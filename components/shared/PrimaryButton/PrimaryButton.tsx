import { Pressable, Text, View } from "react-native";
import { colors } from "../../../theme/tokens";
import { styles } from "./PrimaryButton.styles";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "ink" | "teal" | "outline";
  /** Skips the offset drop-shadow block behind the button (and its press-translate), so nothing renders past the button's own bounds. */
  noShadow?: boolean;
  disabled?: boolean;
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

export function PrimaryButton({ label, onPress, variant = "ink", noShadow, disabled }: PrimaryButtonProps) {
  const shadowColor = SHADOW_COLOR[variant];
  const [fillStyle, pressedFillStyle] = FILL_STYLE[variant];

  const flat = variant === "outline" || noShadow;

  return (
    <View>
      {!flat && !disabled && (
        <View style={{ position: "absolute", top: 7, left: 6, right: -6, bottom: -7, backgroundColor: shadowColor, borderRadius: 22 }} />
      )}
      <Pressable
        onPress={disabled ? undefined : onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          disabled ? styles.disabledFill : fillStyle,
          !disabled && pressed && pressedFillStyle,
          !disabled &&
            !flat && {
              transform: pressed ? [{ translateX: 3 }, { translateY: 4 }] : [{ translateX: 0 }, { translateY: 0 }],
            },
        ]}
      >
        <Text style={[styles.label, (variant === "outline" || disabled) && styles.labelInk, disabled && styles.labelDisabled]}>{label}</Text>
      </Pressable>
    </View>
  );
}
