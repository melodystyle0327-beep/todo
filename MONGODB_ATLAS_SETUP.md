# MongoDB Atlas 연결 가이드

## 1. MongoDB Atlas 설정

### Step 1: MongoDB Atlas 계정 생성 및 클러스터 생성
1. https://www.mongodb.com/cloud/atlas 접속
2. 무료 계정 생성 (M0 Free Tier)
3. 클러스터 생성

### Step 2: 데이터베이스 사용자 생성
1. Atlas 대시보드에서 **Database Access** 메뉴 클릭
2. **Add New Database User** 클릭
3. 사용자 이름과 비밀번호 설정 (기억해두세요!)
4. 권한: **Atlas admin** 또는 **Read and write to any database**

### Step 3: 네트워크 액세스 설정 (IP 주소 화이트리스트)
1. Atlas 대시보드에서 **Network Access** 메뉴 클릭
2. **Add IP Address** 클릭
3. 개발 환경: **Allow Access from Anywhere** (0.0.0.0/0) 선택
   - 또는 자신의 IP 주소만 추가
4. **Confirm** 클릭

### Step 4: 연결 문자열 복사
1. Atlas 대시보드에서 **Database** 메뉴 클릭
2. **Connect** 버튼 클릭
3. **Connect your application** 선택
4. Driver: **Node.js**, Version: 최신 버전
5. 연결 문자열 복사 (예: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)

## 2. .env 파일 설정

`.env` 파일을 열고 다음과 같이 설정하세요:

```
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/databaseName
```

**중요 포인트:**
- `username`: 데이터베이스 사용자 이름 (Step 2에서 생성한 이름)
- `password`: 데이터베이스 사용자 비밀번호 (Step 2에서 생성한 비밀번호)
- `cluster0.xxxxx.mongodb.net`: 클러스터 주소 (Step 4에서 복사한 주소)
- `databaseName`: 사용할 데이터베이스 이름 (예: `mydatabase`, `todoapp` 등)

**예시:**
```
MONGO_URI=mongodb+srv://hplus365:as8623536*@cluster0.vkeq36z.mongodb.net/mydatabase
```

## 3. 연결 확인

서버를 재시작하면 MongoDB Atlas에 연결됩니다:

```bash
npm start
```

터미널에 "연결 성공" 메시지가 나타나면 정상적으로 연결된 것입니다.

## 4. MongoDB Compass에서 연결 (선택사항)

MongoDB Compass에서도 Atlas에 연결할 수 있습니다:

1. MongoDB Compass 실행
2. 연결 문자열 입력: `.env` 파일의 `MONGO_URI` 값 사용
3. **Connect** 클릭

## 5. 문제 해결

### 연결 실패 시 확인사항:
1. ✅ IP 주소가 화이트리스트에 추가되어 있는가?
2. ✅ 사용자 이름과 비밀번호가 올바른가?
3. ✅ 연결 문자열에 데이터베이스 이름이 포함되어 있는가?
4. ✅ 비밀번호에 특수문자가 포함되어 있다면 URL 인코딩되었는가?
   - 예: `@` → `%40`, `#` → `%23`, `$` → `%24`

### URL 인코딩이 필요한 특수문자:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `*` → `*` (인코딩 불필요)

