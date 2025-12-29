import { Clock, ChefHat } from "lucide-react";

const FEATURES = [
  {
    icon: ChefHat,
    number: "1",
    title: "전문가의 6시간 훈연 준비",
    description:
      "행사 담당자가 고기 굽느라 정작 중요한 팀 빌딩에 참여하지 못하는 일은 없어야 합니다. 초호쉼터는 6시간 참나무 훈연으로 완벽하게 준비한 바베큐를 제공합니다.",
    highlight: "걱정 없는 워크샵",
    highlightDesc: "담당자도 함께 즐기는 진짜 팀 빌딩\n전문가가 모든 식사를 책임집니다",
  },
  {
    icon: Clock,
    number: "2",
    title: "행사 일정에 맞춘 완벽한 타이밍",
    description:
      "워크샵 일정은 분 단위로 중요합니다. 초호쉼터는 귀사의 행사 스케줄에 맞춰 정확한 시간에 따뜻한 음식을 제공합니다. 조식부터 바베큐 디너까지 모든 식사가 계획대로 진행됩니다.",
    highlight: "맞춤형 식사 스케줄",
    highlightDesc: "워크샵 일정에 맞춘 식사 시간 조정\n지연 없는 완벽한 행사 진행 보장",
  },
];

export function MealService() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 인트로 */}
        <div className="text-center mb-8 p-8 md:p-12 bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl max-w-4xl mx-auto">
          <p className="text-gray-600 text-lg mb-4">
            워크샵 준비, 복잡한 견적, 식사준비,
            <br />
            행사 진행 단체 행사 담당자님들의
            <br />
            고민을 잘 알고 있습니다.
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 whitespace-nowrap">
            초호쉼터가 해결했습니다.
          </h2>
          <span className="inline-block px-6 py-3 bg-orange-100 text-orange-600 rounded-full text-lg font-semibold text-center">
            숙박부터 모든 식사까지
            <br />
            원스톱 올인클루전으로
          </span>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-16">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold text-gray-900 mb-4 whitespace-nowrap">
            워크샵 성공의 핵심, 완벽한 식사 준비
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            전문가의 6시간 훈연과 맞춤형 서비스로 모두가 만족하는 워크샵을 만들어드립니다
          </p>
        </div>

        {/* 카드 그리드 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="relative bg-gray-50 rounded-2xl border-2 border-gray-200 p-8 pt-12 hover:border-primary/50 hover:shadow-lg transition-all"
            >
              {/* 번호 배지 */}
              <div className="absolute -top-5 left-8 z-10 w-12 h-12 bg-gradient-to-br from-primary to-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-xl ring-4 ring-white">
                {feature.number}
              </div>

              {/* 아이콘 */}
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* 콘텐츠 */}
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* 하이라이트 박스 */}
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-primary rounded-lg">
                <p className="font-bold text-primary mb-1">{feature.highlight}</p>
                <p className="text-gray-600 text-sm whitespace-pre-line">{feature.highlightDesc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
