import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import TEXT from "@/constants/text";

export async function PATCH(req: Request) {
  const session = await getServerSession(authConfig);
  if (!session)
    return NextResponse.json({
      result: "error",
      message: TEXT.RE_LOGIN,
    });
  const { id } = session;

  try {
    const calendarId = await req.json();
    await prisma.user.update({
      where: { id },
      data: { calendar: calendarId },
    });

    return NextResponse.json({
      result: "ok",
      message: "Calendar 설정이 완료됐습니다.",
    });
  } catch (error) {
    console.error("Error is: ", error);

    return NextResponse.json({
      result: "error",
      message: TEXT.SERVER_ERROR,
    });
  }
}
