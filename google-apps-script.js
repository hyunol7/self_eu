// 이 코드를 Google Apps Script 에디터에 붙여넣으세요
// 스프레드시트: https://docs.google.com/spreadsheets/d/1RHwI4aLpunqwtbp8kW19Kt2IvkKPREjJkPPfAO9WTKw/edit

function doPost(e) {
  try {
    // 스프레드시트 연결
    var spreadsheet = SpreadsheetApp.openById('1RHwI4aLpunqwtbp8kW19Kt2IvkKPREjJkPPfAO9WTKw');
    var sheet = spreadsheet.getActiveSheet();
    
    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['접수시간', '기업명', '연락처', '담당자 성함', '미팅 날짜 및 시간', '문의사항']);
    }
    
    // 폼 데이터 파싱
    var params = e.parameter;
    var timestamp = params.timestamp || new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    var companyName = params.company_name || '';
    var contactNumber = params.contact_number || '';
    var managerName = params.manager_name || '';
    var meetingDate = params.meeting_date || '';
    var inquiryContent = params.inquiry_content || '';
    
    // 시트에 데이터 추가
    sheet.appendRow([
      timestamp,
      companyName,
      contactNumber,
      managerName,
      meetingDate,
      inquiryContent
    ]);
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': '상담 문의가 구글 시트에 저장되었습니다.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Apps Script가 정상 작동 중입니다.',
      'timestamp': new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// 테스트 함수 (Apps Script 에디터에서 실행 가능)
function testInsert() {
  var spreadsheet = SpreadsheetApp.openById('1RHwI4aLpunqwtbp8kW19Kt2IvkKPREjJkPPfAO9WTKw');
  var sheet = spreadsheet.getActiveSheet();
  
  // 헤더가 없으면 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['접수시간', '기업명', '연락처', '담당자 성함', '미팅 날짜 및 시간', '문의사항']);
  }
  
  sheet.appendRow([
    new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    '테스트 회사',
    '010-1234-5678',
    '홍길동',
    '2025-01-15 14:00',
    '테스트 문의입니다.'
  ]);
  Logger.log('테스트 데이터가 추가되었습니다.');
}

