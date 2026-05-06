import "dotenv/config";
import { drizzle, NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema";

import { ExtractTablesWithRelations, sql } from "drizzle-orm";
import { PgTransaction } from "drizzle-orm/pg-core";

export type SupabaseToken = {
	iss?: string;
	sub?: string;
	aud?: string[] | string;
	exp?: number;
	nbf?: number;
	iat?: number;
	jti?: string;
	role?: string;
};

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is required");
}

if (!process.env.ADMIN_DATABASE_URL) {
	throw new Error("ADMIN_DATABASE_URL environment variable is required");
}

// ByPass RLS
export const admin = drizzle(process.env.ADMIN_DATABASE_URL!, { schema });

// Protected by RLS
const client = drizzle(process.env.DATABASE_URL!, { schema });

export type AdminDB = typeof admin;
export type RLSDB = typeof client;
export type DB = ReturnType<typeof createDrizzle>;
export type RLS_Transaction = PgTransaction<
	NodePgQueryResultHKT,
	typeof schema,
	ExtractTablesWithRelations<typeof schema>
>;

export function createDrizzle<Token extends SupabaseToken = SupabaseToken>(
	token: Token
) {
	return {
		admin,
		rls: (async (transaction, ...rest) => {
			return await client.transaction(async (tx) => {
				// Supabase exposes auth.uid() and auth.jwt()
				// https://supabase.com/docs/guides/database/postgres/row-level-security#helper-functions
				try {
					await tx.execute(sql`
          -- auth.jwt()
          select set_config('request.jwt.claims', '${sql.raw(
				JSON.stringify(token)
			)}', TRUE);
          -- auth.uid()
          select set_config('request.jwt.claim.sub', '${sql.raw(
				token.sub ?? ""
			)}', TRUE);												
          -- set local role
          set local role ${sql.raw(token.role ?? "anon")};
          `);
					return await transaction(tx);
				} finally {
					await tx.execute(sql`
            -- reset
            select set_config('request.jwt.claims', NULL, TRUE);
            select set_config('request.jwt.claim.sub', NULL, TRUE);
            reset role;
            `);
				}
			}, ...rest);
		}) as typeof client.transaction,
	};
}
