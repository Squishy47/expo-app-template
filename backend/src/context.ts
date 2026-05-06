import { TRPCError } from "@trpc/server";
import winston, { format } from "winston";
import { auth } from "./auth";
import { fromNodeHeaders } from "better-auth/node";

const logger = winston.createLogger({
  level: "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.Console()],
});

export async function GlobalContext(data: any) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(data.req.headers),
  });

  return {
    auth: {
      session,
    },
    logger,
  };
}

export type Context = Awaited<ReturnType<typeof GlobalContext>>;
