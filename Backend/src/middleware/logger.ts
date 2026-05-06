import winston from "winston";
import { trpc } from "../trpcSetup";

export const loggingMiddleware = trpc.middleware(
	async ({ path, next, type, ctx }) => {
		ctx.logger.info(`type: ${type} | path: ${path} | user: ${ctx}`);

		return next({
			ctx,
		});
	}
);
