import { StyleSheet } from "react-native";
import { colors } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  tile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    backgroundColor: colors.tile,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: colors.ink,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  label: {
    fontFamily: "InstrumentSerif_400Regular_Italic",
    fontSize: 18,
    color: colors.ink55,
  },
  value: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 32,
    color: colors.ink,
  },
  shadow: {
    position: "absolute",
    top: 6,
    left: 5,
    right: -5,
    bottom: -6,
    backgroundColor: colors.cardShadow,
    borderRadius: 20,
  },
});
