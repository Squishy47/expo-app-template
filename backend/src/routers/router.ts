import { GetCar } from "../procs/car/GetUser";
import { router } from "../trpcSetup";

export const appRouter = router({
	car: {
		get: GetCar,
	},
});

export type AppRouter = typeof appRouter;
