import { StyleSheet } from "react-native";
import { colors } from "../../theme/tokens";

export const styles = StyleSheet.create({
  eyebrow: {
    fontFamily: "InstrumentSerif_400Regular_Italic",
    fontSize: 22,
    color: colors.ink55,
    marginBottom: 12,
  },
  headline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 46,
    lineHeight: 48,
    color: colors.ink,
    marginBottom: 12,
  },
  body: {
    fontFamily: "Karla_400Regular",
    fontSize: 17,
    lineHeight: 26,
    color: colors.ink70,
    marginBottom: 26,
  },
});
