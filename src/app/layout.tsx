import type { Metadata } from "next";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { FloatingCTA } from "@/components/FloatingCTA";
import { InquiryModal } from "@/components/forms";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { OrganizationJsonLd, LodgingBusinessJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
import { SITE_CONFIG } from "@/lib/constants";

const BASE_URL = SITE_CONFIG.url;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "초호쉼터 | 기업워크샵 야유회 전문 단체펜션",
    template: "%s | 초호쉼터",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "초호쉼터",
    "기업워크샵",
    "단체펜션",
    "야유회",
    "파주펜션",
    "단체숙박",
    "워크샵장소",
    "야유회장소",
    "기업행사",
    "팀빌딩",
    "수련회",
    "바베큐무한리필",
  ],
  authors: [{ name: "초호쉼터" }],
  creator: "초호쉼터",
  publisher: "초호쉼터",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "초호쉼터 | 기업워크샵 야유회 전문 단체펜션",
    description:
      "5,000평 천연잔디구장과 함께하는 특별한 단체행사. 바베큐 무한리필, 주류 무한리필 올인클루전 패키지",
    url: BASE_URL,
    siteName: "초호쉼터",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "초호쉼터 - 기업워크샵 야유회 전문 단체펜션",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "초호쉼터 | 기업워크샵 야유회 전문 단체펜션",
    description: "5,000평 천연잔디구장과 함께하는 특별한 단체행사",
    images: ["/images/og-image.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "travel",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <GoogleAnalytics />
        <OrganizationJsonLd />
        <LodgingBusinessJsonLd />
        <LocalBusinessJsonLd />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
        <InquiryModal />
      </body>
    </html>
  );
}
