import Link from "next/link";
import Button from "./common/Button";

export default function LeetcodeEnroll() {
  return (
    <div className="flex flex-col">
      <p>
        알고리즘 문제를 제출한 기록을 관리하려면{" "}
        <Link href="https://www.leetcode.com">
          <span className="text-blue-600">Leetcode</span>
        </Link>{" "}
        계정을 등록해 주세요.
      </p>
      <div>
        <input
          className="shadow appearance-none border rounded w-6/12 py-2 px-3 mr-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Leetcode name"
        />
        <Button text="등록" />
      </div>
    </div>
  );
}
