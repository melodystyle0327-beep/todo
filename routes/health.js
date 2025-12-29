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
  
  res.status(mongoState === 1 ? 200 : 503).json({
    success: mongoState === 1,
    message: mongoState === 1 ? '서버가 정상적으로 작동 중입니다.' : '데이터베이스 연결에 문제가 있습니다.',
    mongoDB: {
      connected: mongoState === 1,
      state: stateText,
      readyState: mongoState,
      database: mongoState === 1 ? mongoose.connection.db.databaseName : null,
      envVarSet: hasMongoUri
    },
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

