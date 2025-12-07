"use client";

import { Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export function FloatingCTA() {
  return (
    <a
      href={`tel:${SITE_CONFIG.phone}`}
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 hover:scale-110 transition-all duration-300"
      aria-label="전화 문의"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}
