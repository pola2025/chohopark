"use client";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export interface QuoteData {
  quoteNumber: string;
  issueDate: string;
  customer: {
    company: string;
    name: string;
    phone: string;
    email: string;
  };
  packageName: string;
  people: number;
  pricePerPerson: number;
  seminarHours: number;
  seminarPricePerHour: number;
  schedule: {
    day: string;
    time: string;
    content: string;
  }[];
  includes: string[];
}

function formatCurrency(amount: number): string {
  return amount.toLocaleString("ko-KR");
}

function generateQuoteHtml(data: QuoteData): string {
  const baseTotal = data.people * data.pricePerPerson;
  const seminarTotal = data.seminarHours * data.seminarPricePerHour;
  const total = baseTotal + seminarTotal;
  const deposit = Math.round(total * 0.3);
  const balance = total - deposit;

  // A4 비율 (210:297) 에 맞춘 크기 - 595px 너비 (72dpi 기준 A4)
  return `
  <div id="quote-pdf-content" style="width: 595px; min-height: 842px; padding: 30px; font-family: 'Malgun Gothic', sans-serif; background: white; box-sizing: border-box;">
    <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px double #333;">
      <h1 style="font-size: 28px; font-weight: 700; letter-spacing: 14px; color: #1a1a1a; margin: 0 0 5px 0;">견 적 서</h1>
      <div style="font-size: 10px; color: #666; letter-spacing: 2px;">QUOTATION</div>
    </div>

    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 11px;">
      <div style="color: #666;">견적번호: ${data.quoteNumber}</div>
      <div style="color: #333;">발행일자: ${data.issueDate}</div>
    </div>

    <div style="display: flex; gap: 20px; margin-bottom: 15px;">
      <div style="flex: 1; border: 1px solid #ddd; padding: 12px;">
        <h3 style="font-size: 10px; color: #666; margin: 0 0 8px 0; padding-bottom: 5px; border-bottom: 1px solid #eee;">수신자 (귀하)</h3>
        <div style="font-size: 11px; margin-bottom: 4px;"><span style="color: #666; display: inline-block; width: 50px;">업체명</span><span style="font-weight: 500;">${data.customer.company || "-"}</span></div>
        <div style="font-size: 11px; margin-bottom: 4px;"><span style="color: #666; display: inline-block; width: 50px;">담당자</span><span style="font-weight: 500;">${data.customer.name} 님</span></div>
        <div style="font-size: 11px; margin-bottom: 4px;"><span style="color: #666; display: inline-block; width: 50px;">연락처</span><span style="font-weight: 500;">${data.customer.phone}</span></div>
        <div style="font-size: 11px;"><span style="color: #666; display: inline-block; width: 50px;">이메일</span><span style="font-weight: 500;">${data.customer.email}</span></div>
      </div>
      <div style="flex: 1; border: 1px solid #ddd; padding: 12px;">
        <h3 style="font-size: 10px; color: #666; margin: 0 0 8px 0; padding-bottom: 5px; border-bottom: 1px solid #eee;">공급자</h3>
        <div style="font-size: 11px; margin-bottom: 4px;"><span style="color: #666; display: inline-block; width: 60px;">상호</span><span style="font-weight: 500;">초호쉼터</span></div>
        <div style="font-size: 11px; margin-bottom: 4px;"><span style="color: #666; display: inline-block; width: 60px;">대표</span><span style="font-weight: 500;">우상엽</span></div>
        <div style="font-size: 11px; margin-bottom: 4px;"><span style="color: #666; display: inline-block; width: 60px;">사업자번호</span><span style="font-weight: 500;">308-13-20744</span></div>
        <div style="font-size: 11px;"><span style="color: #666; display: inline-block; width: 60px;">연락처</span><span style="font-weight: 500;">010-3254-0029</span></div>
      </div>
    </div>

    <div style="background: #f8f9fa; border: 2px solid #1a5f2a; padding: 12px 16px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
      <div>
        <div style="font-size: 13px; font-weight: 600; color: #333;">견적 총액</div>
        <div style="font-size: 9px; color: #666;">VAT 포함</div>
      </div>
      <div style="font-size: 20px; font-weight: 700; color: #1a5f2a;">₩ ${formatCurrency(total)}</div>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 600; color: #333; margin: 0 0 8px 0; padding-left: 8px; border-left: 3px solid #1a5f2a;">견적 상세 내역</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
        <thead>
          <tr>
            <th style="background: #f0f0f0; border: 1px solid #ccc; padding: 8px; font-weight: 600; text-align: center; width: 8%;">No.</th>
            <th style="background: #f0f0f0; border: 1px solid #ccc; padding: 8px; font-weight: 600; text-align: center; width: 35%;">품목</th>
            <th style="background: #f0f0f0; border: 1px solid #ccc; padding: 8px; font-weight: 600; text-align: center; width: 15%;">수량</th>
            <th style="background: #f0f0f0; border: 1px solid #ccc; padding: 8px; font-weight: 600; text-align: center; width: 20%;">단가</th>
            <th style="background: #f0f0f0; border: 1px solid #ccc; padding: 8px; font-weight: 600; text-align: center; width: 22%;">금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">1</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: left;">${data.packageName}</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${data.people}명</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${formatCurrency(data.pricePerPerson)}원</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${formatCurrency(baseTotal)}원</td>
          </tr>
          ${data.seminarHours > 0 ? `
          <tr>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">2</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: left;">세미나실 대관</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: center;">${data.seminarHours}시간</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${formatCurrency(data.seminarPricePerHour)}원</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: right;">${formatCurrency(seminarTotal)}원</td>
          </tr>
          ` : ""}
          <tr>
            <td colspan="4" style="border: 1px solid #ccc; padding: 8px; text-align: right; background: #fafafa; font-weight: 600;">소계</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: right; background: #fafafa; font-weight: 600;">${formatCurrency(total)}원</td>
          </tr>
          <tr>
            <td colspan="4" style="border: 1px solid #ccc; padding: 8px; text-align: right; background: #1a5f2a; color: white; font-weight: 700;">총 합계 (VAT 포함)</td>
            <td style="border: 1px solid #ccc; padding: 8px; text-align: right; background: #1a5f2a; color: white; font-weight: 700;">${formatCurrency(total)}원</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div style="background: #fffbeb; border: 1px solid #f59e0b; padding: 12px; margin-bottom: 15px;">
      <h3 style="font-size: 11px; font-weight: 600; color: #92400e; margin: 0 0 8px 0;">결제 안내</h3>
      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dashed #fcd34d;">
        <span style="color: #78350f;">계약금 (30%)</span>
        <span style="font-weight: 600; color: #92400e;">${formatCurrency(deposit)}원</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dashed #fcd34d;">
        <span style="color: #78350f;">잔금 (70%) - 당일 현장 결제</span>
        <span style="font-weight: 600; color: #92400e;">${formatCurrency(balance)}원</span>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 6px; padding-bottom: 6px; border-bottom: 1px dashed #fcd34d;">
        <span style="color: #78350f;">입금계좌</span>
        <span style="font-weight: 600; color: #92400e;">농협은행 215099-52-225181 (예금주: 우능제)</span>
      </div>
      <div style="background: #fef3c7; padding: 8px; margin-top: 8px; display: flex; justify-content: space-between; font-size: 11px;">
        <span style="color: #92400e; font-weight: 600;">※ 중요</span>
        <span style="color: #92400e;">계약금 입금 전까지 예약이 확정되지 않습니다.</span>
      </div>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 600; color: #333; margin: 0 0 8px 0; padding-left: 8px; border-left: 3px solid #1a5f2a;">패키지 포함 사항</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${data.includes.map(item => `<div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 6px 12px; font-size: 10px; color: #166534; border-radius: 2px;">${item}</div>`).join("")}
      </div>
    </div>

    <div style="margin-bottom: 15px;">
      <h3 style="font-size: 12px; font-weight: 600; color: #333; margin: 0 0 8px 0; padding-left: 8px; border-left: 3px solid #1a5f2a;">이용 일정 안내</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
        <thead>
          <tr>
            <th style="background: #e0f2fe; border: 1px solid #bae6fd; padding: 6px; font-weight: 600; color: #0369a1; text-align: center; width: 15%;">일차</th>
            <th style="background: #e0f2fe; border: 1px solid #bae6fd; padding: 6px; font-weight: 600; color: #0369a1; text-align: center; width: 25%;">시간</th>
            <th style="background: #e0f2fe; border: 1px solid #bae6fd; padding: 6px; font-weight: 600; color: #0369a1; text-align: center; width: 60%;">내용</th>
          </tr>
        </thead>
        <tbody>
          ${data.schedule.map(item => `
          <tr>
            <td style="border: 1px solid #e5e7eb; padding: 6px; text-align: center;">${item.day}</td>
            <td style="border: 1px solid #e5e7eb; padding: 6px; text-align: center; font-weight: 600; color: #1a5f2a; background: #f0fdf4;">${item.time}</td>
            <td style="border: 1px solid #e5e7eb; padding: 6px; text-align: center;">${item.content}</td>
          </tr>
          `).join("")}
        </tbody>
      </table>
    </div>

    <div style="background: #f8f9fa; border: 1px solid #e5e7eb; padding: 12px; margin-bottom: 15px;">
      <h3 style="font-size: 11px; font-weight: 600; color: #333; margin: 0 0 8px 0;">유의 사항</h3>
      <ul style="list-style: none; font-size: 10px; color: #555; margin: 0; padding: 0;">
        <li style="margin-bottom: 4px; padding-left: 12px; position: relative;">• 계약금 입금 후 예약이 확정됩니다. (입금 전 예약 미확정)</li>
        <li style="margin-bottom: 4px; padding-left: 12px; position: relative;">• 입/퇴실 시간 미준수 시 시간당/인당 1만원이 추가됩니다.</li>
        <li style="margin-bottom: 4px; padding-left: 12px; position: relative;">• 인원 변동 시 이용일 7일 전까지 사전 연락 부탁드립니다.</li>
        <li style="margin-bottom: 4px; padding-left: 12px; position: relative;">• 축구화(스터드) 착용 금지 / 개별앰프 사용 금지</li>
        <li style="padding-left: 12px; position: relative;">• 매너타임: 저녁 9시 30분 이후 정숙</li>
      </ul>
    </div>

    <div style="padding-top: 15px; border-top: 1px solid #ddd; display: flex; justify-content: space-between; align-items: flex-end;">
      <div style="font-size: 10px; color: #666; line-height: 1.5;">
        <div style="font-size: 14px; font-weight: 700; color: #1a5f2a; margin-bottom: 5px;">초호쉼터</div>
        경기도 파주시 법원읍 초리골길 134<br>
        TEL: 010-3254-0029<br>
        E-mail: chohopark@naver.com
        <div style="font-size: 9px; color: #888; margin-top: 3px;">사업자등록번호: 308-13-20744</div>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 9px; color: #666; margin-bottom: 5px;">공급자 직인</div>
        <div style="width: 60px; height: 60px; border: 2px solid #c00; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #c00; font-size: 11px; font-weight: 700;">초호쉼터</div>
      </div>
    </div>

    <div style="text-align: center; font-size: 9px; color: #666; margin-top: 15px; padding-top: 10px; border-top: 1px dashed #ddd;">
      본 견적서의 유효기간은 발행일로부터 7일입니다.
    </div>
  </div>
  `;
}

export async function generateQuotePdfBase64(data: QuoteData): Promise<string> {
  // 임시 컨테이너 생성
  const container = document.createElement("div");
  container.innerHTML = generateQuoteHtml(data);
  container.style.position = "absolute";
  container.style.left = "-9999px";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  const element = container.querySelector("#quote-pdf-content") as HTMLElement;

  try {
    // html2canvas로 캔버스 생성 (스케일 1로 낮춰서 용량 축소)
    const canvas = await html2canvas(element, {
      scale: 1,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // jsPDF로 PDF 생성
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // JPEG 품질 0.5으로 약 500KB 목표
    const imgData = canvas.toDataURL("image/jpeg", 0.5);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // 가로 폭에 맞추고 세로는 비율대로 자연스럽게
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = pdfWidth / imgWidth;
    const finalHeight = imgHeight * ratio;

    pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, finalHeight);

    // Base64로 변환
    const pdfBase64 = pdf.output("datauristring").split(",")[1];

    return pdfBase64;
  } finally {
    // 임시 컨테이너 제거
    document.body.removeChild(container);
  }
}
