import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.ADMIN_DATABASE_URL) {
	throw new Error("ADMIN_DATABASE_URL environment variable is required");
}

export default {
	schema: ["./src/db/schema/schema.ts", "./src/db/schema/auth-schema.ts"],
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.ADMIN_DATABASE_URL,
	},
	// Enable strict mode for better type safety
	strict: true,
	// Name migrations based on schema changes
	verbose: true,
};
