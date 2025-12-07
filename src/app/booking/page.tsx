import type { Metadata } from "next";
import { Calculator, RefundPolicy } from "@/components/sections";
import ProductTabs from "@/components/booking/ProductTabs";
import ComparisonTable from "@/components/booking/ComparisonTable";

export const metadata: Metadata = {
  title: "예약/견적",
  description: "초호쉼터 워크샵, 야유회 견적 계산 및 예약 문의. 1인 99,000원 올인클루전 패키지.",
};

export default function BookingPage() {
  return (
    <div className="pt-16">
      {/* 히어로 섹션 - 유튜브 배경 */}
      <section className="relative min-h-[70vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* 배경 영상 */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black">
          <iframe
            src="https://www.youtube.com/embed/FrJgMGzgvio?autoplay=1&mute=1&loop=1&playlist=FrJgMGzgvio&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100%] w-auto h-[56.25vw] [aspect-ratio:16/9] scale-150"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="초호쉼터 영상"
            style={{ border: "none" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/50" />

        {/* 콘텐츠 */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 pb-12">
          {/* 헤더 */}
          <div className="text-center animate-fade-in-up">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full text-sm md:text-base font-bold mb-6 tracking-wider shadow-lg">
              단체 전문 펜션
            </span>
            {/* 모바일용 */}
            <h1 className="md:hidden text-2xl font-light text-white mb-5 leading-relaxed">
              <span className="text-green-400 font-semibold">현대적인 시설</span>과 자연친화적인<br />
              공간에서 보내는<br />
              <span className="text-green-400 font-semibold">초호쉼터</span>의 특별한 경험
            </h1>
            {/* 데스크탑용 */}
            <h1 className="hidden md:block text-4xl lg:text-5xl font-light text-white mb-5 leading-tight">
              현대적인 시설과 자연친화적인 공간에서 보내는
              <br />
              <span className="text-green-400 font-semibold">초호쉼터</span>의 특별한 경험
            </h1>
            {/* 모바일용 부제목 */}
            <p className="md:hidden text-base text-gray-300 font-light tracking-wide leading-relaxed">
              30년 전통의 노하우로<br />
              완벽한 단체 프로그램을<br />
              제공합니다
            </p>
            {/* 데스크탑용 부제목 */}
            <p className="hidden md:block text-lg lg:text-xl text-gray-300 font-light tracking-wide">
              30년 전통의 노하우로 완벽한 단체 프로그램을 제공합니다
            </p>
          </div>
        </div>
      </section>

      {/* 예약 필수 안내사항 */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-r-lg">
            <h3 className="text-lg font-bold text-green-800 mb-3">예약 필수 안내사항</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span>📌</span>
                <span>예약금 30% 입금 시 예약확정</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📌</span>
                <span>입실 15:00 / 퇴실 11:00</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📌</span>
                <span>시간 미준수 시 시간당/인당 1만원 추가</span>
              </li>
            </ul>
            {/* 특별 경고 */}
            <div className="mt-4 bg-red-500 text-white p-3 md:p-4 rounded-lg">
              <p className="font-bold flex items-center gap-2 mb-1 md:mb-2 text-sm md:text-base">
                <span className="text-base md:text-xl">⚠️</span>
                <span>특별 주의사항</span>
              </p>
              <p className="font-medium text-xs md:text-base leading-relaxed">
                <span className="block">조기축구/운동동호회는 반드시 사전문의 필수</span>
                <span className="block">미고지 시 강제취소 및 예약금 미환불</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 상품별 탭 섹션 */}
      <ProductTabs />

      {/* 상품 비교표 */}
      <ComparisonTable />

      {/* 견적 계산기 */}
      <Calculator />

      {/* 환불 정책 */}
      <RefundPolicy />
    </div>
  );
}
