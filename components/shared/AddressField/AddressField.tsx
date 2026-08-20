import { Text, TextInput, View } from "react-native";
import { colors } from "../../../theme/tokens";
import { styles } from "./AddressField.styles";

type AddressFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  helperText?: string;
};

export function AddressField({ value, onChangeText, placeholder, helperText }: AddressFieldProps) {
  return (
    <View>
      <View style={styles.row}>
        <View style={styles.marker} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.ink45}
          style={styles.input}
        />
      </View>
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}
