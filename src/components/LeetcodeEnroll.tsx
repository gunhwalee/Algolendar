"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

export default function InputBox() {
  const [leetcode, setLeetCode] = useState<string>("");
  const { data } = useSession();

  if (!data) return null;

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLeetCode(event.target.value);
  };

  const submitHandler = async () => {
    try {
      await axios.patch(`http://localhost:3000/api/user/${data.id}`, {
        leetcode,
      });
      alert("Leetcode 아이디 등록이 완료됐습니다.");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      if (message?.includes("400")) alert("Leetcode 아이디를 확인해주세요.");
      if (message?.includes("500")) alert("잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <div>
      <input
        className="shadow appearance-none border rounded w-6/12 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Leetcode name"
        onChange={inputHandler}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={submitHandler}
      >
        등록
      </button>
    </div>
  );
}
