import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { colors } from "../../theme/tokens";
import { DepartureTile } from "../shared/DepartureTile/DepartureTile";
import { GearButton } from "../shared/GearButton/GearButton";
import { styles as layoutStyles } from "../shared/OnboardingLayout/OnboardingLayout.styles";
import { CommuteView } from "./CommuteView";
import { DayOffView } from "./DayOffView";
import { styles } from "./MainScreen.styles";
import { useTodaysAdvice } from "./useTodaysAdvice";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Main">;

export function MainScreen({ navigation }: Props) {
  const { state } = useOnboarding();
  const advice = useTodaysAdvice();

  return (
    <LinearGradient colors={[colors.paperTop, colors.paperBottom]} style={layoutStyles.canvas}>
      <SafeAreaView style={layoutStyles.card} edges={["top", "bottom"]}>
        <View style={styles.header}>
          {advice?.kind === "dayOff" && <Text style={styles.eyebrow}>Fridag</Text>}
          <GearButton onPress={() => navigation.navigate("Settings")} />
        </View>
        <View style={styles.content}>
          {!advice && <ActivityIndicator color={colors.ink} />}
          {advice?.kind === "commute" && <CommuteView outcome={advice.outcome} />}
          {advice?.kind === "dayOff" && <DayOffView intervals={advice.intervals} />}
        </View>
        <View style={layoutStyles.buttonBlock}>
          <DepartureTile value={state.leaveHome} onPress={() => navigation.navigate("Settings")} />
          <Text style={styles.caption}>Trykk for å endre</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
