import { StyleSheet } from "react-native";
import { colors } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  chip: {
    flexBasis: "31%",
    flexGrow: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: colors.ink,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: colors.cardShadow,
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  chipActive: {
    backgroundColor: colors.ink,
  },
  chipIdle: {
    backgroundColor: colors.paperTop,
  },
  label: {
    fontFamily: "Karla_600SemiBold",
    fontSize: 16,
  },
  labelActive: {
    color: colors.paperTop,
  },
  labelIdle: {
    color: colors.ink,
  },
});
