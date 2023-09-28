import { NextRequest, NextResponse } from "next/server";
import QUERY from "@/config/LEETCODE";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { API } from "@/config/CONFIG";
import prisma from "@/lib/db";
import TEXT from "@/constants/text";

export async function PATCH(req: NextRequest) {
  const query = QUERY.CHECK_USER;
  const session = await getServerSession(authConfig);
  if (!session)
    return NextResponse.json({
      result: "error",
      message: TEXT.RE_LOGIN,
    });
  const { id } = session;

  try {
    const username = await req.json();
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

    const response = await fetch(API.LEETCODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });
    const { data, errors } = await response.json();

    if (errors)
      return NextResponse.json({
        result: "error",
        message: TEXT.CHECK_LEETCODE_ID,
      });

    await prisma.user.update({
      where: {
        id,
      },
      data: { leetcode: data.matchedUser.username },
    });

    return NextResponse.json({
      result: "ok",
      message: "Leetcode 계정 등록이 완료됐습니다.",
    });
  } catch (error) {
    console.error("Error is: ", error);

    return NextResponse.json({
      result: "ng",
      message: TEXT.SERVER_ERROR,
    });
  }
}

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!session)
    return NextResponse.json({
      result: "error",
      message: TEXT.RE_LOGIN,
    });
  const { id } = session;

  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user)
      return NextResponse.json({ result: "error", message: TEXT.RE_LOGIN });

    return NextResponse.json({ result: "ok", data: user.leetcode });
  } catch (error) {
    console.error("Error is: ", error);

    return NextResponse.json({
      result: "error",
      message: TEXT.SERVER_ERROR,
    });
  }
}
