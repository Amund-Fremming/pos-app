import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import type { OnboardingStackParamList } from "../../navigation/types";
import { CheckCircleIcon } from "../shared/CheckCircleIcon/CheckCircleIcon";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./CompletionScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Completion">;

export function CompletionScreen({ navigation }: Props) {
  return (
    <OnboardingLayout
      step={5}
      align="center"
      footer={
        <PrimaryButton
          label="Ferdig"
          variant="teal"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: "Main" }] })}
        />
      }
    >
      <View style={styles.icon}>
        <CheckCircleIcon />
      </View>
      <Text style={styles.headline}>Alt klart</Text>
      <Text style={styles.body}>Du hører fra oss 30 minutter før du drar. Ingenting mer å gjøre.</Text>
    </OnboardingLayout>
  );
}
