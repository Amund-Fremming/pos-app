import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { AddressField } from "../shared/AddressField/AddressField";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./WorkAddressScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "WorkAddress">;

export function WorkAddressScreen({ navigation }: Props) {
  const { state, setWorkAddress } = useOnboarding();

  return (
    <OnboardingLayout
      step={3}
      align="left"
      footer={
        <>
          <PrimaryButton label="Neste" onPress={() => navigation.navigate("TimesDays")} />
          <Pressable
            onPress={() => {
              setWorkAddress("");
              navigation.navigate("TimesDays");
            }}
          >
            <Text style={styles.skip}>Hopp over</Text>
          </Pressable>
        </>
      }
    >
      <Text style={styles.eyebrow}>Jobb</Text>
      <Text style={styles.headline}>Hvor jobber du?</Text>
      <Text style={styles.body}>Vi sjekker været langs ruta.</Text>
      <AddressField value={state.workAddress} onChangeText={setWorkAddress} placeholder="Akersgata 55, Oslo" />
    </OnboardingLayout>
  );
}
