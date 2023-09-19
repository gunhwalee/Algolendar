import LeetcodeEnroll from "./LeetcodeEnroll";
import Statusbar from "./Statusbar";

export default function UserInfo({ user }: { user: boolean }) {
  return (
    <div className="flex justify-around items-center h-32 m-2">
      {user ? <LeetcodeEnroll /> : <Statusbar />}
    </div>
  );
}
