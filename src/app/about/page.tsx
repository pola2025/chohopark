import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Phone, Mail, Users, Trees, Utensils } from "lucide-react";
import { SITE_CONFIG, BUSINESS_INFO } from "@/lib/constants";

export const metadata: Metadata = {
  title: "초호쉼터 소개",
  description: "기업 워크샵, 야유회, 단체행사 전문 펜션. 5,000평 천연잔디구장과 함께하는 특별한 단체행사를 제공합니다.",
};

const FEATURES = [
  {
    icon: Users,
    title: "10~200명 수용",
    description: "소규모부터 대규모까지 모든 단체행사 가능",
  },
  {
    icon: Trees,
    title: "5,000평 잔디구장",
    description: "넓은 천연잔디에서 다양한 활동 진행",
  },
  {
    icon: Utensils,
    title: "올인클루전 패키지",
    description: "숙박, 식사, 주류까지 모두 포함",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* 히어로 섹션 */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/about-hero.webp')" }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            ABOUT US
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-lg">
            초호쉼터
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto text-shadow">
            기업 워크샵, 야유회, 단체행사 전문 펜션
          </p>
        </div>
      </section>

      {/* 소개 섹션 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-6">
                CHOHO SHELTER
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                기업 워크샵의 새로운 기준을
                <br />
                <span className="text-primary">제시합니다</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                초호쉼터는 기업 워크샵, 야유회, 단체행사를 위한 전문 펜션입니다.
                5,000평 규모의 천연잔디구장과 완벽한 시설, 그리고 올인클루전 패키지로
                잊지 못할 단체행사를 만들어 드립니다.
              </p>
              <p className="text-gray-600 leading-relaxed">
                참나무 장작으로 6시간 훈연한 바베큐, 주류와 음료 무한리필, 편안한 숙박 시설까지.
                추가 비용 걱정 없이 모든 것이 포함된 패키지로 편안한 워크샵을 경험하세요.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-elevated">
              <Image
                src="/images/about-intro.webp"
                alt="초호쉼터 전경"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              왜 <span className="text-primary">초호쉼터</span>인가요?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-elevated transition-shadow text-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 연락처 섹션 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              오시는 길
            </h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">주소</h4>
                  <p className="text-gray-600">{SITE_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">전화</h4>
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="text-primary hover:underline"
                  >
                    {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">이메일</h4>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="text-primary hover:underline"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 사업자 정보 */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {BUSINESS_INFO.map((info) => (
              <div
                key={info.name}
                className="bg-gray-50 rounded-xl p-6 text-center"
              >
                <h4 className="font-bold text-gray-900 mb-2">{info.name}</h4>
                <p className="text-sm text-gray-500">
                  사업자번호: {info.registrationNumber}
                </p>
                <p className="text-sm text-gray-500">대표: {info.representative}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
