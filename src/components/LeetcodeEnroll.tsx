"use client";

import { API } from "@/config/CONFIG";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const fetchLeetcodeId = async () => {
  const response = await fetch(`${API.API_URL}/api/user`, {
    method: "GET",
  });
  const { data } = await response.json();
  return data;
};

export default function LeetcodeEnroll() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchLeetcodeId(),
  });
  const [leetcode, setLeetCode] = useState<string>(data || "");

  useEffect(() => {
    if (data) setLeetCode(data);
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeetCode(event.target.value);
  };

  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const target = (event.target as HTMLElement).innerText;

    try {
      const response = await fetch(`${API.API_URL}/api/user`, {
        method: "PATCH",
        body: JSON.stringify(target === "삭제" ? "" : leetcode),
      });
      const data = await response.json();

      alert(data.message);
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
        className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submitHandler}
      >
        {data ? "변경" : "등록"}
      </button>
      {data && (
        <button
          className="bg-gray-600 hover:bg-red-500 text-white font-bold py-2 px-4 ml-2 rounded"
          onClick={(e) => {
            setLeetCode("");
            submitHandler(e);
          }}
        >
          삭제
        </button>
      )}
    </div>
  );
}
