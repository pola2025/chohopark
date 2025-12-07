"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const CAFE_IMAGES = Array.from({ length: 21 }, (_, i) => `/images/facilities/cafe/${i + 1}.webp`);
const MENU_IMAGE = "/images/facilities/cafe/menu.webp";

export default function CafeGallery() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [isMenuModal, setIsMenuModal] = useState(false);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAFE_IMAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const changeSlide = useCallback((direction: number) => {
    setCurrentSlide((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return CAFE_IMAGES.length - 1;
      if (newIndex >= CAFE_IMAGES.length) return 0;
      return newIndex;
    });
  }, []);

  const openModal = useCallback((index: number) => {
    setModalIndex(index);
    setIsMenuModal(false);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const openMenuModal = useCallback(() => {
    setIsMenuModal(true);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  const modalNav = useCallback((direction: number) => {
    if (isMenuModal) return;
    setModalIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return CAFE_IMAGES.length - 1;
      if (newIndex >= CAFE_IMAGES.length) return 0;
      return newIndex;
    });
  }, [isMenuModal]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) closeModal();
      if (e.key === "ArrowLeft" && isModalOpen && !isMenuModal) modalNav(-1);
      if (e.key === "ArrowRight" && isModalOpen && !isMenuModal) modalNav(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isMenuModal, closeModal, modalNav]);

  // 썸네일 인덱스 계산
  const getThumbnailIndices = () => {
    const prev = currentSlide === 0 ? CAFE_IMAGES.length - 1 : currentSlide - 1;
    const next = currentSlide === CAFE_IMAGES.length - 1 ? 0 : currentSlide + 1;
    return { prev, current: currentSlide, next };
  };

  const thumbIndices = getThumbnailIndices();

  return (
    <section id="cafe-gallery" className="py-16 md:py-20 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-5 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4 tracking-wide">
            CHORIGOL 164 CAFE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-gray-900 mb-4">
            지브리 감성 가득한
            <br className="md:hidden" />
            {" "}<strong className="font-normal text-amber-700">초리골164 베이커리카페</strong>
          </h2>
          <p className="text-gray-600 font-light">
            거위와 토끼가 노니는 작은 호수를 바라보며
            <br className="md:hidden" />
            {" "}여유로운 시간을 즐겨보세요
          </p>
        </div>

        {/* 특별 혜택 */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-6 md:p-8 mb-10 md:mb-12 text-center shadow-md">
          <h3 className="text-lg md:text-xl text-amber-800 font-semibold mb-3">
            ✨ 초호쉼터 단체예약 고객 특별 혜택
          </h3>
          <div className="text-3xl md:text-4xl text-orange-600 font-bold mb-2">30% 할인</div>
          <p className="text-gray-600">모든 음료 메뉴 적용</p>
          <p className="text-sm text-gray-500 mt-3 italic">* 베이커리 및 기타 상품 제외</p>
        </div>

        {/* 메뉴판 섹션 */}
        <div className="bg-white rounded-2xl p-6 md:p-8 mb-10 md:mb-12 shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-900">📋 메뉴판 확인</h3>
            <button
              onClick={openMenuModal}
              className="px-6 py-3 bg-amber-700 text-white rounded-full font-medium hover:bg-amber-800 transition-colors shadow-md"
            >
              메뉴 크게 보기
            </button>
          </div>
          <div className="relative max-w-3xl mx-auto cursor-pointer" onClick={openMenuModal}>
            <Image
              src={MENU_IMAGE}
              alt="초리골164 메뉴판"
              width={800}
              height={600}
              className="w-full rounded-lg shadow-md hover:shadow-lg transition-shadow"
            />
          </div>
          <div className="mt-4 bg-gray-50 border-l-4 border-amber-700 p-4 rounded-r-lg">
            <p className="text-amber-800 font-semibold">💡 단체 사전주문 가능</p>
            <p className="text-gray-600 text-sm mt-1">워크숍 및 단체 행사 시 미리 주문하시면 더욱 편리하게 이용하실 수 있습니다.</p>
          </div>
        </div>

        {/* 메인 갤러리 */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {CAFE_IMAGES.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="relative aspect-[16/9] md:aspect-[2/1]">
                  <Image
                    src={img}
                    alt={`카페 ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1200px"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 네비게이션 버튼 */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
            <button
              onClick={(e) => { e.stopPropagation(); changeSlide(-1); }}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all pointer-events-auto"
              aria-label="이전 이미지"
            >
              <svg className="w-5 h-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); changeSlide(1); }}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all pointer-events-auto"
              aria-label="다음 이미지"
            >
              <svg className="w-5 h-5 text-amber-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* 인디케이터 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {CAFE_IMAGES.slice(0, 11).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide % 11 ? "w-6 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`슬라이드 ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 3장 썸네일 프리뷰 - 데스크탑만 표시 */}
        <div className="hidden md:flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => changeSlide(-1)}
            className="w-8 h-8 bg-amber-700/90 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
            aria-label="이전"
          >
            ‹
          </button>

          <button
            onClick={() => goToSlide(thumbIndices.prev)}
            className="relative w-32 h-24 rounded-lg overflow-hidden opacity-60 hover:opacity-80 transition-opacity"
          >
            <Image src={CAFE_IMAGES[thumbIndices.prev]} alt="이전 이미지" fill className="object-cover" sizes="128px" />
          </button>

          <button
            onClick={() => openModal(thumbIndices.current)}
            className="relative w-56 h-40 rounded-xl overflow-hidden ring-2 ring-amber-700 shadow-lg"
          >
            <Image src={CAFE_IMAGES[thumbIndices.current]} alt="현재 이미지" fill className="object-cover" sizes="224px" />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {currentSlide + 1} / {CAFE_IMAGES.length}
            </div>
          </button>

          <button
            onClick={() => goToSlide(thumbIndices.next)}
            className="relative w-32 h-24 rounded-lg overflow-hidden opacity-60 hover:opacity-80 transition-opacity"
          >
            <Image src={CAFE_IMAGES[thumbIndices.next]} alt="다음 이미지" fill className="object-cover" sizes="128px" />
          </button>

          <button
            onClick={() => changeSlide(1)}
            className="w-8 h-8 bg-amber-700/90 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors"
            aria-label="다음"
          >
            ›
          </button>
        </div>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="닫기"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {!isMenuModal && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); modalNav(-1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="이전"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); modalNav(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="다음"
              >
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}

          <div
            className="relative max-w-[90vw] max-h-[85vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={isMenuModal ? MENU_IMAGE : CAFE_IMAGES[modalIndex]}
              alt={isMenuModal ? "메뉴판" : `카페 ${modalIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          {!isMenuModal && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full">
              {modalIndex + 1} / {CAFE_IMAGES.length}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
