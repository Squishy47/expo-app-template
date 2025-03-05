import { db } from "../db/db";
import { trpc } from "../trpcSetup";

export const dbProvider = trpc.middleware(async ({ next, ctx }) => {
  return next({
    ctx: {
      db,
    },
  });
});
