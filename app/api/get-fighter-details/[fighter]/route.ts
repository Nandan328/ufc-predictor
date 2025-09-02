import { NextRequest, NextResponse } from "next/server";
import fighterDetails from "@data/data.json"
import { FighterData as FighterDetails } from "@/app/lib/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fighter: string }> }
) {
  const { fighter } = await params;

  const fighter_details = await binarySearchByName(fighterDetails as FighterDetails[], fighter);

  if (!fighter_details) {   
    return NextResponse.json({ error: "Fighter not found" }, { status: 404 });
  }
  return NextResponse.json(fighter_details);
}

function binarySearchByName(arr: FighterDetails[], targetName: string) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midName = arr[mid].name.toLowerCase().trim();
    targetName = targetName.toLowerCase().trim();
    if (midName === targetName) {
      return arr[mid];
    } else if (midName < targetName) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return null;
}