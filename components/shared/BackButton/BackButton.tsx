import { Pressable } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors } from "../../../theme/tokens";

export function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} hitSlop={12} style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
      <Svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
        <Path d="M15 5l-7 7 7 7" />
      </Svg>
    </Pressable>
  );
}
