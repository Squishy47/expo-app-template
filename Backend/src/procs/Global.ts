import { Authorizer } from "../middleware/authorizer";
import { trpc } from "../trpcSetup";

export const publicProcedure = trpc.procedure;
export const privateProcedure = trpc.procedure.use(Authorizer);
