import type { Metadata } from "next";
import Image from "next/image";
import CafeGallery from "@/components/facilities/CafeGallery";
import FacilityGallery from "@/components/facilities/FacilityGallery";

export const metadata: Metadata = {
  title: "시설 안내",
  description: "초호쉼터의 시설을 소개합니다. 5,000평 대지, 세미나룸, 천연잔디구장, 베이커리 카페 등 워크샵에 필요한 모든 시설을 갖추고 있습니다.",
};

const FACILITIES_SHOWCASE = [
  {
    id: "cafe",
    name: "초리골164 베이커리 카페",
    description: "지브리 감성이 가득한 동화 속 분위기의 카페.\n거위와 토끼가 노니는 작은 호수를 바라보며\n여유로운 시간을 즐기실 수 있습니다.",
    highlight: "단체 고객 음료 30% 특별 할인",
    image: "/images/facilities/cafe.webp",
    badge: "SPECIAL",
    featured: true,
  },
  {
    id: "land",
    name: "5,000평 규모 대지",
    description: "단체 이용에 최적화된\n넓고 쾌적한 공간",
    image: "/images/facilities/land.webp",
    featured: false,
  },
  {
    id: "seminar",
    name: "100명 수용 세미나룸",
    description: "세미나, 실내행사,\n예배까지 가능한 다목적 홀",
    image: "/images/facilities/seminar.webp",
    featured: false,
  },
  {
    id: "history",
    name: "1995년부터 운영",
    description: "30년간 축적된 노하우로\n완벽한 워크샵 진행",
    image: "/images/facilities/tradition.webp",
    featured: false,
  },
  {
    id: "field",
    name: "천연잔디구장",
    description: "체육대회와 야외행사에\n최적화된 운동장",
    image: "/images/facilities/grass-field.webp",
    featured: false,
  },
  {
    id: "access",
    name: "서울에서 1시간",
    description: "경기도 파주시 법원읍\n뛰어난 접근성",
    image: "/images/facilities/access.webp",
    featured: false,
  },
];

// 갤러리 이미지 배열 생성
const ROOM_IMAGES = Array.from({ length: 12 }, (_, i) => `/images/facilities/room/${i + 1}.webp`);
const OUTDOOR_IMAGES = Array.from({ length: 13 }, (_, i) => `/images/facilities/outdoor/${i + 1}.webp`);
const INDOOR_IMAGES = Array.from({ length: 36 }, (_, i) => `/images/facilities/indoor/${i + 1}.webp`);

export default function FacilitiesPage() {
  return (
    <div className="pt-16">
      {/* 히어로 섹션 */}
      <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
        {/* 배경 영상 */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black">
          <iframe
            src="https://www.youtube.com/embed/FrJgMGzgvio?autoplay=1&mute=1&loop=1&playlist=FrJgMGzgvio&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100%] w-auto h-[56.25vw] [aspect-ratio:16/9] scale-150"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="초호쉼터 시설 영상"
            style={{ border: "none" }}
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />

        {/* 콘텐츠 */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-16">
          {/* 헤더 */}
          <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
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

          {/* 시설 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 animate-fade-in-up delay-300">
            {FACILITIES_SHOWCASE.map((facility) => (
              <div
                key={facility.id}
                className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative ${
                  facility.featured
                    ? "lg:col-span-2 lg:row-span-2"
                    : ""
                }`}
              >
                {/* 배지 */}
                {facility.badge && (
                  <div className="absolute top-4 right-4 z-10 px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-full shadow-lg">
                    {facility.badge}
                  </div>
                )}

                {/* 이미지 */}
                <div
                  className={`relative overflow-hidden ${
                    facility.featured ? "h-64 md:h-80 lg:h-[400px]" : "h-48 md:h-52"
                  }`}
                >
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* 콘텐츠 */}
                <div className={`p-6 ${facility.featured ? "md:p-8" : ""}`}>
                  <h3
                    className={`font-bold text-gray-900 mb-2 ${
                      facility.featured
                        ? "text-xl md:text-2xl"
                        : "text-lg md:text-xl"
                    }`}
                  >
                    {facility.name}
                  </h3>
                  <p
                    className={`text-gray-600 whitespace-pre-line leading-relaxed ${
                      facility.featured ? "text-base md:text-lg" : "text-sm md:text-base"
                    }`}
                  >
                    {facility.description}
                  </p>
                  {facility.highlight && (
                    <p className="mt-4 text-primary font-bold">
                      ✨ {facility.highlight}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 카페 갤러리 섹션 */}
      <CafeGallery />

      {/* 객실 갤러리 섹션 */}
      <FacilityGallery
        id="room-gallery"
        badge="ROOM GALLERY"
        title="편안하고 아늑한"
        titleHighlight="객실 공간"
        description="호수뷰 객실에서 자연과 함께 휴식할 수 있습니다"
        images={ROOM_IMAGES}
        bgColor="bg-white"
        accentColor="text-primary"
      />

      {/* 외부시설 갤러리 섹션 */}
      <FacilityGallery
        id="outdoor-gallery"
        badge="OUTDOOR FACILITIES"
        title="자연과 함께하는"
        titleHighlight="외부 시설"
        description="5,000평 대지에서 펼쳐지는 다양한 야외 활동 공간"
        images={OUTDOOR_IMAGES}
        bgColor="bg-gray-50"
        accentColor="text-primary"
      />

      {/* 내부시설 갤러리 섹션 */}
      <FacilityGallery
        id="indoor-gallery"
        badge="INDOOR FACILITIES"
        title="쾌적하고 편안한"
        titleHighlight="내부 시설"
        description="단체식사 공간 및 세미나룸에서 쾌적한 식사와 행사 진행이 가능합니다"
        images={INDOOR_IMAGES}
        bgColor="bg-white"
        accentColor="text-primary"
      />
    </div>
  );
}
