import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "./db/db";
import { expo } from "@better-auth/expo";
import { user, session, account, verification } from "./db/schema/auth-schema";

export const auth = betterAuth({
  plugins: [expo()],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  trustedOrigins: ["templateapp://", "exp://192.168.1.238:8081"],
  advanced: { database: { generateId: false } },
  database: drizzleAdapter(admin, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
    usePlural: false,
  }),
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      console.log(user);
    },
  },
});
