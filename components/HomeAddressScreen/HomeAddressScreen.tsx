import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { AddressField } from "../shared/AddressField/AddressField";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./HomeAddressScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "HomeAddress">;

export function HomeAddressScreen({ navigation }: Props) {
  const { state, setHomeAddress } = useOnboarding();

  return (
    <OnboardingLayout
      step={2}
      align="left"
      footer={
        <PrimaryButton
          label="Neste"
          disabled={state.homeAddress.trim().length === 0}
          onPress={() => navigation.navigate("WorkAddress")}
        />
      }
    >
      <Text style={styles.eyebrow}>Hjemme</Text>
      <Text style={styles.headline}>Hvor bor du?</Text>
      <Text style={styles.body}>Her starter turen din.</Text>
      <AddressField
        value={state.homeAddress}
        onChangeText={setHomeAddress}
        placeholder="Storgata 12, Oslo"
        helperText="Vi bruker adressen bare til værvarsel."
      />
    </OnboardingLayout>
  );
}
