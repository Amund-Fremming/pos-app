import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, View } from "react-native";
import type { OnboardingStackParamList } from "../../navigation/types";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { RaincoatIcon } from "../shared/RaincoatIcon/RaincoatIcon";
import { styles } from "./IntroScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Intro">;

export function IntroScreen({ navigation }: Props) {
  return (
    <OnboardingLayout
      step={1}
      align="center"
      footer={
        <>
          <PrimaryButton label="Kom i gang" onPress={() => navigation.navigate("HomeAddress")} />
          <Text style={styles.caption}>Ingen konto. Ingen oppsett etterpå.</Text>
        </>
      }
    >
      <View style={styles.icon}>
        <RaincoatIcon />
      </View>
      <Text style={styles.headline}>Regnjakke{"\n"}i dag?</Text>
      <Text style={styles.body}>Sett det opp én gang, på 20 sekunder — og bli varslet om regn for alltid.</Text>
    </OnboardingLayout>
  );
}
