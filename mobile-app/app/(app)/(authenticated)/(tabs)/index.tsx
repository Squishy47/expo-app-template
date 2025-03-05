import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { trpc } from "@/trpc/trpcSetup";
import { Button } from "@rneui/base";
import supabase from "@/hooks/supabase/useSupabase";

export default function TabOneScreen() {
  const { data, isLoading } = trpc.Hello.useQuery();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>{data}</Text>

      <Button
        title="Logout"
        onPress={() => {
          supabase.auth.signOut();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
