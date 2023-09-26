import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import LeetcodeEnroll from "@/components/LeetcodeEnroll";
import SubmitForm from "@/components/SubmitForm";
import { API } from "@/config/CONFIG";

interface CalendarInfo {
  id: string;
  summary: string;
  etag: string;
  accessRole: string;
}

export default async function Page() {
  const session = await getServerSession(authConfig);
  const response = await fetch(`${API.CALENDAR_URL}/users/me/calendarList`, {
    method: "GET",
    headers: { Authorization: "Bearer " + session?.accessToken },
  });
  const data = await response.json();
  if (data.error) return <div>다시 로그인해주세요.</div>;

  const list = data.items
    .filter((element: CalendarInfo) => element.accessRole !== "reader")
    .map((element: CalendarInfo) => {
      return { name: element.summary, value: element.id };
    });

  return (
    <section className="w-pageWidth h-full p-12">
      <div className="pb-4 mb-8 border-b border-gray-800">
        <h2 className="text-white text-3xl mb-4">LeetCode 계정 설정</h2>
        <p className="mb-2">
          알고리즘 진행 현황을 기록하려면 Leetcode 계정을 등록해주세요.
        </p>
        <LeetcodeEnroll />
      </div>
      <div className="pb-4 mb-8">
        <h2 className="text-white text-3xl mb-4">Calendar 설정</h2>
        <p className="mb-2">스케줄을 등록할 캘린더를 설정해주세요.</p>
        <SubmitForm list={list} />
      </div>
    </section>
  );
}
