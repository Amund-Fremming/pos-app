import { StyleSheet } from "react-native";
import { colors } from "../../../theme/tokens";

export const styles = StyleSheet.create({
  button: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.tile,
    borderWidth: 3,
    borderColor: colors.ink,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  buttonPressed: {
    backgroundColor: colors.canvas,
  },
  shadow: {
    position: "absolute",
    top: 4,
    left: 3,
    right: -3,
    bottom: -4,
    backgroundColor: colors.cardShadow,
    borderRadius: 18,
  },
});
