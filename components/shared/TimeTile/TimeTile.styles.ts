import { StyleSheet } from "react-native";
import { colors } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  tile: {
    flex: 1,
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
    marginBottom: 4,
  },
  value: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 40,
    lineHeight: 40,
    color: colors.ink,
  },
});
