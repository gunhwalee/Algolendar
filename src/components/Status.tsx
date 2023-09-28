"use client";

import { API } from "@/config/CONFIG";
import TEXT from "@/constants/text";
import { useQuery } from "@tanstack/react-query";
import InformationPage from "./common/InformationPage";
import { Count, problemsCount } from "@/utils/transformProfile";
import Statusbar from "./Statusbar";
import Progressbar from "./common/Progressbar";

async function fetchData() {
  try {
    const response = await fetch(`${API.API_URL}/api/user/leetcode`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error is: ", error);
    return TEXT.SERVER_ERROR;
  }
}

export default function Status() {
  const { data, isLoading } = useQuery({
    queryKey: ["status"],
    queryFn: async () => fetchData(),
  });
  if (isLoading) return <div>Loading...</div>;
  const { result, message } = data;

  if (result === "error") return <InformationPage text={message} />;

  const solved = problemsCount(message);
  // console.log(solved);

  return (
    <div className="flex items-center">
      <Statusbar data={solved[0]} />
      <div className="ml-10">
        {solved.map((element: Count) => {
          if (element.difficulty !== "All")
            return <Progressbar data={element} key={element.difficulty} />;
        })}
      </div>
    </div>
  );
}
