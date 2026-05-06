import { trpc } from "../trpcSetup";
import { createDrizzle, SupabaseToken } from "../db/db";

export const dbProvider = trpc.middleware(async ({ next, ctx }) => {
	// const decodedToken = JSON.parse(
	//   Buffer.from(ctx.auth.token.split('.')[1], 'base64').toString(),
	// ) as SupabaseToken;
	return next({});
	// const db = createDrizzle(decodedToken);

	// return next({
	//   ctx: {
	//     db,
	//   },
	// });
});
