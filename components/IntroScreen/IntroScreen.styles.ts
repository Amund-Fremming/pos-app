import { StyleSheet } from "react-native";
import { colors } from "../../theme/tokens";

export const styles = StyleSheet.create({
  icon: {
    marginBottom: 38,
  },
  headline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 50,
    lineHeight: 52,
    letterSpacing: -0.5,
    color: colors.ink,
    textAlign: "center",
    marginBottom: 18,
  },
  body: {
    fontFamily: "Karla_400Regular",
    fontSize: 18,
    lineHeight: 27,
    color: colors.ink70,
    textAlign: "center",
  },
  caption: {
    fontFamily: "Karla_400Regular",
    fontSize: 13,
    letterSpacing: 0.8,
    color: colors.ink70,
    textAlign: "center",
  },
});
