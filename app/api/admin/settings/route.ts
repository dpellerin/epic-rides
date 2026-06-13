import { NextResponse } from "next/server";
import { getRequestAdminUser } from "@/lib/auth";
import { updateHomepageSettings, type HomepageSettings } from "@/lib/settings-data";

export async function PATCH(request: Request) {
  const user = await getRequestAdminUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "You must be signed in to update settings." },
      { status: 401 },
    );
  }

  const payload = (await request.json()) as HomepageSettings;

  try {
    const settings = await updateHomepageSettings(payload);

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update settings." },
      { status: 500 },
    );
  }
}
