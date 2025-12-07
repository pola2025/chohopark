import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "이용 규칙",
  description: "초호쉼터 이용 규칙 안내. 원활한 이용을 위해 예약 전 필수 확인사항을 안내드립니다.",
};

const ICON_MAP: Record<string, React.ElementType> = {
  footprints: Footprints,
  speaker: Speaker,
  moon: Moon,
  wallet: Wallet,
  ban: Ban,
  "calendar-x": CalendarX,
};

export default function RulesPage() {
  return (
    <div className="pt-16">
      {/* 히어로 섹션 */}
      <section className="bg-amber-500 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            이용 규칙 안내
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            원활한 이용을 위해 아래 규칙을 반드시 확인해 주세요
          </p>
        </div>
      </section>

      {/* 규칙 섹션 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-12">
            <h2 className="text-xl font-bold text-red-800 mb-2">
              규칙 미준수 시 이용이 제한될 수 있습니다
            </h2>
            <p className="text-red-700">
              모든 이용객의 쾌적한 환경을 위해 규칙 준수를 부탁드립니다.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {RULES.map((rule) => {
              const IconComponent = ICON_MAP[rule.icon] || Ban;
              return (
                <div
                  key={rule.id}
                  className="p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white shadow-soft rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {rule.title}
                      </h3>
                      <p className="text-gray-600">{rule.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
