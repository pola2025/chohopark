"use client";

import { useState } from "react";

const PRODUCTS = [
  {
    id: "picnic",
    label: "당일 야유회",
    price: "66,000원",
    people: "30~200명",
    time: "10:00~17:00",
    stay: false,
    meals: "점심 1회",
    seminar: "시간당 11만원",
    recommend: "팀빌딩, 야외행사",
  },
  {
    id: "workshop",
    label: "1박2일 워크샵",
    price: "99,000원",
    people: "30~80명",
    time: "15:00~익일 11:00",
    stay: true,
    meals: "저녁 1회 + 아침 1회",
    seminar: "시간당 11만원",
    recommend: "기업 워크샵, MT",
  },
  {
    id: "training",
    label: "2박3일 수련회",
    price: "165,000원",
    people: "60~100명",
    time: "15:00~3일차 11:00",
    stay: true,
    meals: "저녁 2회 + 점심 1회 + 아침 2회",
    seminar: "포함 ✅",
    recommend: "대규모 연수, 교육",
  },
];

export default function ComparisonTable() {
  const [activeProduct, setActiveProduct] = useState("workshop");

  const currentProduct = PRODUCTS.find((p) => p.id === activeProduct)!;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl md:text-3xl font-bold text-green-800 text-center mb-6">
          📊 상품 한눈에 비교하기
        </h2>

        {/* 모바일: 탭 + 카드 구조 */}
        <div className="md:hidden">
          {/* 탭 버튼 */}
          <div className="grid grid-cols-3 gap-1 mb-4">
            {PRODUCTS.map((product) => (
              <button
                key={product.id}
                onClick={() => setActiveProduct(product.id)}
                className={`px-2 py-2.5 rounded-lg font-semibold text-[11px] transition-all ${
                  activeProduct === product.id
                    ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 border border-gray-200"
                }`}
              >
                {product.label}
              </button>
            ))}
          </div>

          {/* 카드 */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl shadow-md border border-green-100 p-4">
            <h3 className="text-lg font-bold text-green-800 mb-4 text-center">
              {currentProduct.label}
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm">가격(1인)</span>
                <span className="font-bold text-green-700">{currentProduct.price}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm">인원</span>
                <span className="font-semibold text-gray-800">{currentProduct.people}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm">이용시간</span>
                <span className="font-semibold text-gray-800 text-right text-sm">{currentProduct.time}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm">숙박</span>
                <span className={`font-bold ${currentProduct.stay ? "text-green-600" : "text-red-500"}`}>
                  {currentProduct.stay ? "✅ 포함" : "❌ 미포함"}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm">식사</span>
                <span className="font-semibold text-gray-800 text-right text-xs">{currentProduct.meals}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm">세미나룸</span>
                <span className={`font-semibold text-sm ${currentProduct.seminar.includes("포함") ? "text-green-600" : "text-gray-800"}`}>
                  {currentProduct.seminar}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm">추천 용도</span>
                <span className="font-semibold text-green-700 text-right text-xs">{currentProduct.recommend}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 데스크탑: 기존 테이블 유지 */}
        <div className="hidden md:block">
          <div className="overflow-x-auto rounded-xl shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 text-center font-semibold">
                    구분
                  </th>
                  <th className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 text-center font-semibold">
                    당일 야유회
                  </th>
                  <th className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 text-center font-semibold">
                    1박2일 워크샵
                  </th>
                  <th className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 text-center font-semibold">
                    2박3일 수련회
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="bg-gray-100 p-4 font-semibold text-gray-700 border border-gray-200">
                    가격(1인)
                  </td>
                  <td className="p-4 text-center border border-gray-200">66,000원</td>
                  <td className="p-4 text-center border border-gray-200">99,000원</td>
                  <td className="p-4 text-center border border-gray-200">165,000원</td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="bg-gray-100 p-4 font-semibold text-gray-700 border border-gray-200">
                    인원
                  </td>
                  <td className="p-4 text-center border border-gray-200">30~200명</td>
                  <td className="p-4 text-center border border-gray-200">30~80명</td>
                  <td className="p-4 text-center border border-gray-200">60~100명</td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="bg-gray-100 p-4 font-semibold text-gray-700 border border-gray-200">
                    이용시간
                  </td>
                  <td className="p-4 text-center border border-gray-200">10:00~17:00</td>
                  <td className="p-4 text-center border border-gray-200">15:00~익일 11:00</td>
                  <td className="p-4 text-center border border-gray-200">15:00~3일차 11:00</td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="bg-gray-100 p-4 font-semibold text-gray-700 border border-gray-200">
                    숙박
                  </td>
                  <td className="p-4 text-center border border-gray-200">
                    <span className="text-red-500 font-bold">❌</span>
                  </td>
                  <td className="p-4 text-center border border-gray-200">
                    <span className="text-green-600 font-bold">✅</span>
                  </td>
                  <td className="p-4 text-center border border-gray-200">
                    <span className="text-green-600 font-bold">✅</span>
                  </td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="bg-gray-100 p-4 font-semibold text-gray-700 border border-gray-200">
                    식사
                  </td>
                  <td className="p-4 text-center border border-gray-200 text-sm">점심 1회</td>
                  <td className="p-4 text-center border border-gray-200 text-sm">저녁 1회 + 아침 1회</td>
                  <td className="p-4 text-center border border-gray-200 text-sm">저녁 2회 + 점심 1회 + 아침 2회</td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="bg-gray-100 p-4 font-semibold text-gray-700 border border-gray-200">
                    세미나룸
                  </td>
                  <td className="p-4 text-center border border-gray-200 text-sm">시간당 11만원</td>
                  <td className="p-4 text-center border border-gray-200 text-sm">시간당 11만원</td>
                  <td className="p-4 text-center border border-gray-200">
                    <span className="text-green-600 font-bold">포함 ✅</span>
                  </td>
                </tr>
                <tr className="hover:bg-green-50 transition-colors">
                  <td className="bg-gray-100 p-4 font-semibold text-gray-700 border border-gray-200">
                    추천 용도
                  </td>
                  <td className="p-4 text-center border border-gray-200 text-sm">팀빌딩, 야외행사</td>
                  <td className="p-4 text-center border border-gray-200 text-sm">기업 워크샵, MT</td>
                  <td className="p-4 text-center border border-gray-200 text-sm">대규모 연수, 교육</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
