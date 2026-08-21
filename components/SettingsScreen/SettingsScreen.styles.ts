import { StyleSheet } from "react-native";
import { colors } from "../../theme/tokens";

export const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  eyebrow: {
    fontFamily: "InstrumentSerif_400Regular_Italic",
    fontSize: 22,
    color: colors.ink55,
    marginBottom: 12,
  },
  headline: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 46,
    lineHeight: 56,
    color: colors.ink,
    marginBottom: 22,
  },
  field: {
    borderBottomWidth: 4,
    borderBottomColor: colors.ink,
    paddingBottom: 10,
    marginBottom: 18,
  },
  fieldLabel: {
    fontFamily: "InstrumentSerif_400Regular_Italic",
    fontSize: 18,
    color: colors.ink55,
  },
  fieldValue: {
    fontFamily: "Karla_400Regular",
    fontSize: 21,
    color: colors.ink,
    marginTop: 2,
    padding: 0,
  },
  timeRow: {
    flexDirection: "row",
    gap: 14,
  },
  timeField: {
    flex: 1,
    marginBottom: 0,
  },
  timeValue: {
    fontFamily: "InstrumentSerif_400Regular",
    fontSize: 34,
    color: colors.ink,
    marginTop: 4,
  },
  dayRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 24,
  },
});
