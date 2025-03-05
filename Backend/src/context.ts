import { createClient, User } from "@supabase/supabase-js";

export async function GlobalContext(data: any) {
  const token = data.req.headers.authorization;

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let user: User | null = null;

  if (token) {
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser(token);

    if (!error) {
      user = supabaseUser;
    }
  }

  return {
    user,
  };
}

export type Context = Awaited<ReturnType<typeof GlobalContext>>;
