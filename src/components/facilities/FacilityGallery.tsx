"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface FacilityGalleryProps {
  id: string;
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  images: string[];
  bgColor?: string;
  accentColor?: string;
}

export default function FacilityGallery({
  id,
  badge,
  title,
  titleHighlight,
  description,
  images,
  bgColor = "bg-white",
  accentColor = "text-primary",
}: FacilityGalleryProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const changeSlide = useCallback((direction: number) => {
    setCurrentSlide((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  }, [images.length]);

  const openModal = useCallback((index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  const modalNav = useCallback((direction: number) => {
    setModalIndex((prev) => {
      const newIndex = prev + direction;
      if (newIndex < 0) return images.length - 1;
      if (newIndex >= images.length) return 0;
      return newIndex;
    });
  }, [images.length]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
      if (e.key === "ArrowLeft" && isModalOpen) {
        modalNav(-1);
      }
      if (e.key === "ArrowRight" && isModalOpen) {
        modalNav(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal, modalNav]);

  // 썸네일 인덱스 계산
  const getThumbnailIndices = () => {
    const prev = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    const next = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    return { prev, current: currentSlide, next };
  };

  const thumbIndices = getThumbnailIndices();

  return (
    <section id={id} className={`py-16 md:py-20 ${bgColor}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-5 py-2 bg-green-50 text-primary rounded-full text-sm font-semibold mb-4 tracking-wide">
            {badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-gray-900 mb-4">
            {title} <strong className={`font-normal ${accentColor}`}>{titleHighlight}</strong>
          </h2>
          <p className="text-gray-600 font-light">{description}</p>
        </div>

        {/* 메인 갤러리 */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full cursor-pointer"
                onClick={() => openModal(index)}
              >
                <div className="relative aspect-[16/9] md:aspect-[2/1]">
                  <Image
                    src={img}
                    alt={`${titleHighlight} ${index + 1}`}
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
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); changeSlide(1); }}
              className="w-10 h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all pointer-events-auto"
              aria-label="다음 이미지"
            >
              <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* 인디케이터 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.slice(0, Math.min(12, images.length)).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide % Math.min(12, images.length)
                    ? "w-6 bg-white"
                    : "w-2 bg-white/50"
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
            className="w-8 h-8 bg-primary/90 text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors"
            aria-label="이전"
          >
            ‹
          </button>

          {/* 이전 썸네일 */}
          <button
            onClick={() => goToSlide(thumbIndices.prev)}
            className="relative w-32 h-24 rounded-lg overflow-hidden opacity-60 hover:opacity-80 transition-opacity"
          >
            <Image
              src={images[thumbIndices.prev]}
              alt="이전 이미지"
              fill
              className="object-cover"
              sizes="128px"
            />
          </button>

          {/* 현재 썸네일 */}
          <button
            onClick={() => openModal(thumbIndices.current)}
            className="relative w-56 h-40 rounded-xl overflow-hidden ring-2 ring-primary shadow-lg"
          >
            <Image
              src={images[thumbIndices.current]}
              alt="현재 이미지"
              fill
              className="object-cover"
              sizes="224px"
            />
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
              {currentSlide + 1} / {images.length}
            </div>
          </button>

          {/* 다음 썸네일 */}
          <button
            onClick={() => goToSlide(thumbIndices.next)}
            className="relative w-32 h-24 rounded-lg overflow-hidden opacity-60 hover:opacity-80 transition-opacity"
          >
            <Image
              src={images[thumbIndices.next]}
              alt="다음 이미지"
              fill
              className="object-cover"
              sizes="128px"
            />
          </button>

          <button
            onClick={() => changeSlide(1)}
            className="w-8 h-8 bg-primary/90 text-white rounded-full flex items-center justify-center hover:bg-primary transition-colors"
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

          <button
            onClick={(e) => { e.stopPropagation(); modalNav(-1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="이전"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[modalIndex]}
              alt={`${titleHighlight} ${modalIndex + 1}`}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); modalNav(1); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="다음"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-4 py-2 rounded-full">
            {modalIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
