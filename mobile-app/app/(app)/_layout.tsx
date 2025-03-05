import { UserProvider, useUser } from "@/contexts/AuthContext";
import { Redirect, Stack } from "expo-router";

export default function () {
  const { user } = useUser();

  //   if (!user) {
  //     return <Redirect href="/login" />;
  //   }

  return <Stack screenOptions={{ headerShown: false }} />;
}
