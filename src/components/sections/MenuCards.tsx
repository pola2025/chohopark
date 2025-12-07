import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MENUS } from "@/lib/constants";

const TAG_COLORS: Record<string, "accent" | "success" | "info"> = {
  orange: "accent",
  green: "success",
  blue: "info",
};

export function MenuCards() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-4">
            SIGNATURE MENU
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            6시간 훈연의 <span className="text-primary">특별한 맛</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            참나무 장작으로 정성껏 훈연한 바베큐를 무한리필로 즐기세요
          </p>
        </div>

        {/* 메뉴 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-8">
          {MENUS.map((menu) => (
            <div
              key={menu.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-2"
            >
              {/* 이미지 */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={menu.thumbnail}
                  alt={menu.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* 태그 배지 */}
                {menu.tag && (
                  <div className="absolute top-4 left-4">
                    <Badge variant={TAG_COLORS[menu.tagColor || "green"]}>
                      {menu.tag}
                    </Badge>
                  </div>
                )}
              </div>

              {/* 콘텐츠 */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {menu.name}
                </h3>
                <p className="text-gray-600 mb-4">{menu.description}</p>

                {/* 특징 리스트 */}
                <ul className="space-y-2">
                  {menu.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-500"
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
