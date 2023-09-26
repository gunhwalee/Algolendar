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

  try {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/692937f2a193c7238adedf2bfbf83ac6fd45ed016ff0a269eb484225d11d2d0b@group.calendar.google.com/events",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
        body: JSON.stringify(events),
      }
    );
    const data = await response.json();

    return NextResponse.redirect("http://localhost:3000");
  } catch (error) {
    console.error(error);
  }
}
