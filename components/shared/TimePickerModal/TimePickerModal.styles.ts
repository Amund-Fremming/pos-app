import { StyleSheet } from "react-native";
import { colors } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(20,33,31,0.35)",
  },
  sheet: {
    backgroundColor: colors.paperTop,
    borderWidth: 3,
    borderColor: colors.ink,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: 44,
    paddingHorizontal: 24,
  },
  buttonWrap: {
    marginTop: 8,
  },
});
