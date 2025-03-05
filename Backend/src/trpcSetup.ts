import { initTRPC } from "@trpc/server";
import { Context } from "./context";
import { ZodError } from "zod";

export const trpc = initTRPC.context<Context>().create({
  errorFormatter: ({ shape, error }) => {
    // If it's a Zod validation error, transform it
    if (error.cause instanceof ZodError) {
      return {
        message: "Invalid input. Please check your data.",
        code: shape.code,
        data: {
          code: shape.data.code,
          httpStatus: shape.data.httpStatus,
          path: shape.data.path,
          zodErrors: JSON.parse(shape.message), // Returns a structured object of errors
        },
      };
    }

    // Otherwise, return default error shape

    delete shape.data.stack;

    return shape;
  },
});

export const router = trpc.router;
