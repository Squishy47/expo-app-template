import { initTRPC } from '@trpc/server';
import { Context } from './context';
import { ZodError } from 'zod';
import superjson from 'superjson';

export const trpc = initTRPC.context<Context>().create({
  errorFormatter: ({ shape, error }) => {
    // If it's a Zod validation error, transform it
    if (error.cause instanceof ZodError) {
      return {
        ...shape,
        data: {
          code: shape.data.code,
          zodErrors: JSON.parse(shape.message), // Returns a structured object of errors
        },
      };
    }

    // // Otherwise, return default error shape

    delete shape.data.stack;

    return shape;
  },
  transformer: superjson,
  sse: {
    maxDurationMs: 5 * 60 * 1_000, // 5 minutes
    ping: {
      enabled: true,
      intervalMs: 3_000,
    },
    client: {
      reconnectAfterInactivityMs: 5_000,
    },
  },
});

export const router = trpc.router;
