import SelectBox from "@/components/common/SelectBox";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";

interface CalendarInfo {
  id: string;
  summary: string;
  etag: string;
}

export default async function Page() {
  const session = await getServerSession(authConfig);
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + session?.accessToken,
      },
    }
  );

  const data = await response.json();
  const list = data.items.map((element: CalendarInfo) => element.summary);

  return (
    <div className="h-userPageHeight flex flex-col justify-center items-center">
      <p>스케줄을 등록할 캘린더를 설정해주세요.</p>
      <form method="PATCH">
        {list.map((name: string) => (
          <SelectBox key={name} text={name} />
        ))}
      </form>
    </div>
  );
}
