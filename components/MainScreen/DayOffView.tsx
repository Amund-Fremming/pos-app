import { Text, View } from "react-native";
import type { JacketInterval } from "../../clients/backendClient";
import { WeatherIcon } from "../shared/WeatherIcon/WeatherIcon";
import { styles } from "./MainScreen.styles";

export function DayOffView({ intervals }: { intervals: JacketInterval[] }) {
  if (intervals.length === 0) {
    return (
      <>
        <View style={styles.icon}>
          <WeatherIcon outcome="sun" />
        </View>
        <Text style={styles.headline}>La regnjakka ligge hjemme</Text>
        <Text style={styles.body}>Tørt hele dagen.</Text>
      </>
    );
  }

  return (
    <>
      <View style={styles.icon}>
        <WeatherIcon outcome="rain" />
      </View>
      <Text style={styles.headline}>Ta med regnjakka</Text>
      <Text style={styles.body}>Regn i disse tidene:</Text>
      <View style={styles.intervals}>
        {intervals.map((interval) => (
          <Text key={`${interval.from}-${interval.to}`} style={styles.interval}>
            {interval.from}–{interval.to}
          </Text>
        ))}
      </View>
    </>
  );
}
