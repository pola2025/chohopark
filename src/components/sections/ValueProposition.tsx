import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const BENEFITS = [
  "참나무장작 6시간 훈연 바베큐",
  "술/음료/바베큐 무한리필",
  "5,000평 천연잔디구장",
  "카페 음료 30% 할인",
];

export function ValueProposition() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* 배경 영상 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/UX_YOg1BoAE?autoplay=1&mute=1&loop=1&playlist=UX_YOg1BoAE&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100vh] w-[calc(100vh*16/9)] h-[calc(100vw*9/16)] scale-125"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="바베큐 영상"
          style={{ border: 'none' }}
        />
      </div>
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 서브타이틀 */}
          <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-6">
            ALL INCLUSIVE PACKAGE
          </span>

          {/* 가격 */}
          <div className="mb-8">
            <p className="text-white/70 text-lg mb-2">1인</p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
                {formatCurrency(99000)}
              </span>
              <span className="text-2xl md:text-3xl text-white/70">원</span>
            </div>
            <p className="text-white/50 mt-2">VAT 포함</p>
          </div>

          {/* 체크리스트 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {BENEFITS.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10"
              >
                <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/booking"
            className="relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white rounded-full overflow-hidden animate-[fire-glow_2s_ease-in-out_infinite]"
          >
            {/* 배경 그라디언트 - 불타는 효과 */}
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />
            {/* 빛나는 효과 - 이동하는 하이라이트 */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent animate-[shine_1.5s_ease-in-out_infinite]" />
            {/* 텍스트 */}
            <span className="relative drop-shadow-lg">단체 예약 특별 혜택 제공</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
