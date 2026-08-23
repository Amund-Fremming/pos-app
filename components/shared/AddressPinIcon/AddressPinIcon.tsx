import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../../../theme/tokens";

export function AddressPinIcon({ size = 20 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={colors.ink} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" fill={colors.deepTeal} />
      <Circle cx={12} cy={10} r={2.4} fill={colors.paperTop} stroke="none" />
    </Svg>
  );
}
