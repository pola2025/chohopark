import { NextRequest, NextResponse } from "next/server";
import { GOOGLE_APPS_SCRIPT_URL } from "@/lib/constants";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Google Apps Script로 전송 (필드명 매핑)
    const gasPayload = {
      type: data.type || "quick_inquiry",
      customerName: data.customerName || data.name,
      customerPhone: data.customerPhone || data.phone,
      customerEmail: data.customerEmail || data.email,
      desiredDate: data.desiredDate || data.date || "미정",
      people: data.people,
      companyName: data.companyName || data.company,
      packageType: data.packageType,
      totalAmount: data.totalAmount,
      requests: data.requests,
      source: data.source || "Website",
      timestamp: new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" }),
    };

    console.log("GAS로 전송할 데이터:", JSON.stringify(gasPayload));

    const gasResponse = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gasPayload),
      redirect: "follow",
    });

    const gasResult = await gasResponse.text();
    console.log("GAS 응답 상태:", gasResponse.status);
    console.log("GAS 응답 내용:", gasResult);

    // Supabase inquiries 테이블에 저장 (관리자 대시보드 연동)
    try {
      const inquiryData = {
        product_name: data.packageType === "overnight" ? "1박2일 워크샵" :
                      data.packageType === "training" ? "2박3일 수련회" : "당일 야유회",
        people_count: parseInt(data.people) || 0,
        customer_name: data.customerName || data.name || "",
        customer_phone: data.customerPhone || data.phone || "",
        customer_email: data.customerEmail || data.email || null,
        customer_company: data.companyName || data.company || null,
        customer_memo: data.requests || null,
        total_amount: data.totalAmount ? String(data.totalAmount) : null,
        deposit_amount: null,
      };

      const { error: supabaseError } = await supabaseAdmin
        .from("inquiries")
        .insert(inquiryData);

      if (supabaseError) {
        console.error("Supabase 저장 실패:", supabaseError);
      } else {
        console.log("Supabase 저장 완료");
      }
    } catch (supabaseErr) {
      console.error("Supabase 저장 중 오류:", supabaseErr);
      // Supabase 저장 실패해도 전체 요청은 성공 처리 (GAS는 성공했으므로)
    }

    // 텔레그램 알림은 GAS에서만 발송 (중복 방지)

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
