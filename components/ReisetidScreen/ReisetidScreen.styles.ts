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
    lineHeight: 56,
    color: colors.ink,
    marginBottom: 12,
  },
  body: {
    fontFamily: "Karla_400Regular",
    fontSize: 17,
    lineHeight: 26,
    color: colors.ink70,
    marginBottom: 28,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  hint: {
    fontFamily: "Karla_400Regular",
    fontSize: 14,
    color: colors.ink45,
    marginTop: 16,
  },
});
