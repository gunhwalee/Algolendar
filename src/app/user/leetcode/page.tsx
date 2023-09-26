import LeetcodeEnroll from "@/components/LeetcodeEnroll";

export default function Page() {
  return (
    <section className="w-pageWidth h-full flex justify-center items-center bg-green-300">
      <div className="w-6/12 border-2 border-black rounded-xl p-6">
        <p>알고리즘 진행 현황을 기록하려면 Leetcode 계정을 등록해주세요.</p>
        <LeetcodeEnroll />
      </div>
    </section>
  );
}
