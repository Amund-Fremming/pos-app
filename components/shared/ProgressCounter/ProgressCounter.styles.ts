import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 7,
    paddingHorizontal: spacing.progressInset,
    paddingTop: spacing.progressInset,
  },
  bar: {
    width: 12,
    height: 30,
    borderWidth: 3,
    borderColor: colors.ink,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "transparent",
  },
  barFilled: {
    backgroundColor: colors.ink,
  },
});
