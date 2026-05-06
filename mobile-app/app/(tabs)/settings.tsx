import { router } from "expo-router";
import { Alert, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { authClient } from "@/lib/auth-client";

export default function Settings() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const handleLogout = async () => {
    try {
      const result = await authClient.signOut();

      if (result?.error) {
        Alert.alert("Logout failed", result.error.message ?? "Please try again.");
        return;
      }

      router.replace("/auth");
    } catch {
      Alert.alert("Logout failed", "Please try again.");
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
      <View>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

          <Text style={[styles.subtitle, { color: colors.mutedText }]}>
            Manage your account and app preferences.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.mutedText }]}>Account</Text>

          <SettingsRow
            title="Profile"
            meta="Manage"
            colors={colors}
            onPress={() => router.push("/settings/profile")}
          />

          <SettingsRow
            title="Notifications"
            meta="Configure"
            colors={colors}
            onPress={() => router.push("/settings/notifications")}
          />

          <SettingsRow
            title="Privacy"
            meta="Review"
            colors={colors}
            onPress={() => router.push("/settings/privacy")}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.mutedText }]}>App</Text>

          <SettingsRow title="Appearance" meta="System" colors={colors} />

          <SettingsRow
            title="Help"
            meta="Open"
            colors={colors}
            onPress={() => router.push("/settings/help")}
          />
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.logoutButton,
          {
            backgroundColor: colors.danger,
            opacity: pressed ? 0.8 : 1,
          },
        ]}
        onPress={handleLogout}
      >
        <Text style={[styles.logoutText, { color: colors.dangerText }]}>Log out</Text>
      </Pressable>
    </ThemedView>
  );
}

type SettingsRowProps = {
  title: string;
  meta: string;
  colors: typeof Colors.light;
  onPress?: () => void;
};

function SettingsRow({ title, meta, colors, onPress }: SettingsRowProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.75 : 1,
        },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.rowText, { color: colors.text }]}>{title}</Text>

      <View style={styles.rowMetaGroup}>
        <Text style={[styles.rowMeta, { color: colors.mutedText }]}>{meta}</Text>
        <Text style={[styles.chevron, { color: colors.mutedText }]}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 72,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 36,
  },
  title: {
    fontSize: 42,
    fontWeight: "800",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 25,
    maxWidth: 320,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 10,
  },
  row: {
    minHeight: 58,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowText: {
    fontSize: 16,
    fontWeight: "600",
  },
  rowMetaGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  rowMeta: {
    fontSize: 14,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 24,
    fontWeight: "400",
    marginTop: -2,
  },
  logoutButton: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
