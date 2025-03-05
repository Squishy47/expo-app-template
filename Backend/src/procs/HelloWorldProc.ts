import { privateProcedure } from "./Global";

export const HelloWorldProc = privateProcedure.query(
  ({ ctx }) => `Hello! Your email is: ${ctx.user.email}`
);
