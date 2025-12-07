import Link from "next/link";
import { Phone, MapPin, Mail, Copy } from "lucide-react";
import { SITE_CONFIG, BUSINESS_INFO, NAV_ITEMS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* 브랜드 정보 */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-bold text-white">
              초호쉼터
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              기업 워크샵, 야유회, 단체행사 전문 펜션
              <br />
              5,000평 천연잔디구장과 함께하는 특별한 단체행사
            </p>
            <div className="mt-6 space-y-3">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 text-green-400 hover:text-green-300 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span className="font-semibold text-lg">{SITE_CONFIG.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 text-sm hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{SITE_CONFIG.email}</span>
              </a>
            </div>
          </div>

          {/* 빠른 링크 */}
          <div>
            <h3 className="text-white font-semibold mb-4">바로가기</h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/guide/rules"
                  className="text-sm hover:text-white transition-colors"
                >
                  이용규칙
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/refund"
                  className="text-sm hover:text-white transition-colors"
                >
                  환불정책
                </Link>
              </li>
            </ul>
          </div>

          {/* 입금계좌 */}
          <div>
            <h3 className="text-white font-semibold mb-4">입금계좌</h3>
            <div className="bg-gray-800 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">
                {SITE_CONFIG.bankAccount.bank}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono text-lg">
                  {SITE_CONFIG.bankAccount.number}
                </span>
                <button
                  className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                  title="계좌번호 복사"
                  aria-label="계좌번호 복사"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                예금주: {SITE_CONFIG.bankAccount.holder}
              </p>
            </div>
          </div>

          {/* 사업자 정보 */}
          <div>
            <h3 className="text-white font-semibold mb-4">사업자 정보</h3>
            <div className="space-y-3 text-sm">
              {BUSINESS_INFO.map((info) => (
                <div key={info.name} className="text-gray-400">
                  <span className="text-gray-300 font-medium">{info.name}</span>
                  <br />
                  사업자번호: {info.registrationNumber}
                  <br />
                  대표: {info.representative}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} 초호쉼터. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
