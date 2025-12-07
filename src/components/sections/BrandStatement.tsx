import { Bed, Coffee, Flame, Wine, GlassWater } from "lucide-react";

const INCLUDED_FEATURES = [
  {
    icon: Bed,
    label: "숙박",
    included: true,
  },
  {
    icon: Coffee,
    label: "조식",
    included: true,
  },
];

const UNLIMITED_FEATURES = [
  {
    icon: Flame,
    label: "바베큐",
  },
  {
    icon: Wine,
    label: "술",
  },
  {
    icon: GlassWater,
    label: "음료",
  },
];

export function BrandStatement() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <span className="inline-block text-emerald-400 text-sm font-semibold tracking-[0.2em] mb-4 uppercase">
          CHOHO SHELTER
        </span>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
          기업 워크샵의 새로운 기준,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
            올인클루전
          </span>
        </h2>

        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-4">
          단체 워크샵 전용 펜션
        </p>

        {/* 무한리필 강조 텍스트 */}
        <p className="text-lg md:text-2xl font-bold text-white mb-12">
          <span className="block md:inline">숙박·조식·바베큐·주류까지</span>
          <span className="block md:inline">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">무한리필</span>로 제공
          </span>
        </p>

        {/* 포함/무한리필 카드 컨테이너 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {/* 숙박, 조식 포함 */}
          <div className="flex flex-col items-center gap-4 bg-white/10 backdrop-blur-sm border-2 border-emerald-400/40 rounded-3xl px-8 py-8">
            <span className="px-5 py-2 bg-emerald-500 text-white text-base font-bold rounded-full">
              기본 포함
            </span>
            <div className="flex items-center justify-center gap-6">
              {INCLUDED_FEATURES.map((feature, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <span className="text-white font-semibold text-lg">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 바베큐, 술, 음료 무한리필 */}
          <div className="flex flex-col items-center gap-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border-2 border-amber-400/40 rounded-3xl px-8 py-8">
            <span className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-base font-bold rounded-full animate-pulse">
              무한리필
            </span>
            <div className="flex items-center justify-center gap-5">
              {UNLIMITED_FEATURES.map((feature, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-amber-400" />
                  </div>
                  <span className="text-white font-semibold text-lg">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
