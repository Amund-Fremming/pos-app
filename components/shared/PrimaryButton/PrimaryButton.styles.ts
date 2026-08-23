import { StyleSheet } from "react-native";
import { colors } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderColor: colors.ink,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  inkFill: {
    backgroundColor: colors.ink,
  },
  tealFill: {
    backgroundColor: colors.deepTeal,
  },
  inkFillPressed: {
    backgroundColor: colors.deepTeal,
  },
  tealFillPressed: {
    backgroundColor: colors.ink,
  },
  outlineFill: {
    backgroundColor: colors.cardShadow,
  },
  outlineFillPressed: {
    backgroundColor: colors.cardShadow,
  },
  disabledFill: {
    backgroundColor: "rgba(20,33,31,.10)",
    borderColor: "rgba(20,33,31,.28)",
  },
  label: {
    fontFamily: "Karla_600SemiBold",
    fontSize: 19,
    letterSpacing: 0.4,
    color: colors.paperTop,
  },
  labelInk: {
    color: colors.ink,
  },
  labelDisabled: {
    color: colors.ink45,
  },
});
