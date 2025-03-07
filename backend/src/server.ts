import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "./routers/router";
import cors from "cors";
import { GlobalContext } from "./context";

createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext: GlobalContext,
}).listen(3001, () => console.log("server started on port 3001"));
