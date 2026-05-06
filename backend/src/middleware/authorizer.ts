import { TRPCError } from "@trpc/server";
import { trpc } from "../trpcSetup";

export const Authorizer = trpc.middleware(async ({ next, ctx }) => {
  if (!ctx.auth.session) {
    throw new TRPCError({
      code: "FORBIDDEN",
    });
  }

  return next({
    ctx: {
      // user: ctx.user,
    },
  });
});
