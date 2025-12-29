"use client";

import { useState } from "react";
import Image from "next/image";

const TABS = [
  { id: "workshop", label: "1박2일 워크샵" },
  { id: "picnic", label: "당일 야유회" },
  { id: "training", label: "2박3일 수련회" },
  { id: "options", label: "추가옵션" },
];

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState("workshop");

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 탭 버튼 - 모바일 2x2 그리드 */}
        <div className="mb-6 md:mb-8">
          {/* 모바일: 2x2 그리드 */}
          <div className="grid grid-cols-2 gap-2 md:hidden">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-3 rounded-xl font-semibold text-xs transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg"
                    : "bg-white text-gray-600 border-2 border-gray-200 active:scale-95"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {/* 데스크탑: 가로 배열 */}
          <div className="hidden md:flex gap-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-xl font-semibold text-base transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 border-2 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-lg p-6 md:p-8">
          {activeTab === "workshop" && <WorkshopContent />}
          {activeTab === "picnic" && <PicnicContent />}
          {activeTab === "training" && <TrainingContent />}
          {activeTab === "options" && <OptionsContent />}
        </div>
      </div>
    </section>
  );
}

// 1박2일 워크샵
function WorkshopContent() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
        <span>💼</span> 1박2일 기업 워크샵
      </h2>

      {/* 가격 정보 */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl mb-6 border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4">💰 가격정보</h3>
        <div className="grid gap-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">성인</span>
            <strong className="text-green-700 text-lg">99,000원/인 <span className="text-sm font-normal">(VAT포함)</span></strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">어린이 <span className="text-sm text-gray-500">(36개월~중학생)</span></span>
            <strong className="text-green-700 text-lg">66,000원/인 <span className="text-sm font-normal">(VAT포함)</span></strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">최소인원 / 최대인원</span>
            <strong className="text-green-700 text-lg">30명 / 80명</strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">세미나룸</span>
            <strong className="text-green-700 text-lg">시간당 11만원</strong>
          </div>
        </div>
      </div>

      {/* 일정표 */}
      <div className="bg-gray-50 p-4 md:p-6 rounded-xl mb-6">
        <h3 className="text-base md:text-xl font-bold text-gray-800 mb-3 md:mb-4">📅 일정표</h3>

        <div className="mb-4 md:mb-6">
          <h4 className="text-green-700 font-semibold mb-2 md:mb-3 text-sm md:text-base">[1일차]</h4>
          <div className="space-y-2">
            <div className="flex bg-white p-2 md:p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[80px] md:min-w-[120px] text-xs md:text-base">15:00</span>
              <span className="text-gray-700 text-xs md:text-base">입실 (전 시설 이용불가)</span>
            </div>
            <div className="flex bg-white p-2 md:p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[80px] md:min-w-[120px] text-xs md:text-base">18:30~21:30</span>
              <span className="text-gray-700 text-xs md:text-base">저녁식사 <span className="text-gray-500 text-[10px] md:text-sm">※ 21:30 이후 야외음주 제한</span></span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-green-700 font-semibold mb-2 md:mb-3 text-sm md:text-base">[2일차]</h4>
          <div className="space-y-2">
            <div className="flex bg-white p-2 md:p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[80px] md:min-w-[120px] text-xs md:text-base">08:30~10:00</span>
              <span className="text-gray-700 text-xs md:text-base">아침식사</span>
            </div>
            <div className="flex bg-white p-2 md:p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[80px] md:min-w-[120px] text-xs md:text-base">11:00</span>
              <span className="text-gray-700 text-xs md:text-base">퇴실</span>
            </div>
          </div>
        </div>
      </div>

      {/* 식사 메뉴 */}
      <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 flex-wrap">
          <span>🍖</span> 저녁식사 (18:30~21:30)
          <span className="text-primary">- 무한리필</span>
        </h3>

        {/* 폭립 강조 */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 rounded-xl mb-4 text-white">
          <h4 className="text-center font-bold text-lg mb-3">🔥 통나무 6시간 훈연 바베큐 폭립 무한리필 🔥</h4>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative h-32 md:h-40 rounded-lg overflow-hidden">
              <Image src="/images/menu/ribs.webp" alt="훈연 바베큐 폭립" fill className="object-cover" />
            </div>
            <div className="relative h-32 md:h-40 rounded-lg overflow-hidden">
              <Image src="/images/menu/pork.webp" alt="삼겹살 바베큐" fill className="object-cover" />
            </div>
          </div>
          <p className="text-center text-sm md:text-base">
            진짜 통나무로 6시간 정성껏 훈연한 프리미엄 돼지 폭립!<br />
            부드럽고 촉촉한 육질, 깊은 훈연향이 일품입니다
          </p>
        </div>

        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><span>•</span> 삼겹살/목살</li>
          <li className="flex items-center gap-2"><span>•</span> 오리훈제 바베큐</li>
          <li className="flex items-center gap-2"><span>•</span> 새우, 계란찜, 치즈</li>
          <li className="flex items-center gap-2"><span>•</span> 쌈채소</li>
          <li className="flex items-center gap-2"><span>•</span> 계절 특별메뉴 (여름: 오이냉국 / 겨울: 오뎅탕)</li>
          <li className="flex items-center gap-2"><span>•</span> 기본 반찬류</li>
          <li className="flex items-center gap-2 font-semibold text-green-700"><span>•</span> 술, 음료 제공</li>
        </ul>
      </div>

      <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🍲</span> 아침식사 (08:30~10:00)
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><span>•</span> 해장국 (소고기무국 등)</li>
          <li className="flex items-center gap-2"><span>•</span> 기본 반찬류</li>
        </ul>
      </div>

      {/* 시설 정보 */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-green-800 mb-4">🏠 객실 정보</h3>
        <ul className="space-y-2 text-gray-700 mb-6">
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 15평 복층 구조</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 치약, 비누, 샴푸 제공</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 수건 4장 제공</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 개인용품 지참 (면도기, 칫솔 등)</li>
        </ul>

        <h3 className="text-xl font-bold text-green-800 mb-4">⚽ 시설 이용</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 잔디구장: 20인 기준 1시간</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 족구/축구공 직접 준비</li>
          <li className="flex items-center gap-2 text-red-600 font-bold"><span>✗</span> 축구화 착용 금지</li>
        </ul>
      </div>
    </div>
  );
}

// 당일 야유회
function PicnicContent() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
        <span>🌳</span> 당일 야유회
      </h2>

      {/* 가격 정보 */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl mb-6 border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4">💰 가격정보</h3>
        <div className="grid gap-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">성인</span>
            <strong className="text-green-700 text-lg">66,000원/인 <span className="text-sm font-normal">(VAT포함)</span></strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">어린이 <span className="text-sm text-gray-500">(만4세~중학생)</span></span>
            <strong className="text-green-700 text-lg">44,000원/인 <span className="text-sm font-normal">(VAT포함)</span></strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">최소인원 / 최대인원</span>
            <strong className="text-green-700 text-lg">30명 / 200명</strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-red-50 p-4 rounded-lg border-l-4 border-red-500 gap-1">
            <span className="text-gray-700">숙박</span>
            <strong className="text-red-600 text-lg">불포함 ❌</strong>
          </div>
        </div>
      </div>

      {/* 일정표 */}
      <div className="bg-gray-50 p-6 rounded-xl mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">⏰ 당일 일정표</h3>
        <div className="space-y-2">
          <div className="flex bg-white p-3 rounded-lg">
            <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">10:00</span>
            <span className="text-gray-700">시설 이용 시작</span>
          </div>
          <div className="flex bg-white p-3 rounded-lg">
            <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">12:30~13:30</span>
            <span className="text-gray-700">점심 BBQ</span>
          </div>
          <div className="flex bg-red-50 p-3 rounded-lg">
            <span className="font-bold text-red-600 min-w-[100px] md:min-w-[120px]">17:00</span>
            <span className="text-red-600 font-bold">이용 종료 (시간엄수!)</span>
          </div>
        </div>
      </div>

      {/* 점심 메뉴 */}
      <div className="border-2 border-gray-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>🍖</span> 점심 BBQ 메뉴 (12:30~13:30)
        </h3>

        {/* 폭립 강조 */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-5 rounded-xl mb-4 text-white">
          <h4 className="text-center font-bold text-lg mb-3">🔥 통나무 6시간 훈연 바베큐 폭립 제공 🔥</h4>
          <p className="text-center text-sm">
            진짜 통나무로 6시간 정성껏 훈연한 프리미엄 돼지 폭립!
          </p>
        </div>

        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><span>•</span> 돼지고기 바베큐</li>
          <li className="flex items-center gap-2"><span>•</span> 오리훈제</li>
          <li className="flex items-center gap-2"><span>•</span> 김치전</li>
          <li className="flex items-center gap-2"><span>•</span> 두부김치</li>
          <li className="flex items-center gap-2"><span>•</span> 소고기무국</li>
          <li className="flex items-center gap-2 font-semibold text-green-700"><span>•</span> 술, 음료, 밥 제공</li>
          <li className="flex items-center gap-2"><span>•</span> 기본 반찬류</li>
        </ul>
      </div>

      {/* 시설 이용 규정 */}
      <div className="bg-gray-50 p-6 rounded-xl mb-6">
        <h3 className="text-xl font-bold text-green-800 mb-4">🏃 시설 이용 규정</h3>
        <ul className="space-y-2 text-gray-700 mb-4">
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 잔디운동장: 30인 기준 1시간</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 세미나룸: 시간당 11만원</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 족구/축구공 직접 준비</li>
          <li className="flex items-center gap-2 text-red-600 font-bold"><span>✗</span> 축구화 착용 금지</li>
        </ul>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-red-600 font-bold">⚠️ 이용시간 17:00 절대 준수</p>
          <p className="text-gray-600 text-sm">추가시간 사용은 개별문의</p>
        </div>
      </div>

      {/* 우천시 안내 */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-400 p-5 rounded-xl border-2 border-amber-500">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span>🌧️</span> 우천시 주의사항
        </h3>
        <div className="bg-white/90 p-4 rounded-lg">
          <p className="text-red-600 font-bold mb-2">⛔ 우천시 운동장 이용 불가</p>
          <ul className="text-gray-700 text-sm space-y-1">
            <li>• 실내 세미나룸으로 대체</li>
            <li>• 야외 체육활동 진행 불가</li>
            <li>• 우천 예보시 실내프로그램 사전 준비 권장</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// 2박3일 수련회
function TrainingContent() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 flex items-center gap-2">
        <span>🏕️</span> 2박3일 수련회
      </h2>

      {/* 가격 정보 */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl mb-6 border border-green-200">
        <h3 className="text-xl font-bold text-green-800 mb-4">💰 가격정보</h3>
        <div className="grid gap-3">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">1인당</span>
            <strong className="text-green-700 text-lg">165,000원 <span className="text-sm font-normal">(VAT포함)</span></strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">최소예약금액</span>
            <strong className="text-green-700 text-lg">9,900,000원</strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-white p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">인원</span>
            <strong className="text-green-700 text-lg">60명 ~ 100명</strong>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-green-100 p-4 rounded-lg border-l-4 border-green-600 gap-1">
            <span className="text-gray-700">세미나룸</span>
            <strong className="text-green-700 text-lg">사용 포함 ✅</strong>
          </div>
        </div>
      </div>

      {/* 일정표 */}
      <div className="bg-gray-50 p-6 rounded-xl mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📅 3일 일정표</h3>

        <div className="mb-6">
          <h4 className="text-green-700 font-semibold mb-3">[1일차]</h4>
          <div className="space-y-2">
            <div className="flex bg-white p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">15:00</span>
              <span className="text-gray-700">입실 (전 시설 이용불가)</span>
            </div>
            <div className="flex bg-white p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">18:30~21:30</span>
              <span className="text-gray-700">저녁식사 (무한리필 or 닭도리탕)</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-green-700 font-semibold mb-3">[2일차]</h4>
          <div className="space-y-2">
            <div className="flex bg-white p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">08:30~10:00</span>
              <span className="text-gray-700">아침식사</span>
            </div>
            <div className="flex bg-white p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">12:00~13:30</span>
              <span className="text-gray-700">점심식사</span>
            </div>
            <div className="flex bg-white p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">18:30~21:30</span>
              <span className="text-gray-700">저녁식사 (무한리필 or 닭도리탕)</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-green-700 font-semibold mb-3">[3일차]</h4>
          <div className="space-y-2">
            <div className="flex bg-white p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">08:30~10:00</span>
              <span className="text-gray-700">아침식사</span>
            </div>
            <div className="flex bg-white p-3 rounded-lg">
              <span className="font-bold text-green-600 min-w-[100px] md:min-w-[120px]">11:00</span>
              <span className="text-gray-700">퇴실</span>
            </div>
          </div>
        </div>
      </div>

      {/* 식사 안내 */}
      <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🍽️ 식사 안내</h3>

        <div className="bg-yellow-100 p-4 rounded-lg mb-4 border border-yellow-300">
          <p className="font-bold text-gray-800">⭐ 저녁 2회 제공 (택1씩)</p>
          <p className="text-gray-700 text-sm mt-1">
            • 무한리필 1회 + 닭도리탕 1회<br />
            • 첫날 무한리필 선택 시 → 둘째날은 닭도리탕
          </p>
        </div>

        <div className="mb-4">
          <h4 className="text-green-700 font-semibold mb-2">[무한리필 메뉴]</h4>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>• 삼겹살/목살, 오리훈제 바베큐, 폭립</li>
            <li>• 새우, 계란찜, 치즈, 쌈채소</li>
            <li>• 기본 반찬류</li>
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-green-700 font-semibold mb-2">[닭도리탕 메뉴]</h4>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>• 닭도리탕 + 기본 반찬류</li>
          </ul>
        </div>

        <div>
          <h4 className="text-green-700 font-semibold mb-2">[아침 메뉴]</h4>
          <ul className="space-y-1 text-gray-700 text-sm">
            <li>• 백반스타일 아침식사</li>
            <li>• 따뜻한 국 + 기본 반찬</li>
          </ul>
        </div>
      </div>

      {/* 객실 정보 */}
      <div className="bg-gray-50 p-6 rounded-xl">
        <h3 className="text-xl font-bold text-green-800 mb-4">🏠 객실 정보</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 15평 복층 구조</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 최대 10명/객실</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 치약, 비누, 샴푸 제공</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 수건 4장 제공</li>
          <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 개인용품 지참 (면도기, 칫솔 등)</li>
        </ul>
      </div>
    </div>
  );
}

// 추가옵션 서비스
function OptionsContent() {
  return (
    <div className="animate-fade-in">
      <h2 className="text-xl md:text-3xl font-bold text-green-800 mb-4 md:mb-6 flex items-center gap-2">
        <span>🎯</span> 추가옵션 서비스
      </h2>

      {/* 명랑운동회 */}
      <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 md:p-6 rounded-xl mb-6 md:mb-8 border-2 border-orange-300">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 md:mb-6 gap-3">
          <h3 className="text-base md:text-2xl font-bold text-orange-700 flex items-center gap-2 flex-wrap">
            <span>🏃</span>
            <span className="whitespace-nowrap">명랑운동회</span>
            <span className="text-sm md:text-xl font-medium">- 체육대회 전문 진행</span>
          </h3>
          <a href="tel:010-6437-1863" className="bg-orange-500 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full font-bold text-center text-sm md:text-base hover:bg-orange-600 transition-colors shrink-0">
            📞 010-6437-1863
          </a>
        </div>

        {/* 가격 정보 */}
        <div className="bg-white p-3 md:p-5 rounded-xl mb-4 md:mb-6">
          <h4 className="text-orange-700 font-bold mb-3 md:mb-4 text-sm md:text-base">💰 가격 안내</h4>
          <div className="grid gap-2 md:gap-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2.5 md:p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500 gap-1">
              <span className="text-sm md:text-base">50~59인</span>
              <strong className="text-orange-600 text-sm md:text-base">66만원 (2시간/VAT포함)</strong>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2.5 md:p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500 gap-1">
              <span className="text-sm md:text-base">100인</span>
              <strong className="text-orange-600 text-sm md:text-base">110만원 (2시간/VAT포함)</strong>
            </div>
            <div className="flex justify-between items-center p-2.5 md:p-3 bg-gray-50 rounded-lg border-l-4 border-orange-500">
              <span className="text-sm md:text-base">최소인원</span>
              <strong className="text-sm md:text-base">50명</strong>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2.5 md:p-3 bg-green-50 rounded-lg border-l-4 border-green-500 gap-1">
              <span className="text-sm md:text-base">특전</span>
              <strong className="text-green-600 text-sm md:text-base">행사현수막 무료제작 포함</strong>
            </div>
          </div>
          <p className="text-gray-500 text-xs md:text-sm mt-2 md:mt-3">
            ※ 인원추가 및 시간추가, 진행종목 선택은 개별상담 후 안내
          </p>
        </div>

        {/* 프로그램 구성 */}
        <div className="bg-white p-3 md:p-5 rounded-xl mb-4 md:mb-6">
          <h4 className="text-orange-700 font-bold mb-3 md:mb-4 text-sm md:text-base">📋 프로그램 구성 (2시간)</h4>

          <div className="mb-3 md:mb-4">
            <div className="bg-orange-50 p-2.5 md:p-3 rounded-lg border-l-4 border-orange-500 mb-2 md:mb-3">
              <strong className="text-xs md:text-base">[오프닝] 준비운동 - 10분</strong>
            </div>
          </div>

          <div className="mb-3 md:mb-4">
            <div className="bg-orange-50 p-2.5 md:p-3 rounded-lg border-l-4 border-orange-500 mb-2 md:mb-3">
              <strong className="text-xs md:text-base">[메인 종목] 운동회 - 변경 가능</strong>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2">
              {[
                { name: "특급열차", time: "10분", desc: "단체 줄넘기, 굴렁쇠 활용" },
                { name: "지네발", time: "10분", desc: "팀원 발 고정 릴레이" },
                { name: "오리발달리기", time: "10분", desc: "오리발 신고 릴레이" },
                { name: "낙하산달리기", time: "10분", desc: "낙하산 메고 달리기" },
                { name: "신발양궁", time: "15분", desc: "신발로 과녁 맞추기" },
                { name: "판뒤집기", time: "20분", desc: "팀별 판 뒤집기 게임" },
                { name: "공굴리기", time: "10분", desc: "큰 공 굴려 릴레이" },
                { name: "협동제기차기", time: "10분", desc: "8명이 줄 잡고 제기차기" },
                { name: "에어봉릴레이", time: "10분", desc: "대형봉 다리 끼고 달리기" },
                { name: "계주", time: "10분", desc: "직급별 릴레이 경기" },
              ].map((game, idx) => (
                <div key={idx} className="bg-gray-50 p-2 md:p-3 rounded-lg">
                  <div className="text-xs md:text-sm">
                    <strong className="text-orange-600">{game.name}</strong>
                    <span className="text-gray-500 text-[10px] md:text-xs ml-1">({game.time})</span>
                  </div>
                  <span className="text-gray-500 text-[10px] md:text-xs hidden md:block">{game.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-orange-50 p-2.5 md:p-3 rounded-lg border-l-4 border-orange-500 mb-2 md:mb-3">
              <strong className="text-xs md:text-base">[클로징] 시상식 - 10분</strong>
            </div>
            <ul className="text-gray-600 text-xs md:text-sm space-y-1 pl-3 md:pl-4">
              <li>• 종합 1, 2위 시상</li>
              <li>• MVP 2명 시상</li>
              <li>• 개인 시상</li>
            </ul>
          </div>
        </div>

        {/* 포함사항 */}
        <div className="bg-white p-3 md:p-5 rounded-xl mb-4 md:mb-6">
          <h4 className="text-orange-700 font-bold mb-3 md:mb-4 text-sm md:text-base">✅ 포함사항</h4>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
            <div className="bg-green-50 p-2.5 md:p-4 rounded-lg text-center font-semibold text-xs md:text-sm">전문 진행자</div>
            <div className="bg-green-50 p-2.5 md:p-4 rounded-lg text-center font-semibold text-xs md:text-sm">음향장비(앰프)</div>
            <div className="bg-green-50 p-2.5 md:p-4 rounded-lg text-center font-semibold text-xs md:text-sm">게임용품 일체</div>
            <div className="bg-yellow-50 p-2.5 md:p-4 rounded-lg text-center font-semibold text-xs md:text-sm col-span-2 md:col-span-1">우천시 실내 레크레이션 대체</div>
          </div>
        </div>

        {/* 주의사항 */}
        <div className="bg-yellow-50 p-3 md:p-4 rounded-lg border-2 border-yellow-400">
          <h4 className="text-orange-700 font-bold mb-2 text-sm md:text-base">⚠️ 명랑운동회 주의사항</h4>
          <ul className="text-gray-600 text-xs md:text-sm space-y-1">
            <li>• 행사 진행 시 부상위험이 있으므로 안전에 유의</li>
            <li>• 외부업체 이벤트 진행 시 사전 협의 필수</li>
            <li>• 협의 없이 진행 시 운동회/체육대회 진행 불가</li>
            <li className="text-orange-600 font-bold">• 반드시 전화문의 후 예약 (010-6437-1863)</li>
          </ul>
        </div>
      </div>

      {/* 기타 추가 서비스 */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
        <h3 className="text-base md:text-xl font-bold text-green-800 mb-4 md:mb-6 flex items-center gap-2">
          <span>🎪</span> 기타 추가 서비스
        </h3>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* 서바이벌 게임 */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-6 rounded-xl border-l-4 border-gray-600">
            <h4 className="text-gray-700 font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
              <span>🎯</span> 단체 출장 서바이벌게임
            </h4>
            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">팀워크 강화를 위한 서바이벌 게임</p>
            <ul className="text-gray-600 text-xs md:text-sm space-y-1 mb-3 md:mb-4">
              <li>• 전문 장비 제공</li>
              <li>• 안전 교육 포함</li>
              <li>• 팀별 대항전 가능</li>
            </ul>
            <a href="tel:010-6437-1863" className="block bg-gray-600 text-white text-center py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-gray-700 transition-colors">
              📞 문의: 010-6437-1863
            </a>
          </div>

          {/* 파주스피드파크 */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 md:p-6 rounded-xl border-l-4 border-amber-500">
            <h4 className="text-amber-700 font-bold mb-2 md:mb-3 flex items-center gap-2 text-sm md:text-base">
              <span>🏁</span> 파주스피드파크
            </h4>
            <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">짜릿한 레이싱 체험</p>
            <ul className="text-gray-600 text-xs md:text-sm space-y-1 mb-3 md:mb-4">
              <li>• 카트 레이싱</li>
              <li>• 단체 예약 가능</li>
              <li>• 초보자 교육 제공</li>
            </ul>
            <a href="tel:010-6437-1863" className="block bg-amber-500 text-white text-center py-2.5 md:py-3 rounded-lg font-semibold text-sm md:text-base hover:bg-amber-600 transition-colors">
              📞 문의: 010-6437-1863
            </a>
          </div>
        </div>

        <div className="bg-green-50 p-3 md:p-4 rounded-lg mt-4 md:mt-6 text-center">
          <p className="text-green-700 text-xs md:text-base">
            <strong>💡 TIP:</strong> 추가 서비스는 메인 상품과 함께 예약 시 더욱 알찬 행사가 가능합니다!
          </p>
        </div>
      </div>
    </div>
  );
}
