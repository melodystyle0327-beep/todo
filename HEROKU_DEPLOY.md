# Heroku 배포 가이드

## 현재 수정 사항

1. ✅ PORT 변수 중복 선언 제거
2. ✅ Procfile 생성 (Heroku 프로세스 타입 지정)
3. ✅ 서버가 0.0.0.0에서 리스닝하도록 설정 (Heroku 요구사항)

## Heroku 환경 변수 설정 (필수!)

Heroku 대시보드에서 MongoDB 연결 문자열을 환경 변수로 설정해야 합니다:

### 방법 1: Heroku 대시보드에서 설정

1. https://dashboard.heroku.com 접속
2. 앱 선택: `vibetodobackend`
3. **Settings** 탭 클릭
4. **Config Vars** 섹션에서 **Reveal Config Vars** 클릭
5. **Add** 버튼 클릭
6. 다음 추가:
   - **KEY**: `MONGO_URI`
   - **VALUE**: `mongodb+srv://hplus365:as8623536*@cluster0.bazb3fm.mongodb.net/todos`
7. **Add** 클릭

### 방법 2: Heroku CLI 사용

```bash
heroku config:set MONGO_URI=mongodb+srv://hplus365:as8623536*@cluster0.bazb3fm.mongodb.net/todos
```

## 배포 후 확인

1. **로그 확인**:
   ```bash
   heroku logs --tail
   ```

2. **환경 변수 확인**:
   ```bash
   heroku config
   ```

3. **앱 재시작**:
   ```bash
   heroku restart
   ```

## 일반적인 오류 및 해결

### 1. Application Error
- **원인**: MongoDB 연결 실패 또는 환경 변수 미설정
- **해결**: `MONGO_URI` 환경 변수 설정 확인

### 2. Port 오류
- **원인**: 하드코딩된 포트 사용
- **해결**: `process.env.PORT` 사용 (이미 수정됨)

### 3. MongoDB 연결 실패
- **원인**: MongoDB Atlas IP 화이트리스트에 Heroku IP 미추가
- **해결**: MongoDB Atlas → Network Access → `0.0.0.0/0` 추가

## 배포 후 테스트

배포가 완료되면 다음을 테스트하세요:

1. **메인 페이지**: `https://vibetodobackend-4bdc27c1767f.herokuapp.com/`
2. **API 엔드포인트**: `https://vibetodobackend-4bdc27c1767f.herokuapp.com/api/todos`
3. **관리자 페이지**: `https://vibetodobackend-4bdc27c1767f.herokuapp.com/admin.html`

