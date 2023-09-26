"use client";

import { useState } from "react";

interface SubmitFormProps {
  name: string;
  value: string;
}

export default function SubmitForm({ list }: { list: SubmitFormProps[] }) {
  const [calendar, setCalendar] = useState<string>("");

  const submitOption = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/calendar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(calendar),
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
    <div className="w-6/12 h-fit p-3 overflow-y-auto text-sm bg-gray-700 text-gray-200 rounded-lg">
      {list.map((element) => (
        <div key={element.value} className="p-2 rounded hover:bg-gray-600">
          <div className="flex items-center">
            <input
              className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-700 focus:ring-offset-gray-700 focus:ring-2 bg-gray-600 border-gray-500"
              type="checkbox"
              id={element.name}
              value={element.value}
              checked={element.value === calendar}
              onChange={(event) => setCalendar(event.target.value)}
            />
            <label
              className="w-full ml-2 text-sm font-medium rounded text-gray-300"
              htmlFor={element.name}
            >
              {element.name}
            </label>
          </div>
        </div>
      ))}
      <button
        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        onClick={submitOption}
      >
        설정
      </button>
    </div>
  );
}
