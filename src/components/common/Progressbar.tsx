import { Count } from "@/utils/transformProfile";

interface ObjType {
  [index: string]: string;
  Easy: string;
  Medium: string;
  Hard: string;
}

export default function Progressbar({ data }: { data: Count }) {
  const { difficulty, count, total } = data;
  const statusColor: ObjType = {
    Easy: "bg-easyStatus",
    Medium: "bg-mediumStatus",
    Hard: "bg-hardStatus",
  };
  const submitColor: ObjType = {
    Easy: "bg-easySubmit",
    Medium: "bg-mediumSubmit",
    Hard: "bg-hardSubmit",
  };
  const ratio = Math.ceil((count / total!) * 100);

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <div className="text-sm mr-4">{difficulty}</div>
        <div className="flex items-center">
          <p className="text-lg text-white mr-1">{count}</p>
          <p className="text-sm">/{total}</p>
        </div>
      </div>
      <div className="relative w-[200px] h-2">
        <div
          className={`absolute w-full h-full ${statusColor[difficulty]} rounded`}
        ></div>
        <div
          className={`absolute w-[${ratio}%] h-full ${submitColor[difficulty]} rounded`}
        ></div>
      </div>
    </div>
  );
}
