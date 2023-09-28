import { API } from "@/config/CONFIG";
import QUERY from "@/config/LEETCODE";
import TEXT from "@/constants/text";
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
      message: TEXT.RE_LOGIN,
    });
  const { id } = session;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user)
      return NextResponse.json({
        result: "error",
        message: TEXT.RE_LOGIN,
      });

    const { leetcode } = user;
    if (!leetcode)
      return NextResponse.json({
        result: "error",
        message: TEXT.NEED_LEETCODE_ID,
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
        message: TEXT.CHECK_LEETCODE_ID,
      });

    return NextResponse.json({ result: "ok", data });
  } catch (error) {
    console.error("Error is: ", error);

    return NextResponse.json({
      result: "error",
      message: TEXT.SERVER_ERROR,
    });
  }
}
