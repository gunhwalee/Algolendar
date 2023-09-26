import { getServerSession } from "next-auth";
import SignOutButton from "./common/SignOutButton";
import Link from "next/link";
import { authConfig } from "@/lib/auth";
import SignInButton from "./common/SignInButton";

export default async function Navbar() {
  const session = await getServerSession(authConfig);

  return (
    <nav className="w-48 p-4 bg-side">
      <ul>
        {session ? (
          <>
            <li className="m-2 p-2">
              <Link href="/">{session.user!.name}님</Link>
            </li>
            <li className="m-2 p-2">
              <Link href="/account">계정 설정</Link>
            </li>
            <li className="m-2 p-2">
              <Link href="/setting">알고리즘 설정</Link>
            </li>
            <li className="m-2 p-2">
              <Link href="/status">진행 현황</Link>
            </li>
            <li className="m-2 p-2">
              <SignOutButton />
            </li>
          </>
        ) : (
          <li className="m-2 p-2">
            <SignInButton />
          </li>
        )}
      </ul>
    </nav>
  );
}
