import { useEffect, useRef } from "react";
import { Animated, Text, TextInput, View } from "react-native";
import { colors } from "../../../theme/tokens";
import { styles } from "./AddressField.styles";

type AddressFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  helperText?: string;
  /** Bump this (e.g. increment a counter) to flash the underline red and fade it back. */
  errorTrigger?: number;
};

export function AddressField({ value, onChangeText, placeholder, helperText, errorTrigger }: AddressFieldProps) {
  const errorAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!errorTrigger) return;
    errorAnim.setValue(1);
    Animated.timing(errorAnim, {
      toValue: 0,
      duration: 400,
      delay: 2000,
      useNativeDriver: false,
    }).start();

    shakeAnim.setValue(0);
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -1, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  }, [errorTrigger, errorAnim, shakeAnim]);

  const borderBottomColor = errorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.ink, colors.error],
  });
  const translateX = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8, 8],
  });

  return (
    <View>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Animated.View style={[styles.row, { borderBottomColor }]}>
          <View style={styles.marker} />
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.ink45}
            style={styles.input}
          />
        </Animated.View>
      </Animated.View>
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
    </View>
  );
}
