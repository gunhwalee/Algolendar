import Navbar from "@/components/Navbar";
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
    <main className="h-pageHeight flex">
      <Navbar />
      {children}
    </main>
  );
}
