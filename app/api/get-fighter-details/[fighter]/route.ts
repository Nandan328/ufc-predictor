import { NextRequest, NextResponse } from "next/server";
import findFighterDetails from ".";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fighter: string }> }
) {
  const { fighter } = await params;

  const fighter_details = await findFighterDetails(fighter);
  if (!fighter_details) {
    return NextResponse.json({ error: "Fighter not found" }, { status: 404 });
  }
  return NextResponse.json(fighter_details);
}
