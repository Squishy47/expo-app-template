import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export const user = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Types for inserting new records

export type DrizzleInstance = NodePgDatabase<typeof schema>;

export type User = typeof user.$inferSelect;
export type InsertUser = typeof user.$inferInsert;

// Export the schema
export const schema = {
  user,
};
