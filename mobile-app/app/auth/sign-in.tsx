import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { router } from "expo-router";

import { ThemedView } from "@/components/themed-view";
import { authClient } from "@/lib/auth-client";
import { Colors } from "@/constants/theme";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (result?.error) {
        Alert.alert("Sign in failed", result.error.message ?? "Invalid email or password.");
        return;
      }

      router.replace("/");
    } catch {
      Alert.alert("Sign in failed", "Something went wrong. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Text style={[styles.logo, { color: colors.text }]}>Your App</Text>

          <Text style={[styles.title, { color: colors.text }]}>Sign in</Text>

          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            Enter your credentials to continue.
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>Email</Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor={colors.mutedText}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              keyboardType="email-address"
              textContentType="emailAddress"
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            />
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>Password</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor={colors.mutedText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              style={[
                styles.input,
                {
                  color: colors.text,
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            />
          </View>

          <Pressable
            style={[
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                opacity: isSubmitting ? 0.7 : 1,
              },
            ]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={colors.primaryText} />
            ) : (
              <Text style={[styles.primaryButtonText, { color: colors.primaryText }]}>Sign in</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 96,
    paddingBottom: 40,
  },
  header: {
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
    maxWidth: 320,
  },
  form: {
    gap: 14,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  input: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
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
