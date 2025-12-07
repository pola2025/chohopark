import {
  AlertTriangle,
  Footprints,
  Speaker,
  Moon,
  Wallet,
  Ban,
  CalendarX,
} from "lucide-react";
import { RULES } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  footprints: Footprints,
  speaker: Speaker,
  moon: Moon,
  wallet: Wallet,
  ban: Ban,
  "calendar-x": CalendarX,
};

export function Rules() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 경고 배너 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-12 flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-amber-800 mb-1">
              예약 전 필수 확인사항
            </h3>
            <p className="text-amber-700">
              원활한 이용을 위해 아래 규칙을 반드시 확인해 주세요.
              규칙 미준수 시 이용이 제한될 수 있습니다.
            </p>
          </div>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            이용 준수사항
          </h2>
        </div>

        {/* 규칙 카드 그리드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RULES.map((rule) => {
            const IconComponent = ICON_MAP[rule.icon] || Ban;
            return (
              <div
                key={rule.id}
                className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
              >
                {/* 아이콘 */}
                <div className="w-12 h-12 bg-white shadow-soft rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>

                {/* 텍스트 */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {rule.title}
                </h3>
                <p className="text-gray-600 text-sm">{rule.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
