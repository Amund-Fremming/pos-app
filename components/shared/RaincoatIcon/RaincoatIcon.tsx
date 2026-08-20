import Svg, { Path } from "react-native-svg";
import { colors } from "../../../theme/tokens";

export function RaincoatIcon({ size = 104 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none" stroke={colors.ink} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
      <Path d="M22 20a10 10 0 0 1 20 0" fill={colors.deepTeal} />
      <Path d="M22 20 12 26v10h8v18h24V36h8V26l-10-6z" fill={colors.deepTeal} />
      <Path d="M32 22v32" stroke={colors.paperTop} strokeWidth={2.6} />
    </Svg>
  );
}
