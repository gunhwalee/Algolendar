import SignOutButton from "./common/SignOutButton";
import Link from "next/link";

export default async function Navbar() {
  return (
    <nav className="w-48 p-4 bg-red-300">
      <ul>
        <li className="m-2 p-2">
          <Link href="/user/setting">계정 설정</Link>
        </li>
        <li className="m-2 p-2">
          <Link href="/algorithm/setting">알고리즘 설정</Link>
        </li>
        <li className="m-2 p-2">
          <Link href="/user/status">진행 현황</Link>
        </li>
        <li className="m-2 p-2">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
