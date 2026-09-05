import { StyleSheet } from "react-native";
import { colors } from "../../theme/tokens";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  eyebrow: {
    fontFamily: "InstrumentSerif_400Regular_Italic",
    fontSize: 36,
    // Instrument Serif's italic ascenders overshoot the em box, so leading below
    // ~1.3x clips the top of the F.
    lineHeight: 48,
    color: colors.ink55,
    // Pushes the gear button to the far end of the header row.
    marginRight: "auto",
  },
  icon: {
    marginBottom: 22,
  },
  headline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 46,
    lineHeight: 48,
    color: colors.ink,
    textAlign: "center",
    marginBottom: 22,
  },
  body: {
    fontFamily: "Karla_400Regular",
    fontSize: 18,
    lineHeight: 27,
    color: colors.ink70,
    textAlign: "center",
  },
  intervals: {
    marginTop: 14,
    alignItems: "center",
    gap: 6,
  },
  interval: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 30,
    lineHeight: 34,
    color: colors.ink,
  },
  caption: {
    fontFamily: "Karla_400Regular",
    fontSize: 13,
    letterSpacing: 0.8,
    color: colors.ink70,
    textAlign: "center",
  },
});
