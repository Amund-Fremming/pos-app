import Svg, { Path } from "react-native-svg";
import { colors } from "../../../theme/tokens";

export function BellIcon({ size = 104 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={colors.ink} strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M32 10a12 12 0 0 1 12 12v9l5 8H15l5-8v-9a12 12 0 0 1 12-12z" fill={colors.deepTeal} />
      <Path d="M26 45a6 6 0 0 0 12 0" />
      <Path d="M32 6v4" />
    </Svg>
  );
}
