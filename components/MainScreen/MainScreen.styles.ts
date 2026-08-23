import { StyleSheet } from "react-native";
import { colors } from "../../theme/tokens";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  icon: {
    marginBottom: 22,
    position: "relative",
  },
  debugButtonWrap: {
    position: "absolute",
    top: -14,
    left: 0,
    right: 0,
    alignItems: "center",
    gap: 6,
  },
  debugButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "rgba(20,33,31,.55)",
  },
  debugButtonLabel: {
    fontFamily: "Karla_600SemiBold",
    fontSize: 11,
    color: colors.paperTop,
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
  caption: {
    fontFamily: "Karla_400Regular",
    fontSize: 13,
    letterSpacing: 0.8,
    color: colors.ink70,
    textAlign: "center",
  },
});
