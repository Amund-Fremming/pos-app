import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { AddressField } from "../shared/AddressField/AddressField";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./HomeAddressScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "HomeAddress">;

function validateHomeAddress(homeAddress: string): boolean {
  return homeAddress.trim().length > 0;
}

export function HomeAddressScreen({ navigation }: Props) {
  const { state, setHomeAddress } = useOnboarding();
  const [errorTrigger, setErrorTrigger] = useState(0);

  const handleNext = () => {
    if (!validateHomeAddress(state.homeAddress)) {
      setErrorTrigger((n) => n + 1);
      return;
    }
    navigation.navigate("WorkAddress");
  };

  return (
    <OnboardingLayout step={3} align="left" footer={<PrimaryButton label="Neste" onPress={handleNext} />}>
      <Text style={styles.eyebrow}>Hjemme</Text>
      <Text style={styles.headline}>Hvor bor du?</Text>
      <Text style={styles.body}>Her starter turen din.</Text>
      <AddressField
        value={state.homeAddress}
        onChangeText={setHomeAddress}
        placeholder="Storgata 12, Oslo"
        helperText="Vi bruker adressen bare til værvarsel."
        errorTrigger={errorTrigger}
      />
    </OnboardingLayout>
  );
}
