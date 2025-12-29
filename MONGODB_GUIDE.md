# MongoDB 데이터 확인 가이드

## 데이터베이스 정보
- **데이터베이스 이름**: `mydatabase`
- **컬렉션 이름**: `todos`
- **연결 주소**: `mongodb://localhost:27017/mydatabase`

## 방법 1: MongoDB Shell (mongosh) 사용

### 1. MongoDB Shell 실행
```bash
mongosh
```

### 2. 데이터베이스 선택
```javascript
use mydatabase
```

### 3. 모든 할일 조회
```javascript
db.todos.find().pretty()
```

### 4. 특정 조건으로 조회
```javascript
// 완료된 할일만 조회
db.todos.find({ completed: true }).pretty()

// 제목으로 검색
db.todos.find({ title: /검색어/ }).pretty()

// 최신순으로 정렬
db.todos.find().sort({ createdAt: -1 }).pretty()
```

### 5. 개수 확인
```javascript
db.todos.countDocuments()
```

### 6. 특정 할일 조회
```javascript
db.todos.findOne({ _id: ObjectId("할일ID") })
```

## 방법 2: MongoDB Compass 사용 (GUI)

1. MongoDB Compass 다운로드 및 설치
   - https://www.mongodb.com/try/download/compass

2. 연결 문자열 입력:
   ```
   mongodb://localhost:27017
   ```

3. 데이터베이스 선택:
   - 왼쪽 사이드바에서 `mydatabase` 클릭

4. 컬렉션 선택:
   - `todos` 컬렉션 클릭

5. 데이터 확인:
   - Documents 탭에서 모든 할일 데이터를 테이블 형태로 확인 가능

## 방법 3: 터미널 스크립트 사용

```bash
npm run check-todos
```

또는

```bash
node check-todos.js
```

## 방법 4: 브라우저에서 확인

### JSON 형태 (API):
```
http://localhost:5000/api/todos
```

### 테이블 형태 (관리자 페이지):
```
http://localhost:5000/admin.html
```

## 데이터 구조 예시

```json
{
  "_id": ObjectId("..."),
  "title": "할일 제목",
  "description": "할일 설명",
  "completed": false,
  "createdAt": ISODate("2024-01-01T00:00:00.000Z"),
  "updatedAt": ISODate("2024-01-01T00:00:00.000Z")
}
```


