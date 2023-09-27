import Statusbar from "@/components/Statusbar";
import InformationPage from "@/components/common/InformationPage";
import Progressbar from "@/components/common/Progressbar";
import { API } from "@/config/CONFIG";
import TEXT from "@/constants/text";
import { Count, problemsCount } from "@/utils/transformProfile";
import { headers } from "next/headers";

export default async function Page() {
  const response = await fetch(`${API.API_URL}/api/user/leetcode`, {
    method: "GET",
    headers: headers(),
  });
  const { data } = await response.json();

  if (!data) return <InformationPage text={TEXT.NEED_LEETCODE_ID} />;
  const solved = problemsCount(data);

  return (
    <section className="w-pageWidth h-full p-12">
      <div className="pb-4 mb-8 border-b border-gray-800">
        <h2 className="text-white text-3xl mb-4">Solved Problems</h2>
        <div className="flex items-center">
          <Statusbar data={solved[0]} />
          <div className="ml-10">
            {solved.map((element: Count) => {
              if (element.difficulty !== "All")
                return <Progressbar data={element} key={element.difficulty} />;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
