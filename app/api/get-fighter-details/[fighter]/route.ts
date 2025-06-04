import { NextRequest, NextResponse } from "next/server";
import findFighterDetails from ".";
// import { prisma } from "@/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ fighter: string }> }
) {
  const { fighter } = await params;

  const fighter_details = await findFighterDetails(fighter);
  if (!fighter_details) {
    return NextResponse.json({ error: "Fighter not found" }, { status: 404 });
  }

  // const existingFighter = await prisma.fighterData.findUnique({
  //   where: {
  //     name: fighter_details.name,
  //   },
  // });

  // if (!existingFighter) {
  //   await prisma.fighterData.create({
  //     data: {
  //       name: fighter_details.name,
  //       nickname: fighter_details.nickname,
  //       tags: fighter_details.tags,
  //       division: fighter_details.division,
  //       win_lose: fighter_details.win_lose,
  //       stats: Array.isArray(fighter_details.stats)
  //         ? {
  //             set: fighter_details.stats.map((stat) => ({
  //               stat: stat.stat,
  //               num: stat.num,
  //             })),
  //           }
  //         : { set: [] },
  //       img: fighter_details.img,
  //     },
  //   });
  // }

  return NextResponse.json(fighter_details);
}
