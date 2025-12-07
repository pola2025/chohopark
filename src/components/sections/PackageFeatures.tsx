import { Home, UtensilsCrossed, Beef, Wine } from "lucide-react";

const FEATURES = [
  {
    icon: Home,
    title: "단체 전용 숙박 시설",
    description: "10~80명까지 수용 가능한 넓은 숙박 공간",
  },
  {
    icon: UtensilsCrossed,
    title: "든든한 조식 제공",
    description: "아침부터 든든하게, 한식 조식 뷔페",
  },
  {
    icon: Beef,
    title: "3가지 훈연 바베큐",
    description: "등갈비, 삼겹살, 오리 무한리필",
  },
  {
    icon: Wine,
    title: "주류 & 음료 무한리필",
    description: "맥주, 소주, 음료수 제한 없이",
  },
];

export function PackageFeatures() {
  return (
    <section className="relative py-20 lg:py-28 text-white overflow-hidden">
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
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold mb-4">
            ALL INCLUSIVE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            완벽한 <span className="text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.6)]">올인클루전</span> 패키지
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            추가 비용 걱정 없이 모든 것이 포함된 패키지
          </p>
        </div>

        {/* 특징 그리드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-black/50 hover:border-green-500/30 transition-all duration-300"
            >
              {/* 아이콘 */}
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                <feature.icon className="w-7 h-7 text-green-400" />
              </div>

              {/* 텍스트 */}
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
