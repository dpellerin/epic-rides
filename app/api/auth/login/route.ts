import { NextResponse } from "next/server";
import { setAuthCookies } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.session) {
    return NextResponse.json(
      { error: error?.message ?? "Could not sign in." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ user: data.user });
  setAuthCookies(response, data.session);

  return response;
}
