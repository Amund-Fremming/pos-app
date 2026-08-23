import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../../../theme/tokens";
import { ProgressCounter } from "../ProgressCounter/ProgressCounter";
import { styles } from "./OnboardingLayout.styles";

type OnboardingLayoutProps = {
  step: number;
  align: "center" | "left";
  /** Top-align content instead of vertically centering it — used while a search panel is open, so a growing result list doesn't reposition everything above it. */
  compact?: boolean;
  children: ReactNode;
  footer: ReactNode;
};

export function OnboardingLayout({ step, align, compact, children, footer }: OnboardingLayoutProps) {
  return (
    <LinearGradient colors={[colors.paperTop, colors.paperBottom]} style={styles.canvas}>
      <SafeAreaView style={styles.card} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ProgressCounter step={step} />
          <View
            style={[
              styles.content,
              align === "center" ? styles.contentCentered : styles.contentLeft,
              compact && styles.contentCompact,
            ]}
          >
            {children}
          </View>
          <View style={styles.buttonBlock}>{footer}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
