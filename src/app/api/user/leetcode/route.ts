import { API } from "@/config/CONFIG";
import QUERY from "@/config/LEETCODE";
import { authConfig } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authConfig);
  const { id } = session!;
  const query = QUERY.GET_PROFILE;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      return NextResponse.json({
        result: "error",
        message: "다시 로그인해주세요.",
      });

    const { leetcode } = user;
    if (!leetcode)
      return NextResponse.json({
        result: "error",
        message: "Leetcode 계정을 등록해주세요.",
      });

    const response = await fetch(API.LEETCODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: leetcode },
      }),
    });
    const { data } = await response.json();

    return NextResponse.json({ result: "ok", data });
  } catch (error) {
    console.error("Error is: ", error);
    return NextResponse.json({
      result: "ng",
      message: "잠시 후 다시 시도해주세요.",
    });
  }
}
