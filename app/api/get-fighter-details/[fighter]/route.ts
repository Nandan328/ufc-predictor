import { NextRequest, NextResponse } from "next/server";
import findFighterDetails from ".";
import { prisma } from "@/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { fighter: string } }
) {
  const { fighter } = params;

  const fighter_details = await findFighterDetails(fighter);
  if (!fighter_details) {
    return NextResponse.json({ error: "Fighter not found" }, { status: 404 });
  }

  if (
    !(await prisma.fighterData.findFirst({
      where: {
        name: fighter_details.name,
      },
    }))
  ) {
    const res = await prisma.fighterData.create({
      data: {
        name: fighter_details.name,
        nickname: fighter_details.nickname,
        tags: fighter_details.tags,
        division: fighter_details.division,
        win_lose: fighter_details.win_lose,
        stats: fighter_details.stats.map((stat) => ({
          stat: stat.stat,
          num: stat.num,
        })),
        img: fighter_details.img,
      },
    });

    console.log("Fighter data created:", res);
  }

  return NextResponse.json(fighter_details);
}
