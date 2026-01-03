// 이 코드를 Google Apps Script 에디터에 붙여넣으세요
// 스프레드시트: https://docs.google.com/spreadsheets/d/1RHwI4aLpunqwtbp8kW19Kt2IvkKPREjJkPPfAO9WTKw/edit

function doPost(e) {
  try {
    // 스프레드시트 ID로 직접 연결
    var spreadsheetId = '1RHwI4aLpunqwtbp8kW19Kt2IvkKPREjJkPPfAO9WTKw';
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getActiveSheet();
    
    // 헤더가 없으면 추가 (첫 번째 행이 비어있거나 헤더가 아닌 경우)
    if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== '접수시간') {
      sheet.clear(); // 기존 데이터가 있으면 초기화
      sheet.appendRow(['접수시간', '기업명', '연락처', '담당자 성함', '미팅 날짜 및 시간', '문의사항']);
    }
    
    // 폼 데이터 파싱 - 두 가지 방식 모두 지원
    var params = {};
    
    // 1. URL 파라미터 또는 form-urlencoded 데이터
    if (e.parameter) {
      params = e.parameter;
    }
    
    // 2. POST 본문 데이터 (URLSearchParams 형식)
    if (e.postData && e.postData.contents) {
      var postData = e.postData.contents;
      var postParams = postData.split('&');
      for (var i = 0; i < postParams.length; i++) {
        var pair = postParams[i].split('=');
        if (pair.length === 2) {
          params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
        }
      }
    }
    
    // 데이터 추출
    var timestamp = params.timestamp || new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    var companyName = params.company_name || '';
    var contactNumber = params.contact_number || '';
    var managerName = params.manager_name || '';
    var meetingDate = params.meeting_date || '';
    var inquiryContent = params.inquiry_content || '';
    
    // 디버깅: 받은 데이터 로그
    Logger.log('받은 데이터: ' + JSON.stringify({
      company_name: companyName,
      contact_number: contactNumber,
      manager_name: managerName,
      meeting_date: meetingDate,
      inquiry_content: inquiryContent
    }));
    
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
    Logger.log('오류 발생: ' + error.toString());
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
  try {
    var spreadsheetId = '1RHwI4aLpunqwtbp8kW19Kt2IvkKPREjJkPPfAO9WTKw';
    var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    var sheet = spreadsheet.getActiveSheet();
    
    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0 || sheet.getRange(1, 1).getValue() !== '접수시간') {
      sheet.clear();
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
  } catch (error) {
    Logger.log('오류 발생: ' + error.toString());
  }
}

