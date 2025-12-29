import puppeteer from "puppeteer";

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

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>초호쉼터 견적서</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
      background: white;
    }
    .quote-document {
      width: 210mm;
      height: 297mm;
      background: white;
      padding: 10mm 12mm;
      display: flex;
      flex-direction: column;
    }
    .header {
      text-align: center;
      margin-bottom: 3mm;
      padding-bottom: 2mm;
      border-bottom: 2px double #333;
    }
    .header h1 {
      font-size: 22pt;
      font-weight: 700;
      letter-spacing: 14px;
      color: #1a1a1a;
      margin-bottom: 1mm;
    }
    .header .subtitle {
      font-size: 8pt;
      color: #666;
      letter-spacing: 2px;
    }
    .quote-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 3mm;
      font-size: 9pt;
    }
    .quote-info .quote-number { color: #666; }
    .quote-info .quote-date { color: #333; }
    .parties {
      display: flex;
      gap: 5mm;
      margin-bottom: 3mm;
    }
    .party-box {
      flex: 1;
      border: 1px solid #ddd;
      padding: 2mm;
    }
    .party-box h3 {
      font-size: 7pt;
      color: #666;
      margin-bottom: 1.5mm;
      padding-bottom: 1mm;
      border-bottom: 1px solid #eee;
    }
    .party-box .info-row {
      display: flex;
      font-size: 8pt;
      margin-bottom: 0.8mm;
    }
    .party-box .info-row .label {
      width: 50px;
      color: #666;
      flex-shrink: 0;
    }
    .party-box .info-row .value {
      color: #1a1a1a;
      font-weight: 500;
    }
    .total-highlight {
      background: #f8f9fa;
      border: 2px solid #1a5f2a;
      padding: 2mm 3mm;
      margin-bottom: 3mm;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .total-highlight .label {
      font-size: 10pt;
      font-weight: 600;
      color: #333;
    }
    .total-highlight .amount {
      font-size: 14pt;
      font-weight: 700;
      color: #1a5f2a;
    }
    .total-highlight .vat-note {
      font-size: 7pt;
      color: #666;
      margin-top: 0.5mm;
    }
    .detail-section {
      margin-bottom: 3mm;
    }
    .detail-section h3, .includes-section h3, .schedule-section h3 {
      font-size: 9pt;
      font-weight: 600;
      color: #333;
      margin-bottom: 1.5mm;
      padding-left: 2mm;
      border-left: 2px solid #1a5f2a;
    }
    .detail-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
    }
    .detail-table th {
      background: #f0f0f0;
      border: 1px solid #ccc;
      padding: 1.5mm 1mm;
      font-weight: 600;
      text-align: center;
      color: #333;
    }
    .detail-table td {
      border: 1px solid #ccc;
      padding: 1.5mm 1mm;
      text-align: center;
    }
    .detail-table td.left { text-align: left; padding-left: 2mm; }
    .detail-table td.right { text-align: right; padding-right: 2mm; }
    .detail-table .subtotal-row td { background: #fafafa; font-weight: 600; }
    .detail-table .total-row td {
      background: #1a5f2a;
      color: white;
      font-weight: 700;
      font-size: 9pt;
    }
    .payment-info {
      background: #fffbeb;
      border: 1px solid #f59e0b;
      padding: 2mm;
      margin-bottom: 3mm;
    }
    .payment-info h3 {
      font-size: 8pt;
      font-weight: 600;
      color: #92400e;
      margin-bottom: 1.5mm;
    }
    .payment-info .payment-row {
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      margin-bottom: 1mm;
      padding-bottom: 1mm;
      border-bottom: 1px dashed #fcd34d;
    }
    .payment-info .payment-row:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .payment-info .payment-row .label { color: #78350f; }
    .payment-info .payment-row .value { font-weight: 600; color: #92400e; }
    .payment-info .important {
      background: #fef3c7;
      margin-top: 1.5mm;
      padding: 1.5mm;
      border-radius: 2px;
    }
    .payment-info .important .label { color: #92400e; font-weight: 600; }
    .payment-info .important .value { color: #92400e; }
    .includes-section { margin-bottom: 3mm; }
    .includes-grid {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 1mm;
    }
    .include-item {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      padding: 1mm;
      font-size: 7pt;
      color: #166534;
      text-align: center;
      border-radius: 1px;
    }
    .schedule-section { margin-bottom: 3mm; }
    .schedule-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 7pt;
    }
    .schedule-table th {
      background: #e0f2fe;
      border: 1px solid #bae6fd;
      padding: 1mm;
      font-weight: 600;
      color: #0369a1;
      text-align: center;
    }
    .schedule-table td {
      border: 1px solid #e5e7eb;
      padding: 1mm;
      text-align: center;
    }
    .schedule-table td.time {
      font-weight: 600;
      color: #1a5f2a;
      background: #f0fdf4;
    }
    .notice-section {
      background: #f8f9fa;
      border: 1px solid #e5e7eb;
      padding: 2mm;
      margin-bottom: 3mm;
    }
    .notice-section h3 {
      font-size: 8pt;
      font-weight: 600;
      color: #333;
      margin-bottom: 1.5mm;
    }
    .notice-section ul {
      list-style: none;
      font-size: 7pt;
      color: #555;
    }
    .notice-section ul li {
      margin-bottom: 0.8mm;
      padding-left: 2mm;
      position: relative;
    }
    .notice-section ul li::before {
      content: "•";
      position: absolute;
      left: 0;
      color: #1a5f2a;
    }
    .footer {
      margin-top: auto;
      padding-top: 3mm;
      border-top: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }
    .company-info {
      font-size: 7pt;
      color: #666;
      line-height: 1.4;
    }
    .company-info .name {
      font-size: 10pt;
      font-weight: 700;
      color: #1a5f2a;
      margin-bottom: 1mm;
    }
    .company-info .biz-number {
      font-size: 6pt;
      color: #888;
      margin-top: 0.5mm;
    }
    .stamp-area { text-align: center; }
    .stamp-area .label {
      font-size: 7pt;
      color: #666;
      margin-bottom: 1mm;
    }
    .stamp-box {
      width: 18mm;
      height: 18mm;
      border: 2px solid #c00;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c00;
      font-size: 8pt;
      font-weight: 700;
    }
    .validity {
      text-align: center;
      font-size: 7pt;
      color: #666;
      margin-top: 2mm;
      padding-top: 1.5mm;
      border-top: 1px dashed #ddd;
    }
  </style>
</head>
<body>
  <div class="quote-document">
    <div class="header">
      <h1>견 적 서</h1>
      <div class="subtitle">QUOTATION</div>
    </div>

    <div class="quote-info">
      <div class="quote-number">견적번호: ${data.quoteNumber}</div>
      <div class="quote-date">발행일자: ${data.issueDate}</div>
    </div>

    <div class="parties">
      <div class="party-box">
        <h3>수신자 (귀하)</h3>
        <div class="info-row">
          <span class="label">업체명</span>
          <span class="value">${data.customer.company || "-"}</span>
        </div>
        <div class="info-row">
          <span class="label">담당자</span>
          <span class="value">${data.customer.name} 님</span>
        </div>
        <div class="info-row">
          <span class="label">연락처</span>
          <span class="value">${data.customer.phone}</span>
        </div>
        <div class="info-row">
          <span class="label">이메일</span>
          <span class="value">${data.customer.email}</span>
        </div>
      </div>
      <div class="party-box">
        <h3>공급자</h3>
        <div class="info-row">
          <span class="label">상호</span>
          <span class="value">초호쉼터</span>
        </div>
        <div class="info-row">
          <span class="label">대표</span>
          <span class="value">우상엽</span>
        </div>
        <div class="info-row">
          <span class="label">사업자번호</span>
          <span class="value">308-13-20744</span>
        </div>
        <div class="info-row">
          <span class="label">연락처</span>
          <span class="value">010-3254-0029</span>
        </div>
      </div>
    </div>

    <div class="total-highlight">
      <div>
        <div class="label">견적 총액</div>
        <div class="vat-note">VAT 포함</div>
      </div>
      <div class="amount">₩ ${formatCurrency(total)}</div>
    </div>

    <div class="detail-section">
      <h3>견적 상세 내역</h3>
      <table class="detail-table">
        <thead>
          <tr>
            <th style="width: 8%">No.</th>
            <th style="width: 35%">품목</th>
            <th style="width: 15%">수량</th>
            <th style="width: 20%">단가</th>
            <th style="width: 22%">금액</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td class="left">${data.packageName}</td>
            <td>${data.people}명</td>
            <td class="right">${formatCurrency(data.pricePerPerson)}원</td>
            <td class="right">${formatCurrency(baseTotal)}원</td>
          </tr>
          ${data.seminarHours > 0 ? `
          <tr>
            <td>2</td>
            <td class="left">세미나실 대관</td>
            <td>${data.seminarHours}시간</td>
            <td class="right">${formatCurrency(data.seminarPricePerHour)}원</td>
            <td class="right">${formatCurrency(seminarTotal)}원</td>
          </tr>
          ` : ""}
          <tr class="subtotal-row">
            <td colspan="4" class="right">소계</td>
            <td class="right">${formatCurrency(total)}원</td>
          </tr>
          <tr class="total-row">
            <td colspan="4" class="right">총 합계 (VAT 포함)</td>
            <td class="right">${formatCurrency(total)}원</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="payment-info">
      <h3>결제 안내</h3>
      <div class="payment-row">
        <span class="label">계약금 (30%)</span>
        <span class="value">${formatCurrency(deposit)}원</span>
      </div>
      <div class="payment-row">
        <span class="label">잔금 (70%) - 당일 현장 결제</span>
        <span class="value">${formatCurrency(balance)}원</span>
      </div>
      <div class="payment-row">
        <span class="label">입금계좌</span>
        <span class="value">농협은행 215099-52-225181 (예금주: 우능제)</span>
      </div>
      <div class="payment-row important">
        <span class="label">※ 중요</span>
        <span class="value">계약금 입금 전까지 예약이 확정되지 않습니다.</span>
      </div>
    </div>

    <div class="includes-section">
      <h3>패키지 포함 사항</h3>
      <div class="includes-grid">
        ${data.includes.map(item => `<div class="include-item">${item}</div>`).join("")}
      </div>
    </div>

    <div class="schedule-section">
      <h3>이용 일정 안내</h3>
      <table class="schedule-table">
        <thead>
          <tr>
            <th style="width: 15%">일차</th>
            <th style="width: 25%">시간</th>
            <th style="width: 60%">내용</th>
          </tr>
        </thead>
        <tbody>
          ${data.schedule.map((item, index, arr) => {
            const prevDay = index > 0 ? arr[index - 1].day : null;
            const showDay = item.day !== prevDay;
            const dayRowSpan = arr.filter(s => s.day === item.day).length;
            return `
            <tr>
              ${showDay ? `<td rowspan="${dayRowSpan}">${item.day}</td>` : ""}
              <td class="time">${item.time}</td>
              <td>${item.content}</td>
            </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>

    <div class="notice-section">
      <h3>유의 사항</h3>
      <ul>
        <li>계약금 입금 후 예약이 확정됩니다. (입금 전 예약 미확정)</li>
        <li>입/퇴실 시간 미준수 시 시간당/인당 1만원이 추가됩니다.</li>
        <li>인원 변동 시 이용일 7일 전까지 사전 연락 부탁드립니다.</li>
        <li>축구화(스터드) 착용 금지 / 개별앰프 사용 금지</li>
        <li>매너타임: 저녁 9시 30분 이후 정숙</li>
      </ul>
    </div>

    <div class="footer">
      <div class="company-info">
        <div class="name">초호쉼터</div>
        경기도 파주시 법원읍 초리골길 134<br>
        TEL: 010-3254-0029<br>
        E-mail: chohopark@naver.com
        <div class="biz-number">사업자등록번호: 308-13-20744</div>
      </div>
      <div class="stamp-area">
        <div class="label">공급자 직인</div>
        <div class="stamp-box">초호쉼터</div>
      </div>
    </div>

    <div class="validity">
      본 견적서의 유효기간은 발행일로부터 7일입니다.
    </div>
  </div>
</body>
</html>`;
}

export async function generateQuotePdf(data: QuoteData): Promise<Buffer> {
  const html = generateQuoteHtml(data);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}
