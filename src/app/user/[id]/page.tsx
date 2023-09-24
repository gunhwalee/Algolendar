import Link from "next/link";

export default function Page() {
  return (
    <div className="h-userPageHeight flex justify-center items-center">
      <div className="w-8/12 md:w-4/12 border-2 border-black rounded-xl p-6">
        <p>
          Algolendar는 Google Calendar와 Leetcode를 연동해 알고리즘 공부
          스케줄을 관리하는 애플리케이션입니다.
        </p>
        <p>
          1.{" "}
          <Link href="https://www.leetcode.com">
            <span className="text-blue-600">Leetcode</span>
          </Link>{" "}
          계정을 등록해 알고리즘 문제의 제출 기록을 관리할 수 있습니다.
        </p>
        <p>
          2. 캘린더 설정 페이지에서 스케줄을 등록할 캘린더를 설정해주세요.
          별도의 설정이 없다면 기본 캘린더에 등록됩니다.
        </p>
        <p>
          3. 알고리즘 설정 페이지에서 캘린더에 등록할 공부 스케줄을
          설정해보세요. 난이도, 주제, 빈도를 다양하게 설정할 수 있습니다.
        </p>
        <p>4. 캘린더에 등록된 알고리즘을 </p>
      </div>
    </div>
  );
}
