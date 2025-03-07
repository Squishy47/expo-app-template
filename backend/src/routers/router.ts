import { HelloWorldProc } from "../procs/HelloWorldProc";

import { router } from "../trpcSetup";

export const appRouter = router({
  Hello: HelloWorldProc,
});

export type AppRouter = typeof appRouter;
