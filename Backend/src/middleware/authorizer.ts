import { TRPCError } from "@trpc/server";
import { trpc } from "../trpcSetup";

export const Authorizer = trpc.middleware(async ({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
