import { createContext, useContext, useEffect, useState } from "react";

import {
  type User as SupbaseUser,
  type Session as SupabaseSession,
} from "@supabase/supabase-js";
import supabase from "@/hooks/supabase/useSupabase";
import { useRouter } from "expo-router";

export type Session = SupabaseSession | null | undefined;
export type User = SupbaseUser | undefined;

const UserContext = createContext<{
  user: User;
}>({
  user: undefined,
});

const SessionConext = createContext<{
  session: Session;
}>({
  session: undefined,
});

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};

export const useSession = () => {
  const context = useContext(SessionConext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
};

type Props = { children: React.ReactNode };

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User>();
  const [_, setSession] = useState<Session>();

  const router = useRouter();

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user);
        setSession(session);

        if (event === "INITIAL_SESSION") {
          // handle initial session
        } else if (event === "SIGNED_IN") {
          console.log("signin callback");
          router.replace("/");
        } else if (event === "SIGNED_OUT") {
          console.log("signout callback");
          router.replace("/login");
        } else if (event === "PASSWORD_RECOVERY") {
          // handle password recovery event
        } else if (event === "TOKEN_REFRESHED") {
          // handle token refreshed event
        } else if (event === "USER_UPDATED") {
          // handle user updated event
        }
      },
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
