# Heroku MongoDB 연결 문제 해결 가이드

## 현재 상황

헬스 체크 결과:
- `connected: false`
- `state: "disconnected"`
- `readyState: 0` (연결 안 됨)
- `envVarSet: true` (환경 변수는 설정됨)

**결론: 환경 변수는 설정되어 있지만 MongoDB 연결 자체가 실패하고 있습니다.**

## 해결 방법

### 1단계: Heroku 로그에서 실제 오류 확인

**Heroku 대시보드:**
1. https://dashboard.heroku.com 접속
2. `vibetodobackend` 앱 선택
3. **More → View logs** 클릭
4. 페이지를 새로고침하거나 앱을 재시작
5. 로그에서 다음을 찾으세요:
   - `❌ MongoDB 연결 실패!`
   - `에러 메시지:` 또는 `에러 이름:` 라인

**또는 Heroku CLI:**
```bash
heroku logs --tail --app vibetodobackend
```

### 2단계: 일반적인 오류별 해결 방법

#### 오류 1: "IP not whitelisted" 또는 "network access"

**해결:**
1. MongoDB Atlas → **Network Access** (왼쪽 메뉴)
2. **Add IP Address** 클릭
3. **Allow Access from Anywhere** 클릭 (또는 `0.0.0.0/0` 입력)
4. **Confirm** 클릭
5. Heroku 앱 재시작: `heroku restart`

#### 오류 2: "Authentication failed" 또는 "bad auth"

**해결:**
1. MongoDB Atlas → **Database Access** (왼쪽 메뉴)
2. 사용자 이름과 비밀번호 확인
3. Heroku Config Vars에서 `MONGO_URI` 확인:
   - 형식: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todos`
   - 특수문자 `*`는 그대로 사용 가능하지만, 다른 특수문자는 URL 인코딩 필요
4. 비밀번호에 특수문자가 있다면 URL 인코딩:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`
   - 등등

#### 오류 3: "getaddrinfo ENOTFOUND" 또는 "connection timeout"

**해결:**
1. MongoDB Atlas 클러스터 상태 확인
2. 연결 문자열의 클러스터 이름 확인:
   - `cluster0.bazb3fm.mongodb.net`가 정확한지 확인
3. MongoDB Atlas → **Clusters** → 클러스터 이름 확인

### 3단계: 연결 문자열 재확인

**현재 설정된 연결 문자열:**
```
mongodb+srv://hplus365:as8623536*@cluster0.bazb3fm.mongodb.net/todos
```

**확인 사항:**
1. ✅ 사용자 이름: `hplus365`
2. ✅ 비밀번호: `as8623536*` (특수문자 `*` 포함)
3. ✅ 클러스터: `cluster0.bazb3fm.mongodb.net`
4. ✅ 데이터베이스: `/todos`

**비밀번호에 `*` 문자가 있는 경우:**
- `*`는 일반적으로 URL에서 문제가 없지만, 만약 문제가 있다면 `%2A`로 인코딩할 수 있습니다.
- 하지만 먼저 MongoDB Atlas에서 사용자 비밀번호를 다시 확인하는 것이 좋습니다.

### 4단계: MongoDB Atlas에서 연결 테스트

1. MongoDB Atlas → **Database** → **Connect**
2. **Connect your application** 선택
3. 연결 문자열 복사
4. Heroku Config Vars의 `MONGO_URI`와 비교

### 5단계: 앱 재시작

환경 변수나 MongoDB 설정을 변경했다면:
```bash
heroku restart --app vibetodobackend
```

또는 Heroku 대시보드에서:
- **More → Restart all dynos**

### 6단계: 다시 테스트

1. 헬스 체크: `http://vibetodobackend-4bdc27c1767f.herokuapp.com/api/health`
2. 할일 추가 시도
3. 로그 다시 확인

## 가장 가능성 높은 원인

**MongoDB Atlas IP 화이트리스트 문제 (90% 확률)**

Heroku의 IP 주소는 동적으로 변하므로, MongoDB Atlas의 Network Access에 `0.0.0.0/0` (모든 IP 허용)을 추가해야 합니다.

**확인 방법:**
1. MongoDB Atlas → Network Access
2. 현재 IP 주소 목록 확인
3. `0.0.0.0/0`이 없으면 추가

