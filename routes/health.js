// 헬스 체크 및 MongoDB 연결 상태 확인 라우터
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 헬스 체크 (GET /api/health)
router.get('/health', (req, res) => {
  const mongoState = mongoose.connection.readyState;
  const stateText = mongoState === 0 ? 'disconnected' : 
                    mongoState === 1 ? 'connected' : 
                    mongoState === 2 ? 'connecting' : 
                    mongoState === 3 ? 'disconnecting' : 'unknown';
  
  const hasMongoUri = !!process.env.MONGO_URI;
  const mongoUri = process.env.MONGO_URI || '';
  const maskedUri = mongoUri ? mongoUri.replace(/\/\/.*@/, '//***:***@') : 'not set';
  
  // 연결 시도 정보 추가
  const connectionInfo = {
    connected: mongoState === 1,
    state: stateText,
    readyState: mongoState,
    database: mongoState === 1 ? mongoose.connection.db.databaseName : null,
    envVarSet: hasMongoUri,
    connectionString: maskedUri,
    host: mongoState === 1 ? mongoose.connection.host : null,
    port: mongoState === 1 ? mongoose.connection.port : null
  };
  
  res.status(mongoState === 1 ? 200 : 503).json({
    success: mongoState === 1,
    message: mongoState === 1 ? '서버가 정상적으로 작동 중입니다.' : '데이터베이스 연결에 문제가 있습니다.',
    mongoDB: connectionInfo,
    timestamp: new Date().toISOString(),
    troubleshooting: mongoState !== 1 ? {
      suggestion: 'Heroku 로그를 확인하여 MongoDB 연결 오류를 확인하세요: heroku logs --tail',
      commonIssues: [
        'MongoDB Atlas IP 화이트리스트에 0.0.0.0/0이 추가되어 있는지 확인',
        'MONGO_URI 환경 변수의 연결 문자열이 정확한지 확인',
        'MongoDB Atlas 클러스터가 실행 중인지 확인'
      ]
    } : null
  });
});

module.exports = router;

