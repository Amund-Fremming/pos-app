import { StyleSheet } from "react-native";
import { colors } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  chip: {
    flex: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.ink,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  chipActive: {
    backgroundColor: colors.ink,
  },
  chipIdle: {
    backgroundColor: colors.chipIdle,
  },
  label: {
    fontFamily: "Karla_600SemiBold",
    fontSize: 17,
  },
  labelActive: {
    color: colors.paperTop,
  },
  labelIdle: {
    color: colors.ink45,
  },
});
