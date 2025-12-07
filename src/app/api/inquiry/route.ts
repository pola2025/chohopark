import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_APPS_SCRIPT_URL, TELEGRAM_CHAT_ID } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Google Apps Script로 전송
    const gasResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: data.source || "Website",
      }),
    });

    // 텔레그램 알림 전송 (백필 메시지 채널)
    if (process.env.TELEGRAM_BOT_TOKEN) {
      const telegramMessage = formatTelegramMessage(data);
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: "HTML",
          }),
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

function formatTelegramMessage(data: Record<string, unknown>): string {
  const lines = [
    `<b>🔔 새 견적 문의</b>`,
    ``,
    `<b>담당자:</b> ${data.customerName || data.name || "-"}`,
    `<b>연락처:</b> ${data.customerPhone || data.phone || "-"}`,
    `<b>이메일:</b> ${data.customerEmail || data.email || "-"}`,
  ];

  if (data.companyName || data.company) {
    lines.push(`<b>회사명:</b> ${data.companyName || data.company}`);
  }

  if (data.desiredDate || data.date) {
    lines.push(`<b>희망일:</b> ${data.desiredDate || data.date}`);
  }

  lines.push(`<b>인원:</b> ${data.people || "-"}명`);

  if (data.packageType) {
    lines.push(`<b>패키지:</b> ${data.packageType === "overnight" ? "1박2일" : "당일"}`);
  }

  if (data.totalAmount) {
    lines.push(`<b>예상 금액:</b> ${Number(data.totalAmount).toLocaleString()}원`);
  }

  if (data.requests) {
    lines.push(`<b>요청사항:</b> ${data.requests}`);
  }

  lines.push(``);
  lines.push(`<i>출처: ${data.source || "Website"}</i>`);

  return lines.join("\n");
}
