import type { Metadata } from "next";
import { AlertCircle, Info } from "lucide-react";
import { REFUND_POLICY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "환불 정책",
  description: "초호쉼터 예약 및 환불 정책 안내. 고객 취소 시, 사업자 취소 시 환불 기준을 안내드립니다.",
};

export default function RefundPage() {
  return (
    <div className="pt-16">
      {/* 히어로 섹션 */}
      <section className="bg-gray-900 text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
            REFUND POLICY
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            예약 및 환불 정책
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            투명하고 공정한 환불 정책을 안내드립니다
          </p>
        </div>
      </section>

      {/* 예약 안내 */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">예약 안내</h2>
            </div>
            <div className="bg-green-50 rounded-2xl p-6">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    1
                  </span>
                  예약금(총 금액의 30%)을 입금하시면 예약이 확정됩니다.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    2
                  </span>
                  잔금은 이용 당일 현장에서 결제해 주세요.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    3
                  </span>
                  현금, 카드, 계좌이체 모두 가능합니다.
                </li>
              </ul>
            </div>
          </div>

          {/* 주의사항 */}
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-16">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-bold text-red-800 mb-2">
                  인원 변경 안내
                </h3>
                <p className="text-red-700">
                  이용일 7일 이내에는 예약인원 변경이 불가합니다.
                  인원 변경은 반드시 7일 전까지 연락해 주세요.
                </p>
              </div>
            </div>
          </div>

          {/* 환불 규정 테이블 */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* 고객 취소 시 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                고객 취소 시 환불 기준
              </h3>
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        취소 시점
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                        환불율
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {REFUND_POLICY.customer.map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-gray-600">{row.period}</td>
                        <td className="px-6 py-4 text-right font-semibold text-gray-900">
                          {row.refund}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 사업자 취소 시 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                사업자 취소 시 배상 기준
              </h3>
              <div className="bg-gray-50 rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        취소 시점
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                        배상
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {REFUND_POLICY.business.map((row, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-gray-600">{row.period}</td>
                        <td className="px-6 py-4 text-right font-semibold text-gray-900">
                          {row.refund}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
