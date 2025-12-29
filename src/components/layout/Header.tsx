"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const NAV_LINKS = [
  { name: "초호쉼터", href: "/" },
  { name: "초호역사", href: "/about" },
  { name: "시설안내", href: "/facilities" },
  { name: "단체예약", href: "/booking", highlight: true },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-shadow duration-300",
        "bg-white/[0.98] border-b border-black/[0.08] backdrop-blur-[10px]",
        isScrolled && "shadow-[0_1px_0_rgba(0,0,0,0.1)]"
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-10">
        {/* PC 레이아웃 */}
        <div className="hidden md:flex items-center justify-between h-[75px]">
          {/* 로고 영역 */}
          <Link
            href="/"
            className="flex items-center gap-[15px] hover:opacity-80 transition-opacity"
          >
            <Image
              src="https://cdn.imweb.me/upload/S202110280a2b6da12f806/3f08b678b3f7a.png"
              alt="초호쉼터 로고"
              width={45}
              height={45}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="text-[22px] font-semibold text-[#1a1a1a] tracking-[-0.3px]">
                초호쉼터
              </span>
              <span className="text-[12px] text-[#888] mt-[3px]">
                단체 전문 펜션 & 워크숍
              </span>
            </div>
          </Link>

          {/* PC 네비게이션 */}
          <nav className="flex items-center gap-[10px] h-full">
            {NAV_LINKS.map((item) => (
              <div key={item.href} className="h-full flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "relative h-full flex items-center text-[17px] font-medium transition-colors",
                    item.highlight
                      ? "bg-[#2d5016] text-white rounded-[22px] ml-5 px-7 h-10 hover:bg-[#3a6b1e] hover:-translate-y-[1px] hover:shadow-[0_2px_8px_rgba(45,80,22,0.2)]"
                      : cn(
                          "px-6 text-[#666] hover:text-[#2d5016]",
                          isActive(item.href) && "text-[#2d5016] font-semibold",
                          // 밑줄 효과 (하이라이트 아닌 경우만)
                          "after:content-[''] after:absolute after:bottom-[22px] after:left-6 after:right-6 after:h-[2px] after:bg-[#2d5016] after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.4,0,0.2,1)]",
                          isActive(item.href)
                            ? "after:scale-x-100"
                            : "after:scale-x-0 hover:after:scale-x-100"
                        )
                  )}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </nav>
        </div>

        {/* 모바일 레이아웃 */}
        <div className="md:hidden flex flex-col gap-[10px] py-[10px] px-1">
          {/* 모바일 로고 영역 */}
          <Link
            href="/"
            className="flex items-center justify-center gap-[10px] pb-2 border-b border-black/[0.06]"
          >
            <Image
              src="https://cdn.imweb.me/upload/S202110280a2b6da12f806/3f08b678b3f7a.png"
              alt="초호쉼터 로고"
              width={35}
              height={35}
              className="object-contain"
            />
            <span className="text-[18px] font-bold text-[#2d5016]">
              초호쉼터
            </span>
          </Link>

          {/* 모바일 네비게이션 - 5개 박스 균등 배분 */}
          <nav className="flex gap-1 w-full">
            <Link
              href="/"
              className={cn(
                "flex-1 h-10 flex items-center justify-center rounded-lg text-[11px] font-medium transition-all",
                "border border-[#e0e0e0] shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
                "active:scale-[0.97] active:shadow-[0_0_2px_rgba(0,0,0,0.1)]",
                isActive("/") && pathname === "/"
                  ? "bg-[#2d5016] border-[#2d5016] text-white font-bold shadow-[0_2px_6px_rgba(45,80,22,0.25)]"
                  : "bg-white text-[#666]"
              )}
            >
              초호쉼터
            </Link>
            <Link
              href="/about"
              className={cn(
                "flex-1 h-10 flex items-center justify-center rounded-lg text-[11px] font-medium transition-all",
                "border border-[#e0e0e0] shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
                "active:scale-[0.97] active:shadow-[0_0_2px_rgba(0,0,0,0.1)]",
                isActive("/about")
                  ? "bg-[#2d5016] border-[#2d5016] text-white font-bold shadow-[0_2px_6px_rgba(45,80,22,0.25)]"
                  : "bg-white text-[#666]"
              )}
            >
              초호역사
            </Link>
            <Link
              href="/facilities"
              className={cn(
                "flex-1 h-10 flex items-center justify-center rounded-lg text-[11px] font-medium transition-all",
                "border border-[#e0e0e0] shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
                "active:scale-[0.97] active:shadow-[0_0_2px_rgba(0,0,0,0.1)]",
                isActive("/facilities")
                  ? "bg-[#2d5016] border-[#2d5016] text-white font-bold shadow-[0_2px_6px_rgba(45,80,22,0.25)]"
                  : "bg-white text-[#666]"
              )}
            >
              시설안내
            </Link>
            <Link
              href="/booking"
              className={cn(
                "flex-1 h-10 flex items-center justify-center rounded-lg text-[11px] font-medium transition-all",
                "border border-[#e0e0e0] shadow-[0_1px_3px_rgba(0,0,0,0.05)]",
                "active:scale-[0.97] active:shadow-[0_0_2px_rgba(0,0,0,0.1)]",
                isActive("/booking")
                  ? "bg-[#2d5016] border-[#2d5016] text-white font-bold shadow-[0_2px_6px_rgba(45,80,22,0.25)]"
                  : "bg-white text-[#666]"
              )}
            >
              단체예약
            </Link>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex-1 h-10 flex items-center justify-center rounded-lg text-[11px] font-semibold transition-all bg-gradient-to-br from-[#4caf50] to-[#66bb6a] text-white border-none shadow-[0_2px_6px_rgba(76,175,80,0.25)] active:from-[#388e3c] active:to-[#4caf50] active:shadow-[0_1px_3px_rgba(76,175,80,0.25)]"
            >
              전화문의
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
