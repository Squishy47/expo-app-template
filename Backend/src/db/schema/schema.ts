import {
	pgTable,
	serial,
	varchar,
	integer,
	timestamp,
} from "drizzle-orm/pg-core";

export const cars = pgTable("cars", {
	id: serial("id").primaryKey(),
	make: varchar("make", { length: 100 }),
	model: varchar("model", { length: 100 }),
	year: integer("year"),
	createdAt: timestamp("created_at").defaultNow(),
});

export const schema = {
	cars,
};
