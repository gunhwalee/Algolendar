"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchByParam = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/user/${id}`, {
    method: "GET",
  });
  const { data } = await response.json();
  return data;
};

export default function LeetcodeEnroll() {
  const { data: session } = useSession();
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      if (!session || !session.id) return "";
      else return fetchByParam(session.id);
    },
  });
  const [leetcode, setLeetCode] = useState<string>(data || "");

  useEffect(() => {
    if (data) setLeetCode(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeetCode(event.target.value);
  };

  const submitHandler = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/${session?.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(leetcode),
        }
      );
      const data = await response.json();

      if (data.result === "error") alert("Leetcode 아이디를 확인해주세요.");
      else if (data.result === "ng") alert("잠시 후 다시 시도해주세요.");
      else alert("Leetcode 등록이 완료됐습니다.");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      console.log(message);
    }
  };

  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-6/12 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Leetcode name"
        value={leetcode}
        onChange={inputHandler}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submitHandler}
      >
        {data ? "변경" : "등록"}
      </button>
    </div>
  );
}
