import { NextRequest, NextResponse } from "next/server";
import QUERY from "@/config/LEETCODE";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { API } from "@/config/CONFIG";

const prisma = new PrismaClient();

export async function PATCH(req: NextRequest) {
  const username = await req.json();
  const query = QUERY.CHECK_USER;
  const session = await getServerSession(authConfig);
  const { id } = session!;

  try {
    if (!username) {
      await prisma.user.update({
        where: {
          id,
        },
        data: { leetcode: null },
      });

      return NextResponse.json({
        result: "ok",
        message: "Leetcode 계정 삭제가 완료됐습니다.",
      });
    }

    const res = await fetch(API.LEETCODE_URL, {
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

    if (data.errors)
      return NextResponse.json({
        result: "error",
        message: "Leetcode 아이디를 확인해주세요.",
      });

    await prisma.user.update({
      where: {
        id,
      },
      data: { leetcode: data.data.matchedUser.username },
    });

    return NextResponse.json({
      result: "ok",
      message: "Leetcode 계정 등록이 완료됐습니다.",
    });
  } catch (error) {
    console.error("Error is: ", error);
    return NextResponse.json({
      result: "ng",
      message: "잠시 후 다시 시도해주세요.",
    });
  }
}

export async function GET() {
  const session = await getServerSession(authConfig);
  const { id } = session!;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return NextResponse.json({ result: "error" });

    return NextResponse.json({ result: "ok", data: user.leetcode });
  } catch (error) {
    console.error("Error is: ", error);
    return NextResponse.json({
      result: "ng",
      message: "잠시 후 다시 시도해주세요.",
    });
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
