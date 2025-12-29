// Google Apps Script - 초호쉼터 CTA 빠른 문의 시스템 (이메일 발송 추가)
// 기존 스크립트에 이메일 발송 기능 추가
//
// 적용 방법:
// 1. Google Apps Script 편집기에서 기존 코드 전체 교체
// 2. 저장 후 새 배포 (배포 → 새 배포 → 웹 앱)
// 3. 새 URL로 교체 필요 (또는 기존 배포 업데이트)

// ===== 설정값 =====
const CONFIG = {
  // 스프레드시트 ID (URL에서 추출)
  SPREADSHEET_ID: '14N3JZ-9InoUoZPafSNrSsjLxg_Ik0UpLG4UC6KYalzI',

  // 텔레그램 설정 (기존 설정 사용)
  TELEGRAM: {
    BOT_TOKEN: '7947112373:AAEs5o3fcm0JoPewh7K5YTUwzq4poWw97pY',
    CHAT_ID: '-1002863320782'
  },

  // 이메일 설정 (추가)
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
    console.log('텔레그램 발송 결과:', JSON.stringify(telegramResult));

    // 고객 및 관리자에게 이메일 발송 (추가)
    if (data.customerEmail) {
      const emailResult = sendQuickInquiryEmail(data);
      updateStatus(rowNumber, 8, emailResult ? '발송완료' : '발송실패');
    }

    return output.setContent(JSON.stringify({
      status: 'success',
      message: '빠른 문의가 성공적으로 접수되었습니다.',
      row: rowNumber,
      telegram: telegramResult.ok ? 'sent' : 'failed'
    }));

  } catch (error) {
    console.error('Error:', error);
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ===== 스프레드시트 저장 함수 =====
function saveToSpreadsheet(data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      const headers = [
        '접수일',
        '담당자 성함',
        '연락처',
        '이메일',
        '이용희망일',
        '예상인원',
        '텔레그램 발송결과',
        '이메일 발송결과'
      ];

      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#2d5016');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');

      sheet.setColumnWidth(1, 150);
      sheet.setColumnWidth(2, 100);
      sheet.setColumnWidth(3, 120);
      sheet.setColumnWidth(4, 200);
      sheet.setColumnWidth(5, 120);
      sheet.setColumnWidth(6, 100);
      sheet.setColumnWidth(7, 150);
      sheet.setColumnWidth(8, 150);

      sheet.setName('빠른문의');
    }

    const koreanTime = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

    let desiredDate = data.desiredDate || '미정';
    if (desiredDate && desiredDate !== '미정') {
      try {
        const dateObj = new Date(desiredDate);
        desiredDate = Utilities.formatDate(dateObj, 'Asia/Seoul', 'yyyy-MM-dd');
      } catch (e) {
        desiredDate = data.desiredDate;
      }
    }

    const newRow = sheet.getLastRow() + 1;
    const rowData = [
      koreanTime,
      data.customerName || '',
      data.customerPhone || '',
      data.customerEmail || '',
      desiredDate,
      data.people ? `${data.people}명` : '',
      '대기중',
      '대기중'
    ];

    sheet.getRange(newRow, 1, 1, rowData.length).setValues([rowData]);

    if (newRow % 2 === 0) {
      sheet.getRange(newRow, 1, 1, rowData.length).setBackground('#f5f5f5');
    }

    sheet.getRange(newRow, 1, 1, rowData.length).setHorizontalAlignment('center');

    return newRow;

  } catch (error) {
    console.error('스프레드시트 저장 실패:', error);
    throw error;
  }
}

// ===== 텔레그램 알림 발송 함수 =====
function sendTelegramNotification(data, rowNumber) {
  try {
    let desiredDateText = data.desiredDate || '미정';
    if (desiredDateText && desiredDateText !== '미정') {
      try {
        const dateObj = new Date(desiredDateText);
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        const dayName = dayNames[dateObj.getDay()];
        desiredDateText = Utilities.formatDate(dateObj, 'Asia/Seoul', `yyyy년 MM월 dd일 (${dayName})`);
      } catch (e) {
        desiredDateText = data.desiredDate;
      }
    }

    const koreanTime = Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');

    const message = `🚀 빠른 견적 문의가 접수되었습니다!

━━━━━━━━━━━━━━━━━━
📋 고객 정보
• 담당자: ${data.customerName}
• 연락처: ${data.customerPhone}
• 이메일: ${data.customerEmail}

📅 예약 정보
• 희망일: ${desiredDateText}
• 예상 인원: ${data.people}명

⏰ 접수 시간: ${koreanTime}
📍 스프레드시트 행: ${rowNumber}번
━━━━━━━━━━━━━━━━━━

⚡ 빠른 응대 부탁드립니다!
📞 고객에게 30분 이내 연락을 권장합니다.

📊 스프레드시트: https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}`;

    const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM.BOT_TOKEN}/sendMessage`;

    const options = {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        chat_id: CONFIG.TELEGRAM.CHAT_ID,
        text: message,
        disable_web_page_preview: false
      }),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    const result = JSON.parse(response.getContentText());

    updateStatus(rowNumber, 7, result.ok ? '발송완료' : '발송실패');

    return result;

  } catch (error) {
    console.error('텔레그램 발송 실패:', error);
    try {
      updateStatus(rowNumber, 7, '발송실패');
    } catch (updateError) {
      console.error('상태 업데이트 실패:', updateError);
    }
    return { ok: false, error: error.toString() };
  }
}

// ===== 이메일 발송 함수 (이모지 제거 버전) =====
function sendQuickInquiryEmail(data) {
  const subject = `[초호쉼터] ${data.customerName}님, 빠른 문의가 접수되었습니다`;

  let desiredDateText = data.desiredDate || '미정';
  if (desiredDateText && desiredDateText !== '미정') {
    try {
      const dateObj = new Date(desiredDateText);
      const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
      const dayName = dayNames[dateObj.getDay()];
      desiredDateText = Utilities.formatDate(dateObj, 'Asia/Seoul', `yyyy년 MM월 dd일 (${dayName})`);
    } catch (e) {
      desiredDateText = data.desiredDate;
    }
  }

  const plainText = `
초호쉼터 빠른 문의 접수 확인
━━━━━━━━━━━━━━━━━━

${data.customerName}님, 문의해 주셔서 감사합니다.

【문의 내용】
• 담당자: ${data.customerName}
• 연락처: ${data.customerPhone}
• 이메일: ${data.customerEmail}
• 희망일: ${desiredDateText}
• 예상 인원: ${data.people}명

【안내 사항】
• 빠른 시일 내에 담당자가 연락드리겠습니다.
• 급하신 경우 전화(031-958-0029)로 연락 주세요.

【초호쉼터 패키지 안내】
• 1박2일 워크샵: 99,000원/인 (10~80명)
• 당일 야유회: 66,000원/인 (30~200명)

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
<div style="font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9;">

  <!-- 헤더 -->
  <div style="background: linear-gradient(135deg, #2c7a2c 0%, #4caf50 100%); padding: 30px; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 24px;">초호쉼터</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">빠른 문의가 접수되었습니다</p>
  </div>

  <!-- 본문 -->
  <div style="padding: 30px; background: white;">

    <p style="font-size: 18px; color: #333; margin-bottom: 25px;">
      <strong>${data.customerName}</strong>님, 문의해 주셔서 감사합니다!
    </p>

    <!-- 문의 내용 -->
    <div style="background: #f1f8e9; padding: 20px; border-radius: 10px; border-left: 4px solid #4caf50; margin-bottom: 25px;">
      <h3 style="color: #2e7d32; margin: 0 0 15px 0; font-size: 16px;">문의 내용</h3>
      <table style="width: 100%;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 100px;">담당자</td>
          <td style="padding: 8px 0; font-weight: bold; color: #333;">${data.customerName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">연락처</td>
          <td style="padding: 8px 0; font-weight: bold; color: #333;">${data.customerPhone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">이메일</td>
          <td style="padding: 8px 0; font-weight: bold; color: #333;">${data.customerEmail}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">희망일</td>
          <td style="padding: 8px 0; font-weight: bold; color: #333;">${desiredDateText}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">예상 인원</td>
          <td style="padding: 8px 0; font-weight: bold; color: #333;">${data.people}명</td>
        </tr>
      </table>
    </div>

    <!-- 안내 메시지 -->
    <div style="background: #fff3e0; padding: 20px; border-radius: 10px; border-left: 4px solid #ff9800; margin-bottom: 25px;">
      <p style="margin: 0; color: #e65100; font-weight: bold;">빠른 시일 내에 담당자가 연락드리겠습니다!</p>
      <p style="margin: 10px 0 0 0; color: #666;">급하신 경우 전화로 연락 주세요.</p>
    </div>

    <!-- 전화 버튼 -->
    <div style="text-align: center; margin: 30px 0;">
      <a href="tel:031-958-0029" style="display: inline-block; padding: 15px 40px; background: linear-gradient(135deg, #4caf50 0%, #2e7d32 100%); color: white; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 16px;">031-958-0029 전화하기</a>
    </div>

    <!-- 패키지 안내 -->
    <div style="background: #e8f5e9; padding: 20px; border-radius: 10px; margin-bottom: 25px;">
      <h3 style="color: #2e7d32; margin: 0 0 15px 0; font-size: 16px;">초호쉼터 패키지 안내</h3>
      <table style="width: 100%;">
        <tr>
          <td style="padding: 10px; background: white; border-radius: 8px; margin-bottom: 10px;">
            <strong style="color: #2e7d32;">1박2일 워크샵</strong><br>
            <span style="color: #666;">99,000원/인 (10~80명)</span>
          </td>
        </tr>
        <tr><td style="height: 10px;"></td></tr>
        <tr>
          <td style="padding: 10px; background: white; border-radius: 8px;">
            <strong style="color: #2e7d32;">당일 야유회</strong><br>
            <span style="color: #666;">66,000원/인 (30~200명)</span>
          </td>
        </tr>
      </table>
    </div>

    <!-- 오시는 길 -->
    <div style="text-align: center; padding: 20px; background: #fafafa; border-radius: 10px;">
      <p style="margin: 0 0 10px 0;"><strong>오시는 길</strong></p>
      <p style="margin: 0; color: #666;">경기도 파주시 법원읍 초리골길 134</p>
      <p style="margin: 10px 0 0 0;">
        <a href="https://map.naver.com/p/search/초호쉼터/place/31887372" style="color: #2e7d32; font-weight: bold;">네이버 지도에서 보기 →</a>
      </p>
    </div>

  </div>

  <!-- 푸터 -->
  <div style="background: #f5f5f5; padding: 25px; text-align: center;">
    <p style="margin: 0; color: #666; font-size: 14px;">
      <strong>초호가든</strong> | 대표: 우능제<br>
      경기도 파주시 법원읍 초리골길 134<br>
      Tel: 031-958-0029 | 사업자번호: 128-06-97668
    </p>
    <p style="margin: 15px 0 0 0; color: #999; font-size: 12px;">
      이 메일은 빠른 문의 접수에 대한 자동 발송 메일입니다.
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

// ===== 상태 업데이트 함수 =====
function updateStatus(rowNumber, column, status) {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheets()[0];

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

// ===== CORS 처리용 GET 메서드 =====
function doGet() {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'ready',
    message: '초호쉼터 CTA 빠른 문의 시스템이 준비되었습니다.',
    timestamp: new Date().toISOString(),
    spreadsheetUrl: `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}`
  })).setMimeType(ContentService.MimeType.JSON);
}

// ===== 테스트 함수 =====
function testQuickInquiry() {
  const testData = {
    type: 'quick_inquiry',
    customerName: '테스트 고객',
    customerPhone: '010-1234-5678',
    customerEmail: 'test@example.com',
    desiredDate: '2025-01-20',
    people: '50',
    source: 'CTA Modal Test',
    timestamp: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
  };

  try {
    const rowNumber = saveToSpreadsheet(testData);
    console.log('스프레드시트 저장 성공 - 행 번호:', rowNumber);

    const telegramResult = sendTelegramNotification(testData, rowNumber);
    console.log('텔레그램 발송 결과:', telegramResult.ok ? '성공' : '실패');
    console.log('텔레그램 상세:', JSON.stringify(telegramResult));

    // 이메일 테스트 (실제 이메일로는 발송하지 않음)
    // const emailResult = sendQuickInquiryEmail(testData);
    console.log('이메일 발송은 테스트에서 제외 (스팸 방지)');

    console.log('테스트 완료!');
    console.log('스프레드시트 확인:', `https://docs.google.com/spreadsheets/d/${CONFIG.SPREADSHEET_ID}`);

  } catch (error) {
    console.error('테스트 실패:', error);
  }
}

// ===== 권한 확인 함수 =====
function checkPermissions() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    console.log('스프레드시트 이름:', spreadsheet.getName());
    console.log('스프레드시트 접근 권한: OK');

    const sheets = spreadsheet.getSheets();
    console.log('시트 개수:', sheets.length);
    sheets.forEach((sheet, index) => {
      console.log(`  - 시트 ${index + 1}: ${sheet.getName()}`);
    });

    const botUrl = `https://api.telegram.org/bot${CONFIG.TELEGRAM.BOT_TOKEN}/getMe`;
    const response = UrlFetchApp.fetch(botUrl);
    const botInfo = JSON.parse(response.getContentText());

    if (botInfo.ok) {
      console.log('텔레그램 봇 연결: OK');
      console.log('  - 봇 이름:', botInfo.result.first_name);
      console.log('  - 봇 username:', botInfo.result.username);
    }

    const email = Session.getActiveUser().getEmail();
    console.log('현재 사용자:', email);

    return true;

  } catch (error) {
    console.error('권한 확인 실패:', error);
    return false;
  }
}

// ===== 스프레드시트 초기화 함수 (필요시 사용) =====
function initializeSpreadsheet() {
  try {
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const sheet = spreadsheet.getSheets()[0];

    sheet.clear();

    const headers = [
      '접수일',
      '담당자 성함',
      '연락처',
      '이메일',
      '이용희망일',
      '예상인원',
      '텔레그램 발송결과',
      '이메일 발송결과'
    ];

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#2d5016');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setHorizontalAlignment('center');
    headerRange.setBorder(true, true, true, true, true, true);

    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(2, 100);
    sheet.setColumnWidth(3, 120);
    sheet.setColumnWidth(4, 200);
    sheet.setColumnWidth(5, 120);
    sheet.setColumnWidth(6, 100);
    sheet.setColumnWidth(7, 150);
    sheet.setColumnWidth(8, 150);

    sheet.setName('빠른문의');

    console.log('스프레드시트 초기화 완료');

  } catch (error) {
    console.error('초기화 실패:', error);
  }
}
