import { router } from "expo-router";
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";

import { Colors } from "@/constants/theme";
import { ThemedView } from "@/components/themed-view";

export default function Index() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.logo, { color: colors.text }]}>Your App</Text>

        <Text style={[styles.title, { color: colors.text }]}>Welcome</Text>

        <Text style={[styles.subtitle, { color: colors.mutedText }]}>
          Sign in or create an account to continue.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={[styles.primaryButton, { backgroundColor: colors.primary }]}
          onPress={() => router.push("/auth/sign-in")}
        >
          <Text style={[styles.primaryButtonText, { color: colors.primaryText }]}>Sign in</Text>
        </Pressable>

        <Pressable
          style={[styles.secondaryButton, { borderColor: colors.border }]}
          onPress={() => router.push("/auth/sign-up")}
        >
          <Text style={[styles.secondaryButtonText, { color: colors.text }]}>Create account</Text>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 96,
    paddingBottom: 40,
  },
  content: {
    alignItems: "flex-start",
  },
  logo: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 64,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 25,
    maxWidth: 300,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
