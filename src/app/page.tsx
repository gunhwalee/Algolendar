import { getServerSession } from "next-auth";
import Logo from "@/components/common/Logo";
import SignInButton from "@/components/common/SignInButton";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authConfig);

  if (session) {
    return redirect(`/user/${session.id}`);
  }

  return (
    <main className="h-pageHeight flex justify-center items-center">
      <div className="w-8/12 md:w-4/12 border-2 border-black rounded-xl p-6">
        <div className="mb-4">
          <Logo size={60} />
        </div>
        <p className="mb-4">
          Algolendar는 Google Calendar와 Leetcode를 연동해 알고리즘 공부
          스케줄을 보다 쉽게 기록 관리해 주는 서비스입니다. Algolendar를
          사용하려면 Google 계정으로 로그인해 주세요.
        </p>
        <SignInButton />
        <a href="http://localhost:3000/api/calendar">API</a>
      </div>
    </main>
  );
}
