import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { LayoutAnimation, Text } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { AddressField } from "../shared/AddressField/AddressField";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./WorkAddressScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "WorkAddress">;

export function WorkAddressScreen({ navigation }: Props) {
  const { state, setWorkAddress, setWorkCoords } = useOnboarding();
  const [isSearching, setIsSearching] = useState(false);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);

  const handleSuggestingChange = (suggesting: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSearching(suggesting);
  };

  const handleAddressChange = (text: string) => {
    setWorkAddress(text);
    setIsAddressConfirmed(false);
  };

  return (
    <OnboardingLayout
      step={4}
      align="left"
      compact={isSearching}
      footer={<PrimaryButton label="Neste" onPress={() => navigation.navigate("TimesDays")} disabled={!isAddressConfirmed} />}
    >
      <Text style={styles.eyebrow}>Jobb</Text>
      <Text style={styles.headline}>Hvor jobber du?</Text>
      {!isSearching && <Text style={styles.body}>Vi sjekker været langs ruta.</Text>}
      <AddressField
        value={state.workAddress}
        onChangeText={handleAddressChange}
        onSelected={(suggestion) => {
          setIsAddressConfirmed(true);
          setWorkCoords(suggestion.lat, suggestion.lon);
        }}
        placeholder="Akersgata 55, Oslo"
        onSuggestingChange={handleSuggestingChange}
      />
    </OnboardingLayout>
  );
}
