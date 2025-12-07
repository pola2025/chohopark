"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: "🔥",
    title: "참나무장작 훈연 바베큐 폭립",
    description: "6시간 훈연 프리미엄 폭립 무한리필",
    highlight: true,
  },
  {
    icon: "▣",
    title: "5,000평 천연잔디구장",
    description: "족구, 축구 등 다양한 야외 활동",
    highlight: false,
  },
  {
    icon: "◉",
    title: "카페 30% 할인",
    description: "초리골164 카페 음료 특별 할인",
    highlight: false,
  },
];

export function Hero() {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-28 pb-16">
      {/* 배경 영상 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black">
        <iframe
          src="https://www.youtube.com/embed/FrJgMGzgvio?autoplay=1&mute=1&loop=1&playlist=FrJgMGzgvio&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100%] w-auto h-[56.25vw] [aspect-ratio:16/9] scale-[2] sm:scale-150 lg:scale-125"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="초호쉼터 배경 영상"
          style={{ border: 'none' }}
        />
      </div>
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 콘텐츠 */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 메인 타이틀 그룹 */}
        <div className="inline-block bg-black/80 backdrop-blur-md rounded-2xl sm:rounded-3xl px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 mb-8 animate-fade-in-up max-w-full">
          <p className="text-white/90 text-sm md:text-base tracking-[3px] uppercase mb-3">
            Premium Group Pension
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4">
            워크샵 야유회 전문 <span className="text-[#a8e6cf] drop-shadow-[0_0_10px_rgba(168,230,207,0.8)] animate-pulse">단체펜션</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-semibold text-shadow">
            5,000평 규모 천연잔디구장과
            <br className="sm:hidden" />
            {" "}함께하는 특별한 단체행사
          </p>
        </div>

        {/* BBQ 이미지 쇼케이스 + 배너 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up delay-100">
          {/* BBQ 특별 배너 */}
          <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl p-6 shadow-xl overflow-hidden flex flex-col justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            <p className="relative text-lg md:text-xl font-extrabold mb-2 text-shadow">
              🔥 참나무장작
            </p>
            <p className="relative text-2xl md:text-3xl font-black mb-2">
              6시간 훈연
            </p>
            <p className="relative text-base font-semibold opacity-95">
              바베큐 폭립 무한리필
            </p>
          </div>

          {/* 이미지 1 */}
          <div className="relative h-48 md:h-auto md:min-h-[200px] rounded-2xl overflow-hidden shadow-xl group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bbq-ribs-1.webp"
              alt="참나무장작 훈연 바베큐 폭립"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-red-500/95 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
              참나무 훈연
            </div>
          </div>

          {/* 이미지 2 */}
          <div className="relative h-48 md:h-auto md:min-h-[200px] rounded-2xl overflow-hidden shadow-xl group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/bbq-ribs-2.webp"
              alt="훈연 바베큐 폭립 클로즈업"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4 bg-red-500/95 text-white px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm">
              무한리필
            </div>
          </div>
        </div>

        {/* 특징 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-fade-in-up delay-200">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-5 rounded-2xl backdrop-blur-md border transition-all hover:-translate-y-1 hover:shadow-lg ${
                feature.highlight
                  ? "bg-gradient-to-r from-red-50 to-red-100 border-red-300"
                  : "bg-white/95 border-white/30"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${
                  feature.highlight
                    ? "bg-gradient-to-br from-red-500 to-red-400 text-white"
                    : "bg-gradient-to-br from-[#2d5016] to-[#4a8b2e] text-white"
                }`}
              >
                {feature.icon}
              </div>
              <div className="text-left">
                <p
                  className={`font-bold text-base ${
                    feature.highlight ? "text-red-700" : "text-gray-900"
                  }`}
                >
                  {feature.title}
                </p>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="animate-fade-in-up delay-500">
          <Button
            variant="default"
            size="xl"
            className="bg-gradient-to-r from-[#2d5016] to-[#4a8b2e] hover:from-[#4a8b2e] hover:to-[#5ca33e] text-white rounded-full px-10 py-6 text-lg font-semibold shadow-xl"
            asChild
          >
            <Link href="/booking">지금 바로 예약하기 →</Link>
          </Button>
        </div>
      </div>

      {/* 스크롤 인디케이터 */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
        aria-label="아래로 스크롤"
      >
        <ChevronDown className="w-10 h-10" />
      </button>
    </section>
  );
}
