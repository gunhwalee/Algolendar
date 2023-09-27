import Statusbar from "@/components/Statusbar";
import InformationPage from "@/components/common/InformationPage";
import Progressbar from "@/components/common/Progressbar";
import { API } from "@/config/CONFIG";
import QUERY from "@/config/LEETCODE";
import TEXT from "@/constants/text";
import { authConfig } from "@/lib/auth";
import { Count, problemsCount } from "@/utils/transformProfile";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

async function fetchData() {
  const session = await getServerSession(authConfig);
  if (!session) return TEXT.RE_LOGIN;
  const { id } = session;
  const query = QUERY.GET_PROFILE;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) return TEXT.RE_LOGIN;

    const { leetcode } = user;
    if (!leetcode) return TEXT.NEED_LEETCODE_ID;

    const response = await fetch(API.LEETCODE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: leetcode },
      }),
      next: { revalidate: 10 },
    });
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error is: ", error);
    return TEXT.SERVER_ERROR;
  }
}

export default async function Page() {
  const data = await fetchData();
  console.log(data);
  if (typeof data === "string") return <InformationPage text={data} />;
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
