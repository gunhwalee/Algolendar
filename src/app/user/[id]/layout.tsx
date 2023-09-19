import Navbar from "@/components/Navbar";
import UserInfo from "@/components/UserInfo";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  if (!session) {
    return redirect("/");
  }

  return (
    <main className="h-pageHeight flex flex-col">
      <Navbar />
      <div className="w-full h-full md:flex">
        <UserInfo user={true} />
        {children}
      </div>
    </main>
  );
}
