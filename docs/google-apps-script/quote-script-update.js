// Google Apps Script - 초호쉼터 견적 시스템 (세미나룸 필드명 수정)
//
// 적용 방법:
// 1. Google Apps Script 편집기에서 기존 코드 전체 교체
// 2. 저장 후 새 배포 (배포 → 새 배포 → 웹 앱)
// 3. 기존 배포 업데이트 시 URL 변경 없음
//
// 변경 사항:
// - seminarHours → seminarRoom 필드명 통일 (Next.js에서 보내는 값과 일치)
// - 텔레그램 메시지에서 Markdown 제거 (파싱 에러 방지)

// ===== 설정값 =====
const CONFIG = {
  // 스프레드시트 ID
  SPREADSHEET_ID: '1b5BwSXCBKw66IffvId8u-hXSQ7gReFQhB7-o_q5cB50',

  // 텔레그램 설정
  TELEGRAM: {
    BOT_TOKEN: '7947112373:AAEs5o3fcm0JoPewh7K5YTUwzq4poWw97pY',
    CHAT_ID: '-1002863320782'
  },

  // 이메일 설정
  EMAIL: {
    FROM_NAME: '초호쉼터',
    REPLY_TO: 'chohopark134@gmail.com',
    BCC: 'chohopark134@gmail.com,choho140@naver.com,mkt@polarad.co.kr'
  }
};

// ===== 메인 함수 - POST 요청 처리 =====
function doPost(e) {
  try {
    const output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);

    const data = JSON.parse(e.postData.contents);

    // 스프레드시트에 저장
    const rowNumber = saveToSpreadsheet(data);

    // 텔레그램으로 알림 발송
    const telegramResult = sendTelegramNotification(data, rowNumber);
    updateStatus(rowNumber, 13, telegramResult ? '발송완료' : '발송실패');

    // 고객에게 이메일 발송
    if (data.customerEmail) {
      const emailResult = sendCustomerEmail(data);
      updateStatus(rowNumber, 14, emailResult ? '발송완료' : '발송실패');
    } else {
      updateStatus(rowNumber, 14, '이메일없음');
    }

    return output.setContent(JSON.stringify({
      status: 'success',
      message: '견적서가 성공적으로 발송되었습니다.',
      row: rowNumber
    }));

  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== 스프레드시트 저장 =====
function saveToSpreadsheet(data) {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName('견적문의');

  // 시트가 없으면 생성
  if (!sheet) {
    sheet = spreadsheet.insertSheet('견적문의');
  }

  // 헤더가 없으면 생성
  if (sheet.getLastRow() === 0) {
    const headers = [
      '접수일시',
      '상품명',
      '인원',
      '세미나룸',
      '총액',
      '예약금',
      '잔금',
      '담당자명',
      '연락처',
      '이메일',
      '회사/단체명',
      '요청사항',
      '텔레그램',
      '이메일발송',
      '상태'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // 헤더 스타일 설정
    sheet.getRange(1, 1, 1, headers.length)
      .setBackground('#2d5016')
      .setFontColor('#ffffff')
      .setFontWeight('bold');

    // 열 너비 설정
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(2, 120);
    sheet.setColumnWidth(3, 60);
    sheet.setColumnWidth(4, 80);
    sheet.setColumnWidth(5, 100);
    sheet.setColumnWidth(6, 100);
    sheet.setColumnWidth(7, 100);
    sheet.setColumnWidth(8, 100);
    sheet.setColumnWidth(9, 120);
    sheet.setColumnWidth(10, 200);
    sheet.setColumnWidth(11, 150);
    sheet.setColumnWidth(12, 300);
    sheet.setColumnWidth(13, 80);
    sheet.setColumnWidth(14, 80);
    sheet.setColumnWidth(15, 80);
  }

  // 현재 시간 (한국 시간)
  const koreanTime = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

  // 세미나룸 값 처리 (seminarRoom: "2시간" 형태로 전달됨)
  const seminarRoom = data.seminarRoom || '';

  // 데이터 추가
  const row = [
    koreanTime,
    data.productName,
    data.people + '명',
    seminarRoom || '-',
    data.totalAmount,
    data.depositAmount,
    data.balanceAmount,
    data.customerName,
    data.customerPhone,
    data.customerEmail,
    data.customerCompany || '-',
    data.customerMemo || '-',
    '대기중',
    '대기중',
    '신규접수'
  ];

  const newRow = sheet.getLastRow() + 1;
  sheet.getRange(newRow, 1, 1, row.length).setValues([row]);

  // 새로운 행 스타일 설정 (짝수 행 배경색)
  if (newRow % 2 === 0) {
    sheet.getRange(newRow, 1, 1, row.length).setBackground('#f5f5f5');
  }

  return newRow;
}

// ===== 상태 업데이트 함수 =====
function updateStatus(rowNumber, column, status) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName('견적문의');
    if (!sheet) return;

    sheet.getRange(rowNumber, column).setValue(status);

    if (status === '발송완료') {
      sheet.getRange(rowNumber, column).setFontColor('#4caf50');
    } else if (status === '발송실패') {
      sheet.getRange(rowNumber, column).setFontColor('#f44336');
    }
  } catch (error) {
    console.error('상태 업데이트 실패:', error);
  }
}

// ===== 텔레그램 알림 (Markdown 제거 버전) =====
function sendTelegramNotification(data, rowNumber) {
  const koreanTime = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

  // 세미나룸 값 처리
  const seminarRoom = data.seminarRoom || '';
  const seminarText = seminarRoom ? `• 세미나실: ${seminarRoom}\n` : '';

  const message = `🎯 새로운 견적 문의가 접수되었습니다!

━━━━━━━━━━━━━━━━━━
📦 상품 정보
• 상품명: ${data.productName}
• 인원: ${data.people}명
${seminarText}
💰 금액 정보
• 총액: ${data.totalAmount}
• 예약금(30%): ${data.depositAmount}
• 잔금(70%): ${data.balanceAmount}

👤 고객 정보
• 담당자: ${data.customerName}
• 연락처: ${data.customerPhone}
• 이메일: ${data.customerEmail}
${data.customerCompany ? `• 회사/단체: ${data.customerCompany}` : ''}
${data.customerMemo ? `\n📝 요청사항\n${data.customerMemo}` : ''}

⏰ 접수시간: ${koreanTime}
📍 스프레드시트 행: ${rowNumber}번
━━━━━━━━━━━━━━━━━━

⚡ 빠른 연락 부탁드립니다!
📊 스프레드시트: https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}`;

  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM.BOT_TOKEN}/sendMessage`;

  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      chat_id: CONFIG.TELEGRAM.CHAT_ID,
      text: message,
      disable_web_page_preview: true
    }),
    muteHttpExceptions: true
  };

  try {
    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());
    console.log('텔레그램 발송 결과:', JSON.stringify(result));
    return result.ok;
  } catch (error) {
    console.error('텔레그램 발송 실패:', error);
    return false;
  }
}

// ===== 고객 이메일 발송 (이모지 제거) =====
function sendCustomerEmail(data) {
  const subject = `[초호쉼터] ${data.customerName}님의 ${data.productName} 견적서`;

  // 세미나룸 값 처리
  const seminarRoom = data.seminarRoom || '';

  const plainText = `
초호쉼터 견적서
━━━━━━━━━━━━━━━━━━

${data.customerName}님, 견적 요청 감사합니다.

【예약 정보】
• 상품명: ${data.productName}
• 인원: ${data.people}명
${seminarRoom ? `• 세미나실: ${seminarRoom}` : ''}
${data.customerCompany ? `• 회사/단체명: ${data.customerCompany}` : ''}

【견적 내역】
${data.quoteDetails}

【예약 및 결제 안내】
• 예약금 입금 후 예약이 확정됩니다.
• 입금계좌: 농협은행 215099-52-225181 (예금주: 우능제)
• 잔금(${data.balanceAmount})은 이용 당일 현장에서 결제해주세요.
• 예약금 입금 후 현장에서 환불받고 법인카드 결제도 가능합니다.
• 예약 변경 및 취소는 이용일 7일 전까지 가능합니다.
• 입금 후 반드시 전화로 확인 부탁드립니다.

【연락처】
전화: 031-958-0029

【오시는 길】
주소: 경기도 파주시 법원읍 초리골길 134
네이버 지도: https://map.naver.com/p/search/초호쉼터/place/31887372

━━━━━━━━━━━━━━━━━━
초호가든 | 대표: 우능제
Tel: 031-958-0029 | 사업자번호: 128-06-97668
`;

  const htmlBody = `
<div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto;">

  <!-- 헤더 -->
  <div style="background: linear-gradient(135deg, #2c7a2c 0%, #4caf50 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">초호쉼터 견적서</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">${data.customerName}님, 견적 요청 감사합니다</p>
  </div>

  <!-- 본문 -->
  <div style="background-color: #f9f9f9; padding: 30px;">

    <!-- 예약 정보 -->
    <div style="background-color: white; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
      <h2 style="color: #2d5016; border-bottom: 2px solid #4a8b2e; padding-bottom: 10px;">예약 정보</h2>
      <table style="width: 100%; margin-top: 15px;">
        <tr>
          <td style="padding: 8px 0; color: #666;">상품명</td>
          <td style="padding: 8px 0; font-weight: bold;">${data.productName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">인원</td>
          <td style="padding: 8px 0; font-weight: bold;">${data.people}명</td>
        </tr>
        ${seminarRoom ? `
        <tr>
          <td style="padding: 8px 0; color: #666;">세미나실</td>
          <td style="padding: 8px 0; font-weight: bold;">${seminarRoom}</td>
        </tr>
        ` : ''}
        ${data.customerCompany ? `
        <tr>
          <td style="padding: 8px 0; color: #666;">회사/단체명</td>
          <td style="padding: 8px 0; font-weight: bold;">${data.customerCompany}</td>
        </tr>
        ` : ''}
      </table>
    </div>

    <!-- 견적 상세 -->
    <div style="background-color: white; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
      <h2 style="color: #2d5016; border-bottom: 2px solid #4a8b2e; padding-bottom: 10px;">견적 상세 내역</h2>
      <pre style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; white-space: pre-wrap; line-height: 1.6; color: #333; margin-top: 15px;">${data.quoteDetails}</pre>
    </div>

    <!-- 총 금액 -->
    <div style="background-color: #fff3e0; padding: 20px; margin-bottom: 20px; border-radius: 8px; border: 2px solid #ff9800;">
      <table style="width: 100%;">
        <tr>
          <td style="font-size: 18px; font-weight: bold;">총 금액</td>
          <td style="font-size: 18px; font-weight: bold; text-align: right;">${data.totalAmount}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding: 10px 0; border-bottom: 2px solid #ffcc80;"></td>
        </tr>
        <tr>
          <td style="font-size: 20px; font-weight: bold; color: #ff6f00; padding-top: 10px;">예약금 (30%)</td>
          <td style="font-size: 20px; font-weight: bold; color: #ff6f00; text-align: right; padding-top: 10px;">${data.depositAmount}</td>
        </tr>
      </table>
    </div>

    <!-- 예약 및 결제 안내 -->
    <div style="background-color: #fff3e0; padding: 20px; margin-bottom: 20px; border-left: 4px solid #ff9800;">
      <h3 style="color: #e65100; margin: 0 0 15px 0;">예약 및 결제 안내</h3>
      <ul style="margin: 0; padding-left: 20px; line-height: 1.8;">
        <li>예약금 입금 후 예약이 확정됩니다.</li>
        <li><strong style="color: #d84315;">입금계좌: 농협은행 215099-52-225181 (예금주: 우능제)</strong></li>
        <li>잔금(${data.balanceAmount})은 이용 당일 현장에서 결제해주세요.</li>
        <li style="color: #2d5016; font-weight: bold;">예약금 입금 후 현장에서 환불받고 법인카드 결제도 가능합니다.</li>
        <li>예약 변경 및 취소는 이용일 7일 전까지 가능합니다.</li>
        <li><strong>입금 후 반드시 전화로 확인 부탁드립니다.</strong></li>
      </ul>
    </div>

    <!-- 전화 문의 버튼 -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="tel:031-958-0029" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); color: white; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px;">031-958-0029 전화 문의</a>
    </div>

    <!-- 오시는 길 -->
    <div style="background-color: white; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
      <h2 style="color: #2d5016; border-bottom: 2px solid #4a8b2e; padding-bottom: 10px;">오시는 길</h2>
      <div style="text-align: center; padding: 20px 0;">
        <p><strong>주소:</strong> 경기도 파주시 법원읍 초리골길 134</p>
        <p style="color: #666; font-size: 14px;">(네비게이션: 초호가든 또는 초호쉼터 검색)</p>
        <p style="margin-top: 15px;">
          <a href="https://map.naver.com/p/search/초호쉼터/place/31887372" style="color: #2e7d32; font-weight: bold;">네이버 지도에서 보기 →</a>
        </p>
      </div>
    </div>

  </div>

  <!-- 푸터 -->
  <div style="background-color: #f5f5f5; padding: 30px; text-align: center;">
    <p style="margin: 0; color: #666; font-size: 14px;">
      <strong>초호가든</strong> | 대표: 우능제<br>
      경기도 파주시 법원읍 초리골길 134<br>
      Tel: 031-958-0029 | 사업자번호: 128-06-97668
    </p>
    <p style="margin-top: 15px; color: #999; font-size: 12px;">
      이 메일은 견적 요청에 대한 자동 발송 메일입니다.<br>
      문의사항은 전화(031-958-0029) 또는 답장으로 연락 주시기 바랍니다.
    </p>
  </div>

</div>
`;

  try {
    GmailApp.sendEmail(
      data.customerEmail,
      subject,
      plainText,
      {
        htmlBody: htmlBody,
        name: CONFIG.EMAIL.FROM_NAME,
        replyTo: CONFIG.EMAIL.REPLY_TO,
        bcc: CONFIG.EMAIL.BCC
      }
    );
    console.log('이메일 발송 성공:', data.customerEmail);
    return true;
  } catch (error) {
    console.error('이메일 발송 실패:', error);
    return false;
  }
}

// ===== CORS 처리용 GET 메서드 =====
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ready',
    message: '초호쉼터 견적 시스템이 준비되었습니다.',
    timestamp: new Date().toISOString(),
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}`
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===== 테스트 함수 =====
function testSystem() {
  const testData = {
    customerName: '테스트 고객',
    customerPhone: '010-1234-5678',
    customerEmail: 'mkt@polarad.co.kr',
    customerCompany: '테스트 회사',
    customerMemo: '테스트 메모입니다.',
    productName: '1박2일 워크샵',
    people: 30,
    seminarRoom: '2시간',  // 세미나룸 테스트
    totalAmount: '3,190,000원',
    depositAmount: '957,000원',
    balanceAmount: '2,233,000원',
    quoteDetails: `[초호가든 1박2일 워크샵 견적서]

● 이용 시간: 입실 오후 3시 ~ 퇴실 오전 11시

● 포함 항목
- 저녁식사
- 조식
- 주류 무한리필
- 음료수 무한리필
- 숙박

● 견적 내역
- 1박2일 워크샵: 30명 × 99,000원 = 2,970,000원
- 세미나실 대관: 2시간 × 110,000원 = 220,000원

━━━━━━━━━━━━━━━━━━
총 합계: 3,190,000원 (VAT 포함)
━━━━━━━━━━━━━━━━━━

● 결제 안내
- 예약금 (30%): 957,000원
- 잔금 (70%): 2,233,000원

※ 예약금 입금 후 예약이 확정됩니다.
※ 잔금은 이용 당일 현장에서 결제해주세요.`
  };

  try {
    const rowNumber = saveToSpreadsheet(testData);
    console.log('스프레드시트 저장 성공 - 행 번호:', rowNumber);

    const telegramResult = sendTelegramNotification(testData, rowNumber);
    console.log('텔레그램 발송 결과:', telegramResult ? '성공' : '실패');
    updateStatus(rowNumber, 13, telegramResult ? '발송완료' : '발송실패');

    const emailResult = sendCustomerEmail(testData);
    console.log('이메일 발송 결과:', emailResult ? '성공' : '실패');
    updateStatus(rowNumber, 14, emailResult ? '발송완료' : '발송실패');

    console.log('테스트 완료!');
    console.log('스프레드시트 확인:', `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}`);
  } catch (error) {
    console.error('테스트 실패:', error);
  }
}
