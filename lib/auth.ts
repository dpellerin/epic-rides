import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextResponse } from "next/server";
import type { Session, User } from "@supabase/supabase-js";
import { createServerSupabaseClient } from "@/lib/supabase";

export const authCookieNames = {
  accessToken: "epic-rides-access-token",
  refreshToken: "epic-rides-refresh-token",
};

function getCookieOptions(maxAge?: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

export async function getUserFromAccessToken(accessToken?: string) {
  if (!accessToken) {
    return null;
  }

  const supabase = createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(accessToken);

  if (error) {
    return null;
  }

  return data.user;
}

export async function getCurrentAdminUser() {
  const cookieStore = await cookies();

  return getUserFromAccessToken(cookieStore.get(authCookieNames.accessToken)?.value);
}

export async function requireAdminUser() {
  const user = await getCurrentAdminUser();

  if (!user) {
    redirect("/admin/login");
  }

  return user;
}

export async function getRequestAdminUser(request: Request) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const accessToken = cookieHeader
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(`${authCookieNames.accessToken}=`))
    ?.split("=")[1];

  return getUserFromAccessToken(accessToken ? decodeURIComponent(accessToken) : undefined);
}

export function setAuthCookies(response: NextResponse, session: Session) {
  response.cookies.set(
    authCookieNames.accessToken,
    session.access_token,
    getCookieOptions(session.expires_in),
  );
  response.cookies.set(
    authCookieNames.refreshToken,
    session.refresh_token,
    getCookieOptions(60 * 60 * 24 * 30),
  );
}

export function clearAuthCookies(response: NextResponse) {
  response.cookies.set(authCookieNames.accessToken, "", getCookieOptions(0));
  response.cookies.set(authCookieNames.refreshToken, "", getCookieOptions(0));
}

export type AdminUser = User;
