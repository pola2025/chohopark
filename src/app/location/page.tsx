import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Car, Bus } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "찾아오시는 길",
  description: "초호쉼터 오시는 길 안내. 경기도 파주시 법원읍 초리골길 134. 자가용, 대중교통 이용 방법을 안내드립니다.",
};

export default function LocationPage() {
  return (
    <div className="pt-16">
      {/* 히어로 섹션 */}
      <section className="bg-primary text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <MapPin className="w-16 h-16" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            찾아오시는 길
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {SITE_CONFIG.address}
          </p>
        </div>
      </section>

      {/* 지도 섹션 */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3156.5!2d126.85!3d37.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDUxJzAwLjAiTiAxMjbCsDUxJzAwLjAiRQ!5e0!3m2!1sko!2skr!4v1234567890"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="초호쉼터 위치"
            />
          </div>
        </div>
      </section>

      {/* 연락처 및 교통 안내 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* 연락처 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">연락처</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">주소</h4>
                    <p className="text-gray-600">{SITE_CONFIG.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">전화</h4>
                    <a
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="text-primary hover:underline font-semibold text-lg"
                    >
                      {SITE_CONFIG.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
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
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">문의 시간</h4>
                    <p className="text-gray-600">매일 09:00 ~ 21:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 교통 안내 */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">교통 안내</h2>
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Car className="w-6 h-6 text-primary" />
                    <h4 className="font-semibold text-gray-900">자가용 이용 시</h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      서울에서 약 1시간 소요
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      자유로 → 법원IC → 초리골길 방면
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      네비게이션: &quot;초호쉼터&quot; 검색
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Bus className="w-6 h-6 text-primary" />
                    <h4 className="font-semibold text-gray-900">대중교통 이용 시</h4>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      경의중앙선 문산역 하차
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      문산역에서 택시 약 15분 소요
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      단체 이용 시 버스 대절 가능 (별도 문의)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
