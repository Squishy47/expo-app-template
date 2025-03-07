import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../Backend/src/routers/router";
import { createTRPCReact } from "@trpc/react-query";

//     👆 **type-only** import
// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.

export const trpc = createTRPCReact<AppRouter>();

export type RouterOutput = ReturnType<typeof trpc.createClient>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
