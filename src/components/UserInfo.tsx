import Link from "next/link";
import LeetcodeEnroll from "./LeetcodeEnroll";
import Statusbar from "./Statusbar";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UserInfo() {
  const session = await getServerSession(authConfig);
  if (!session) {
    return redirect("/");
  }

  const { id } = session;
  const response = await fetch(`http://localhost:3000/api/user/${id}`, {
    method: "GET",
  });
  const { data } = await response.json();

  console.log(data);

  return (
    <div className="flex justify-around items-center h-32 m-2">
      {data ? (
        <Statusbar />
      ) : (
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
      )}
    </div>
  );
}
