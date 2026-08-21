import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../../../theme/tokens";

export function CheckCircleIcon({ size = 104 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={colors.ink} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
      <Circle cx={32} cy={32} r={22} fill={colors.deepTeal} />
      <Path d="M21 33l8 8 15-17" stroke={colors.paperTop} strokeWidth={4} />
    </Svg>
  );
}
