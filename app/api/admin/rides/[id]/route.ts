import { NextResponse } from "next/server";
import { getRequestAdminUser } from "@/lib/auth";
import { updateAdminRide, type RideEditorPayload } from "@/lib/rides-data";

type AdminRideRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: AdminRideRouteProps) {
  const user = await getRequestAdminUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "You must be signed in to update rides." },
      { status: 401 },
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
