// Node.js 프로젝트 진입점
require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const todosRouter = require('./routes/todos');

console.log('Node.js 프로젝트가 시작되었습니다!');
console.log(`Node.js 버전: ${process.version}`);
console.log(`현재 작업 디렉터리: ${process.cwd()}`);

// Express 앱 생성
const app = express();

// CORS 설정 (모든 origin 허용)
app.use(cors());

app.use(express.json()); // JSON 요청 본문 파싱
app.use(express.static('public')); // 정적 파일 서빙 (프론트엔드)

// MongoDB 연결 문자열 (환경 변수에서 가져오기)
// MongoDB Atlas 사용 시: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/todos
// 로컬 MongoDB 사용 시: mongodb://localhost:27017/mydatabase
// 주의: 연결 문자열 끝에 데이터베이스 이름을 반드시 포함해야 합니다 (/todos)
const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

// MongoDB 연결
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB 연결 성공');
    console.log('연결된 데이터베이스:', mongoose.connection.db.databaseName);
    console.log('연결 문자열:', MONGODB_URI.replace(/\/\/.*@/, '//***:***@'));
  })
  .catch((error) => {
    console.error('MongoDB 연결 실패:', error.message);
    console.error('연결 문자열:', MONGODB_URI ? MONGODB_URI.replace(/\/\/.*@/, '//***:***@') : '설정되지 않음');
    // Heroku에서는 연결 실패해도 서버는 계속 실행되도록 함
  });

// 라우터 설정
app.use('/api', todosRouter);

// 루트 경로에서 index.html 서빙
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 서버 실행 (Heroku는 PORT 환경 변수를 자동으로 할당)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

