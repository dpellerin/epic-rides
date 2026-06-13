import { NextResponse } from "next/server";
import { getRequestAdminUser } from "@/lib/auth";
import { createAdminRide } from "@/lib/rides-data";

export async function POST(request: Request) {
  const user = await getRequestAdminUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "You must be signed in to create rides." },
      { status: 401 },
    );
  }

  const { title } = (await request.json().catch(() => ({}))) as {
    title?: string;
  };

  try {
    const ride = await createAdminRide(title?.trim() || "Untitled ride");

    return NextResponse.json({ ride }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not create ride." },
      { status: 500 },
    );
  }
}
