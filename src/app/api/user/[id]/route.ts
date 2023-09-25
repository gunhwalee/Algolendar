import { NextRequest, NextResponse } from "next/server";
import GRAPHQL from "@/config/LEETCODE";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  const username = await req.json();
  const query = GRAPHQL.CHECK_USER;
  const session = await getServerSession(authConfig);
  const { id } = session!;

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });
    const data = await res.json();

    if (data.errors) return NextResponse.json({ result: "error" });

    await prisma.user.update({
      where: {
        id,
      },
      data: { leetcode: data.data.matchedUser.username },
    });

    return NextResponse.json({ result: "ok" });
  } catch (error) {
    console.log("Error is: ", error);
    return NextResponse.json({ result: "ng" }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return NextResponse.json({ result: "error" });

    return NextResponse.json({ result: "ok", data: user.leetcode });
  } catch (error) {
    console.log("Error is: ", error);
    return NextResponse.json({ result: "ng" }, { status: 500 });
  }
}

/*
{
  errors: [
    {
      message: 'That user does not exist.',
      locations: [Array],
      path: [Array],
      extensions: [Object]
    }
  ],
  data: { matchedUser: null }
}
*/
