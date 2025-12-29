# Heroku 500 에러 해결 가이드

## 문제: API 요청 시 500 Internal Server Error

### 원인 분석

1. **프론트엔드 코드는 정상입니다**
   - API_URL이 `/api/todos`로 상대 경로 설정 (올바름)
   - 같은 도메인에서 실행되므로 문제 없음

2. **백엔드 문제일 가능성이 높습니다**
   - MongoDB 연결 실패
   - 환경 변수 미설정
   - 기타 서버 오류

### 확인 방법

#### 1. Heroku 로그 확인

**방법 1: Heroku CLI 사용**
```bash
heroku logs --tail
```

**방법 2: Heroku 대시보드**
- https://dashboard.heroku.com
- 앱 선택 → More → View logs

**로그에서 확인할 것:**
- ✅ "MongoDB 연결 성공" 메시지
- ❌ "MongoDB 연결 실패" + 오류 메시지
- ❌ 기타 에러 메시지

#### 2. 환경 변수 확인

**Heroku CLI 사용:**
```bash
heroku config
```

**또는 Heroku 대시보드:**
- Settings → Config Vars
- `MONGO_URI`가 설정되어 있는지 확인

#### 3. MongoDB Atlas IP 화이트리스트 확인

1. MongoDB Atlas → Network Access
2. `0.0.0.0/0` (모든 IP 허용) 추가되어 있는지 확인
3. 또는 Heroku IP 범위 추가

### 해결 방법

#### Step 1: 환경 변수 설정 확인

Heroku Config Vars에 다음이 설정되어 있어야 합니다:
- KEY: `MONGO_URI`
- VALUE: `mongodb+srv://hplus365:as8623536*@cluster0.bazb3fm.mongodb.net/todos`

#### Step 2: 앱 재시작

환경 변수를 설정/수정한 후:
```bash
heroku restart
```

#### Step 3: 로그 확인

```bash
heroku logs --tail
```

다음 메시지가 보여야 합니다:
```
MongoDB 연결 성공
연결된 데이터베이스: todos
```

#### Step 4: 테스트

1. 브라우저에서 `http://vibetodobackend-4bdc27c1767f.herokuapp.com/` 접속
2. 할일 추가 시도
3. 브라우저 개발자 도구(F12) → Network 탭에서 에러 확인

### 일반적인 오류

#### "MongoDB 연결 실패: Authentication failed"
- 원인: 사용자 이름 또는 비밀번호 오류
- 해결: MongoDB Atlas → Database Access에서 사용자 확인

#### "MongoDB 연결 실패: IP not whitelisted"
- 원인: MongoDB Atlas IP 화이트리스트에 Heroku IP 미추가
- 해결: Network Access → `0.0.0.0/0` 추가

#### "MongoDB 연결 실패: getaddrinfo ENOTFOUND"
- 원인: 연결 문자열 오류 또는 네트워크 문제
- 해결: 연결 문자열 확인, MongoDB Atlas 클러스터 상태 확인

