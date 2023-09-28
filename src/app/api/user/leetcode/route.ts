import { API } from "@/config/CONFIG";
import QUERY from "@/config/LEETCODE";
import { authConfig } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const query = QUERY.GET_PROFILE;
  const session = await getServerSession(authConfig);
  if (!session)
    return NextResponse.json({
      result: "error",
      message: "다시 로그인 해주세요.",
    });
  const { id } = session;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      return NextResponse.json({
        result: "error",
        message: "다시 로그인 해주세요.",
      });

    const { leetcode } = user;
    if (!leetcode)
      return NextResponse.json({
        result: "error",
        message: "Leetcode 아이디를 등록해주세요.",
      });

    const response = await fetch(API.LEETCODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          username: leetcode,
        },
      }),
    });
    const { data } = await response.json();

    if (data.errors)
      return NextResponse.json({
        result: "error",
        message: "Leetcode 아이디를 확인해주세요.",
      });

    return NextResponse.json({ result: "ok", message: data });
  } catch (error) {
    console.error("Error is: ", error);
    return NextResponse.json({
      result: "error",
      message: "잠시 후 다시 시도해주세요.",
    });
  }
}
