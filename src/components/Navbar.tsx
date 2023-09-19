import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import SignOutButton from "./common/SignOutButton";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession(authConfig);

  return (
    <nav className="flex justify-between px-8 py-2">
      <div>{session?.user?.name}</div>
      <Link href="/calendar">
        <div>캘린더 설정</div>
      </Link>
      <Link href="/calendar">
        <div>알고리즘 설정</div>
      </Link>
      <SignOutButton />
    </nav>
  );
}
