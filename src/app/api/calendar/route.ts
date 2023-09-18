import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const events = {
  summary: "Algolendar Test",
  description: "API쏘세요",
  start: {
    dateTime: "2023-09-20T12:00:00",
    timeZone: "UTC",
  },
  end: {
    dateTime: "2023-09-20T13:00:00",
    timeZone: "UTC",
  },
};

export async function GET() {
  const session = await getServerSession(authConfig);
  if (!session) return NextResponse.json({ message: "Please Log in" });

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + session.accessToken,
      },
      body: JSON.stringify(events),
    }
  );

  const data = res.json();
  console.log(data);
  return NextResponse.redirect("http://localhost:3000");
}
