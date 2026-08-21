import { StyleSheet } from "react-native";
import { colors } from "../../theme/tokens";

export const styles = StyleSheet.create({
  icon: {
    marginBottom: 24,
  },
  headline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 46,
    lineHeight: 48,
    color: colors.ink,
    textAlign: "center",
    marginBottom: 24,
  },
  body: {
    fontFamily: "Karla_400Regular",
    fontSize: 18,
    lineHeight: 27,
    color: colors.ink70,
    textAlign: "center",
  },
});
