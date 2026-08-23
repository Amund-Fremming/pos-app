import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { LayoutAnimation, Text } from "react-native";
import { useOnboarding } from "../../context/OnboardingContext";
import type { OnboardingStackParamList } from "../../navigation/types";
import { AddressField } from "../shared/AddressField/AddressField";
import { OnboardingLayout } from "../shared/OnboardingLayout/OnboardingLayout";
import { PrimaryButton } from "../shared/PrimaryButton/PrimaryButton";
import { styles } from "./HomeAddressScreen.styles";

type Props = NativeStackScreenProps<OnboardingStackParamList, "HomeAddress">;

export function HomeAddressScreen({ navigation }: Props) {
  const { state, setHomeAddress, setHomeCoords } = useOnboarding();
  const [isSearching, setIsSearching] = useState(false);
  const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);

  const handleSuggestingChange = (suggesting: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsSearching(suggesting);
  };

  const handleAddressChange = (text: string) => {
    setHomeAddress(text);
    setIsAddressConfirmed(false);
  };

  return (
    <OnboardingLayout
      step={3}
      align="left"
      compact={isSearching}
      footer={<PrimaryButton label="Neste" onPress={() => navigation.navigate("WorkAddress")} disabled={!isAddressConfirmed} />}
    >
      <Text style={styles.eyebrow}>Hjemme</Text>
      <Text style={styles.headline}>Hvor bor du?</Text>
      {!isSearching && <Text style={styles.body}>Her starter turen din.</Text>}
      <AddressField
        value={state.homeAddress}
        onChangeText={handleAddressChange}
        onSelected={(suggestion) => {
          setIsAddressConfirmed(true);
          setHomeCoords(suggestion.lat, suggestion.lon);
        }}
        placeholder="Storgata 12, Oslo"
        helperText="Vi bruker adressen bare til værvarsel."
        onSuggestingChange={handleSuggestingChange}
      />
    </OnboardingLayout>
  );
}
