import Link from "next/link";

export default async function Page() {
  return (
    <section className="w-pageWidth h-full p-12">
      <div className="pb-4 mb-8 border-b border-gray-800">
        <h2 className="text-white text-3xl mb-4">Algolendar</h2>
        <p className="mb-2">
          Algolendar는 Google Calendar와 Leetcode를 연동해 알고리즘 공부
          스케줄을 관리하는 애플리케이션입니다.
        </p>
        <p className="mb-2">
          Algolendar를 사용하려면 메뉴의 로그인 버튼을 눌러 Google 계정으로
          로그인해 주세요.
        </p>
      </div>
      <div className="pb-4 mb-8 border-b border-gray-800">
        <h2 className="text-white text-3xl mb-4">How to Use</h2>
        <p className="mb-2">
          1.{" "}
          <Link href="https://www.leetcode.com">
            <span className="text-blue-600">Leetcode</span>
          </Link>{" "}
          계정을 등록해 알고리즘 문제의 제출 기록을 관리할 수 있습니다.
        </p>
        <p className="mb-2">
          2. 캘린더 설정 페이지에서 스케줄을 등록할 캘린더를 설정해주세요.
          별도의 설정이 없다면 기본 캘린더에 등록됩니다.
        </p>
        <p className="mb-2">
          3. 알고리즘 설정 페이지에서 캘린더에 등록할 공부 스케줄을
          설정해보세요. 난이도, 주제, 빈도를 다양하게 설정할 수 있습니다.
        </p>
        <p className="mb-2">4. 캘린더에 등록된 알고리즘을 </p>
      </div>
    </section>
  );
}
