import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_APPS_SCRIPT_QUOTE_URL } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    console.log("견적서 요청 수신");
    console.log("PDF 포함 여부:", !!data.pdfBase64);
    if (data.pdfBase64) {
      console.log("PDF 크기:", data.pdfBase64.length, "bytes");
    }

    // GAS로 데이터 전송 (클라이언트에서 받은 PDF 포함)
    const gasResponse = await fetch(GOOGLE_APPS_SCRIPT_QUOTE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      redirect: "follow",
    });

    const gasResult = await gasResponse.text();
    console.log("GAS 응답 상태:", gasResponse.status);
    console.log("GAS 응답 내용:", gasResult);

    // GAS 응답 파싱
    let result;
    try {
      result = JSON.parse(gasResult);
    } catch {
      result = { status: "success", message: gasResult };
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error processing quote:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to process quote" },
      { status: 500 }
    );
  }
}
