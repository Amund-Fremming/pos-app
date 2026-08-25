import { StyleSheet } from "react-native";
import { colors, fonts } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  cardWrap: {
    width: "100%",
    maxWidth: 360,
  },
  shadow: {
    position: "absolute",
    top: 8,
    left: 6,
    right: -6,
    bottom: -8,
    backgroundColor: colors.deepTeal,
    borderRadius: 20,
  },
  card: {
    backgroundColor: colors.paperTop,
    borderWidth: 3,
    borderColor: colors.ink,
    borderRadius: 20,
    paddingHorizontal: 28,
    paddingVertical: 36,
    alignItems: "center",
  },
  iconWrap: {
    marginBottom: 20,
  },
  headline: {
    fontFamily: fonts.serif,
    fontSize: 28,
    color: colors.ink,
    textAlign: "center",
    marginBottom: 12,
  },
  body: {
    fontFamily: fonts.karlaRegular,
    fontSize: 15,
    color: colors.ink70,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 24,
  },
  buttonWrap: {
    width: "100%",
  },
  caption: {
    fontFamily: fonts.karlaMedium,
    fontSize: 12,
    color: colors.ink45,
    marginTop: 16,
  },
});
