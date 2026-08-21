import Svg, { Circle, Path, Rect } from "react-native-svg";
import { colors } from "../../../theme/tokens";

export type WeatherOutcome = "rain" | "sun" | "cloudy";

const FRONT_CLOUD_PATH = "M18 38a9 9 0 0 1 1.6-17.8A13 13 0 0 1 45 22a8 8 0 0 1 1 15.9z";

function Cloud() {
  return (
    <>
      <Circle cx={41} cy={17} r={10} fill={colors.cloudBack} stroke={colors.ink} strokeWidth={3.2} />
      <Path d={FRONT_CLOUD_PATH} fill={colors.cloudFront} stroke={colors.ink} strokeWidth={3.2} strokeLinejoin="round" />
    </>
  );
}

function SunIcon({ size }: { size: number }) {
  const rays = [
    "M32 4v10",
    "M32 50v10",
    "M4 32h10",
    "M50 32h10",
    "M44.7 44.7l7.1 7.1",
    "M19.3 44.7l-7.1 7.1",
    "M19.3 19.3l-7.1-7.1",
    "M44.7 19.3l7.1-7.1",
  ];
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {rays.map((d) => (
        <Path key={d} d={d} stroke={colors.sunFill} strokeWidth={6} strokeLinecap="round" />
      ))}
      <Circle cx={32} cy={32} r={13} fill={colors.sunFill} />
    </Svg>
  );
}

function CloudyIcon({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Cloud />
    </Svg>
  );
}

function RainIcon({ size }: { size: number }) {
  const drops = [22, 32, 42];
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Cloud />
      {drops.map((x, i) => (
        <Rect key={x} x={x - 2.5} y={42 + (i % 2) * 4} width={5} height={14} rx={2.5} fill={colors.rainDrop} />
      ))}
    </Svg>
  );
}

export function WeatherIcon({ outcome, size = 104 }: { outcome: WeatherOutcome; size?: number }) {
  if (outcome === "rain") return <RainIcon size={size} />;
  if (outcome === "sun") return <SunIcon size={size} />;
  return <CloudyIcon size={size} />;
}
