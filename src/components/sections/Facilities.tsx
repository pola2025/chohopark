import Image from "next/image";
import { Car, Presentation, Trees } from "lucide-react";
import { FACILITIES } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  car: Car,
  presentation: Presentation,
  trees: Trees,
};

export function Facilities() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            FACILITIES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            기업워크샵 <span className="text-primary">부대시설</span>
          </h2>
        </div>

        {/* 시설 카드 */}
        <div className="grid md:grid-cols-3 gap-8">
          {FACILITIES.map((facility) => {
            const IconComponent = ICON_MAP[facility.icon] || Trees;
            return (
              <div
                key={facility.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                {/* 이미지 */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={facility.thumbnail}
                    alt={facility.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* 아이콘 오버레이 */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white shadow-lg rounded-xl flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* 콘텐츠 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{facility.description}</p>

                  {/* 특징 리스트 */}
                  <ul className="space-y-2">
                    {facility.features.map((feature, index) => (
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
