import { useEffect, useRef, useState } from "react";
import { Animated, FlatList, LayoutAnimation, Platform, Text, TextInput, TouchableOpacity, UIManager, View } from "react-native";
import { searchAddresses, type AddressSuggestion } from "../../../clients/locationClient";
import { colors } from "../../../theme/tokens";
import { AddressPinIcon } from "../AddressPinIcon/AddressPinIcon";
import { styles } from "./AddressField.styles";

const SEARCH_DEBOUNCE_MS = 250;
const MIN_QUERY_LENGTH = 2;
const BLUR_DISMISS_DELAY_MS = 150;

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function animateLayout() {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
}

type AddressFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  helperText?: string;
  /** Bump this (e.g. increment a counter) to flash the underline red and fade it back. */
  errorTrigger?: number;
  /** Fires when the suggestion panel opens/closes, so the parent screen can top-align its layout while it's showing. */
  onSuggestingChange?: (isSuggesting: boolean) => void;
  /** Fires when the user picks a row from the dropdown — a free-typed value is not confirmed. */
  onSelected?: (suggestion: AddressSuggestion) => void;
};

export function AddressField({
  value,
  onChangeText,
  placeholder,
  helperText,
  errorTrigger,
  onSuggestingChange,
  onSelected,
}: AddressFieldProps) {
  const errorAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const [showPanel, setShowPanel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchFailed, setSearchFailed] = useState(false);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [retryToken, setRetryToken] = useState(0);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (value.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setLoading(false);
      setSearchFailed(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setSearchFailed(false);
    const timeout = setTimeout(() => {
      searchAddresses(value, controller.signal)
        .then((results) => {
          animateLayout();
          setSuggestions(results);
          setLoading(false);
        })
        .catch((error) => {
          if (error?.name === "AbortError") return;
          animateLayout();
          setSuggestions([]);
          setSearchFailed(true);
          setLoading(false);
        });
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [value, retryToken]);

  useEffect(() => {
    return () => {
      if (blurTimeout.current) clearTimeout(blurTimeout.current);
    };
  }, []);

  const borderBottomColor = errorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.ink, colors.error],
  });
  const translateX = shakeAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-8, 8],
  });

  const handleChangeText = (text: string) => {
    onChangeText(text);
    const shouldShow = text.trim().length >= MIN_QUERY_LENGTH;
    if (shouldShow !== showPanel) animateLayout();
    setShowPanel(shouldShow);
  };

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current);
    if (value.trim().length >= MIN_QUERY_LENGTH && !showPanel) {
      animateLayout();
      setShowPanel(true);
    }
  };

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => {
      animateLayout();
      setShowPanel(false);
    }, BLUR_DISMISS_DELAY_MS);
  };

  const handleSelect = (suggestion: AddressSuggestion) => {
    animateLayout();
    onChangeText(suggestion.addressText);
    onSelected?.(suggestion);
    setShowPanel(false);
  };

  const panelVisible = showPanel && value.trim().length >= MIN_QUERY_LENGTH;
  const headerText = loading ? "Søker…" : searchFailed ? "Fant ikke søket" : `${suggestions.length} treff`;

  const lastReportedSuggesting = useRef(false);
  useEffect(() => {
    if (lastReportedSuggesting.current !== panelVisible) {
      lastReportedSuggesting.current = panelVisible;
      onSuggestingChange?.(panelVisible);
    }
  }, [panelVisible, onSuggestingChange]);

  return (
    <View>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Animated.View style={[styles.row, { borderBottomColor }]}>
          <View style={styles.marker} />
          <TextInput
            value={value}
            onChangeText={handleChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            placeholderTextColor={colors.ink45}
            style={styles.input}
          />
        </Animated.View>
      </Animated.View>
      {helperText && !panelVisible ? <Text style={styles.helper}>{helperText}</Text> : null}
      {panelVisible ? (
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelHeaderText}>{headerText}</Text>
          </View>
          {searchFailed ? (
            <TouchableOpacity style={styles.emptyRow} onPress={() => setRetryToken((n) => n + 1)}>
              <Text style={styles.retryText}>Prøv igjen</Text>
            </TouchableOpacity>
          ) : !loading && suggestions.length === 0 ? (
            <View style={styles.emptyRow}>
              <Text style={styles.emptyText}>Ingen treff. Prøv gateadresse og sted.</Text>
            </View>
          ) : (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item.id}
              keyboardShouldPersistTaps="handled"
              style={styles.list}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[styles.suggestionRow, index === suggestions.length - 1 && styles.suggestionRowLast]}
                  onPress={() => handleSelect(item)}
                >
                  <View style={styles.suggestionIcon}>
                    <AddressPinIcon />
                  </View>
                  <View style={styles.suggestionText}>
                    <Text style={styles.suggestionTitle} numberOfLines={1}>
                      {item.addressText}
                    </Text>
                    <Text style={styles.suggestionSubtitle} numberOfLines={1}>
                      {[item.postalCode, item.city].filter(Boolean).join(" ")}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      ) : null}
    </View>
  );
}
