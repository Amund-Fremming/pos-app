import { StyleSheet } from "react-native";
import { colors, spacing } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  card: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  contentCentered: {
    alignItems: "center",
    paddingHorizontal: 22,
  },
  contentLeft: {
    paddingHorizontal: spacing.cardPaddingHorizontal,
  },
  buttonBlock: {
    paddingHorizontal: spacing.cardPaddingHorizontal,
    paddingBottom: spacing.bottomButtonPadding,
    gap: 14,
  },
});
