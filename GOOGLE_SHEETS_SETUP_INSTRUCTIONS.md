# Google Sheets 연동 설정 가이드

## 1. Google Sheets 헤더 설정

1. https://docs.google.com/spreadsheets/d/1RHwI4aLpunqwtbp8kW19Kt2IvkKPREjJkPPfAO9WTKw/edit 에 접속
2. 첫 번째 행(A1~F1)에 다음 헤더를 입력:
   - A1: `접수시간`
   - B1: `기업명`
   - C1: `연락처`
   - D1: `담당자 성함`
   - E1: `미팅 날짜 및 시간`
   - F1: `문의사항`

## 2. Google Apps Script 설정

### 2-1. Apps Script 에디터 열기
1. Google Sheets에서 `확장 프로그램` → `Apps Script` 클릭
2. 또는 직접 접속: https://script.google.com

### 2-2. 코드 입력
`google-apps-script.js` 파일의 내용을 복사하여 Apps Script 에디터에 붙여넣기

### 2-3. 저장
- `Ctrl + S` 또는 `파일` → `저장`
- 프로젝트 이름: `HRD코리아 상담 문의`

## 3. 웹 앱으로 배포

### 3-1. 배포 설정
1. Apps Script 에디터에서 `배포` → `새 배포` 클릭
2. `유형 선택` → `웹 앱` 선택
3. 설정:
   - **설명**: `HRD코리아 상담 문의 저장`
   - **실행 사용자**: `나`
   - **액세스 권한**: `모든 사용자` 선택
4. `배포` 버튼 클릭

### 3-2. 권한 승인
1. "권한 확인 필요" 메시지가 나타나면 `권한 확인` 클릭
2. Google 계정 선택
3. "이 앱이 확인되지 않았습니다" 경고가 나타나면:
   - `고급` 클릭
   - `(프로젝트 이름)(으)로 이동` 클릭
4. 권한 승인:
   - `허용` 클릭

### 3-3. 웹 앱 URL 복사
1. 배포 완료 후 나타나는 **웹 앱 URL** 복사
   - 예: `https://script.google.com/macros/s/AKfycby.../exec`
2. 이 URL을 `static/js/script.js` 파일의 `GOOGLE_SHEET_URL` 변수에 붙여넣기

## 4. JavaScript 파일 수정

`static/js/script.js` 파일을 열고 다음 부분을 수정:

```javascript
// 구글 시트 웹 앱 URL (Apps Script 배포 후 여기에 URL을 입력하세요)
const GOOGLE_SHEET_URL = '여기에_복사한_웹앱_URL_붙여넣기';
```

## 5. 테스트

1. 웹사이트에서 상담 신청서 작성 및 제출
2. Google Sheets에서 데이터가 추가되었는지 확인
3. Apps Script 에디터에서 `testInsert()` 함수 실행하여 테스트 가능

## 문제 해결

### 권한 오류가 발생하는 경우
- Apps Script에서 `실행` → `testInsert` 실행하여 권한 다시 승인

### 데이터가 저장되지 않는 경우
- 브라우저 콘솔(F12)에서 오류 메시지 확인
- 웹 앱 URL이 올바른지 확인
- Apps Script의 실행 로그 확인: `실행` → `실행 기록`

