import { dbProvider } from "../../middleware/dbProvider";
import { privateProcedure } from "../Global";

export const GetCar = privateProcedure
	.use(dbProvider)
	.query(({ ctx }) => "boopy");
