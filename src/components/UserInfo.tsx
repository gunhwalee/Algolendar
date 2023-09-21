import Link from "next/link";
import LeetcodeEnroll from "./LeetcodeEnroll";
import Statusbar from "./Statusbar";

export default function UserInfo({ user }: { user: boolean }) {
  return (
    <div className="flex justify-around items-center h-32 m-2">
      {user ? (
        <div className="flex flex-col">
          <p>
            알고리즘 문제를 제출한 기록을 관리하려면{" "}
            <Link href="https://www.leetcode.com">
              <span className="text-blue-600">Leetcode</span>
            </Link>{" "}
            계정을 등록해 주세요.
          </p>
          <LeetcodeEnroll />
        </div>
      ) : (
        <Statusbar />
      )}
    </div>
  );
}
