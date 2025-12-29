"use client";

import Script from "next/script";

export function BorawareScript() {
  return (
    <>
      {/* BORAWARE LOG SCRIPT - 네이버 검색광고 유입추적 */}
      <Script
        id="boraware-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `var protect_id = 'e249';`,
        }}
      />
      <Script
        src="//script.boraware.kr/protect_script_v2.js"
        strategy="afterInteractive"
      />
      <noscript>
        <img
          src="//script.boraware.kr/protect_nbora.php?protect_id=e249"
          style={{ display: "none", width: 0, height: 0 }}
          alt=""
        />
      </noscript>
    </>
  );
}
