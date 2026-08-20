import { StyleSheet } from "react-native";
import { colors } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 12,
    borderBottomWidth: 4,
    paddingBottom: 12,
  },
  marker: {
    width: 14,
    height: 14,
    backgroundColor: colors.deepTeal,
    borderWidth: 2,
    borderColor: colors.ink,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 2,
    transform: [{ rotate: "-45deg" }],
  },
  input: {
    flex: 1,
    fontFamily: "Karla_400Regular",
    fontSize: 24,
    color: colors.ink,
    padding: 0,
  },
  helper: {
    fontFamily: "Karla_400Regular",
    fontSize: 14,
    color: colors.ink45,
    marginTop: 14,
  },
});
