import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function PATCH(req: Request) {
  const calendarId = await req.json();
  const session = await getServerSession(authConfig);
  const { id } = session!;

  try {
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
      result: "ng",
      message: "잠시 후 다시 시도해주세요.",
    });
  }
}
