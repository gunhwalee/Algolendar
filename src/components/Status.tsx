"use client";

import { API } from "@/config/CONFIG";
import TEXT from "@/constants/text";
import { useQuery } from "@tanstack/react-query";
import InformationPage from "./common/InformationPage";
import { Count, problemsCount } from "@/utils/transformProfile";
import TotalGraph from "./TotalGraph";
import Progressbar from "./common/Progressbar";

const fetchStatus = async () => {
  try {
    const response = await fetch(`${API.API_URL}/api/user/leetcode`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error is: ", error);

    return TEXT.SERVER_ERROR;
  }
};

export default function Status() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["status"],
    queryFn: fetchStatus,
  });

  if (isLoading) return <div>Loading...</div>;
  const { result, message, data } = response;
  if (result === "error") return <InformationPage text={message} />;

  const solved = problemsCount(data);

  return (
    <div className="flex items-center">
      <TotalGraph data={solved[0]} />
      <div className="ml-10">
        {solved.map((element: Count) => {
          if (element.difficulty !== "All")
            return <Progressbar data={element} key={element.difficulty} />;
        })}
      </div>
    </div>
  );
}
