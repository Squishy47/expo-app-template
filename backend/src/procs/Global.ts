import { Authorizer } from '../middleware/authorizer';
import { loggingMiddleware } from '../middleware/logger';
import { trpc } from '../trpcSetup';

export const publicProcedure = trpc.procedure;
export const privateProcedure = trpc.procedure.use(Authorizer).use(loggingMiddleware);
