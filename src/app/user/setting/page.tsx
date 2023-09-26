import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LeetcodeEnroll from "@/components/LeetcodeEnroll";
import SelectBox from "@/components/common/SelectBox";

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
      headers: { Authorization: "Bearer " + session?.accessToken },
    }
  );
  const data = await response.json();
  const list = data.items.map((element: CalendarInfo) => element.summary);

  return (
    <section className="w-pageWidth h-full flex flex-col justify-evenly items-center bg-green-300">
      <div className="w-6/12 border-2 border-black rounded-xl p-6">
        <p>알고리즘 진행 현황을 기록하려면 Leetcode 계정을 등록해주세요.</p>
        <LeetcodeEnroll />
      </div>
      <div className="w-6/12 border-2 border-black rounded-xl p-6">
        <p>스케줄을 등록할 캘린더를 설정해주세요.</p>
        <form method="PATCH">
          {list.map((name: string) => (
            <SelectBox key={name} text={name} />
          ))}
        </form>
      </div>
    </section>
  );
}
