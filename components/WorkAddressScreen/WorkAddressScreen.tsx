import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { AddressField } from "../shared/AddressField/AddressField";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./WorkAddressScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "WorkAddress">;

function validateWorkAddress(workAddress: string): boolean {
  return workAddress.trim().length > 0;
}

export function WorkAddressScreen({ navigation }: Props) {
  const { state, setWorkAddress } = useOnboarding();
  const [errorTrigger, setErrorTrigger] = useState(0);

  const handleNext = () => {
    if (!validateWorkAddress(state.workAddress)) {
      setErrorTrigger((n) => n + 1);
      return;
    }
    navigation.navigate("TimesDays");
  };

  return (
    <OnboardingLayout step={4} align="left" footer={<PrimaryButton label="Neste" onPress={handleNext} />}>
      <Text style={styles.eyebrow}>Jobb</Text>
      <Text style={styles.headline}>Hvor jobber du?</Text>
      <Text style={styles.body}>Vi sjekker været langs ruta.</Text>
      <AddressField
        value={state.workAddress}
        onChangeText={setWorkAddress}
        placeholder="Akersgata 55, Oslo"
        errorTrigger={errorTrigger}
      />
    </OnboardingLayout>
  );
}
