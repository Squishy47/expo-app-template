export type Env = {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  DATABASE_URL: string;
  HYPERDRIVE: Hyperdrive;
  RLS_HYPERDRIVE: Hyperdrive;
  MODE: "DEV" | undefined;
};
