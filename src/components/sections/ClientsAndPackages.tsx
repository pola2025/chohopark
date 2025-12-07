import Image from "next/image";
import Link from "next/link";
import { Building2, Rocket, Target, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PACKAGES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

const CUSTOMERS = [
  {
    icon: Building2,
    title: "대기업/중견기업",
    description: "50명 이상 대규모 워크샵",
  },
  {
    icon: Rocket,
    title: "스타트업/IT기업",
    description: "20~50명 팀 빌딩",
  },
  {
    icon: Target,
    title: "영업팀/부서 단위",
    description: "10~30명 소규모 행사",
  },
];

export function ClientsAndPackages() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* 배경 영상 */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none bg-black">
        <iframe
          src="https://www.youtube.com/embed/19tEvMrJu5U?autoplay=1&mute=1&loop=1&playlist=19tEvMrJu5U&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[100vw] min-h-[100%] w-auto h-[56.25vw] [aspect-ratio:16/9] scale-150"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="초호쉼터 부대시설 영상"
          style={{ border: 'none' }}
        />
      </div>
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== OUR CLIENTS 영역 ===== */}
        <div className="mb-24">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              OUR CLIENTS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              이미 많은 기업이 선택한
              <br />
              <span className="text-green-400">워크샵 명소</span>
            </h2>
          </div>

          {/* 고객 카드 */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {CUSTOMERS.map((customer, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors"
              >
                {/* 아이콘 */}
                <div className="w-16 h-16 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <customer.icon className="w-8 h-8 text-primary" />
                </div>

                {/* 텍스트 */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {customer.title}
                </h3>
                <p className="text-white/80">{customer.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PACKAGES 영역 ===== */}
        <div>
          {/* 헤더 */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
              PACKAGES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              단체 패키지 안내
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              목적에 맞는 최적의 패키지를 선택하세요
            </p>
          </div>

          {/* 패키지 카드 */}
          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* 이미지 */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pkg.thumbnail}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {pkg.isBest && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="accent" className="text-sm px-3 py-1">
                        BEST
                      </Badge>
                    </div>
                  )}
                </div>

                {/* 콘텐츠 */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {pkg.name}
                  </h3>

                  {/* 정보 */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-5 h-5 text-primary" />
                      <span>
                        {pkg.capacity.min}명 ~ {pkg.capacity.max}명
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5 text-primary" />
                      <span>
                        {pkg.schedule.checkIn} 입실 / {pkg.schedule.checkOut} 퇴실
                      </span>
                    </div>
                  </div>

                  {/* 가격 */}
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <span className="text-sm text-gray-500">1인</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatCurrency(pkg.pricePerPerson)}
                      </span>
                      <span className="text-gray-500">원</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="default"
                    className="w-full rounded-xl"
                    asChild
                  >
                    <Link href={`/booking?package=${pkg.slug}`}>예약 문의</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
