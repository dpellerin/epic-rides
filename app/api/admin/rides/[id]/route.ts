import { NextResponse } from "next/server";
import { updateAdminRide, type RideEditorPayload } from "@/lib/rides-data";

type AdminRideRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: AdminRideRouteProps) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "Admin writes require Supabase Auth before production use." },
      { status: 403 },
    );
  }

  const { id } = await params;
  const payload = (await request.json()) as RideEditorPayload;

  try {
    const ride = await updateAdminRide(id, payload);

    return NextResponse.json({ ride });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not update ride." },
      { status: 500 },
    );
  }
}
