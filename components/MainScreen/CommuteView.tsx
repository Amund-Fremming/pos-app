import { Text, View } from "react-native";
import { WeatherIcon, type WeatherOutcome } from "../shared/WeatherIcon/WeatherIcon";
import { styles } from "./MainScreen.styles";

const COPY: Record<WeatherOutcome, { headline: string; body: string }> = {
  rain: { headline: "Ta med regnjakka", body: "Det kommer regn på ruta di." },
  sun: { headline: "La regnjakka ligge hjemme", body: "Tørt hele veien, både ut og hjem." },
  cloudy: { headline: "La regnjakka ligge hjemme", body: "Tørt hele veien, både ut og hjem." },
};

export function CommuteView({ outcome }: { outcome: WeatherOutcome }) {
  const { headline, body } = COPY[outcome];

  return (
    <>
      <View style={styles.icon}>
        <WeatherIcon outcome={outcome} />
      </View>
      <Text style={styles.headline}>{headline}</Text>
      <Text style={styles.body}>{body}</Text>
    </>
  );
}
