import { AlertCircle } from "lucide-react";
import { REFUND_POLICY } from "@/lib/constants";

export function RefundPolicy() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            예약 및 환불규정
          </h2>
        </div>

        {/* 예약 안내 */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">예약 안내</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              예약금(총 금액의 30%)을 입금하시면 예약이 확정됩니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              잔금은 이용 당일 현장에서 결제해 주세요.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
              현금, 카드, 계좌이체 모두 가능합니다.
            </li>
          </ul>
        </div>

        {/* 주의사항 박스 */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h4 className="text-lg font-bold text-red-800 mb-1">
              인원 변경 안내
            </h4>
            <p className="text-red-700">
              이용일 7일 이내에는 예약인원 변경이 불가합니다.
              인원 변경은 반드시 7일 전까지 연락해 주세요.
            </p>
          </div>
        </div>

        {/* 환불 규정 테이블 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* 고객 취소 시 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              고객 취소 시 환불 기준
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      취소 시점
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      환불율
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {REFUND_POLICY.customer.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.period}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
                        {row.refund}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 사업자 취소 시 */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              사업자 취소 시 배상 기준
            </h3>
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      취소 시점
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      배상
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {REFUND_POLICY.business.map((row, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {row.period}
                      </td>
                      <td className="px-4 py-3 text-sm text-right font-semibold text-gray-900">
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
  );
}
