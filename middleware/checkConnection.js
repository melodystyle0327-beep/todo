// MongoDB 연결 상태 확인 미들웨어
const mongoose = require('mongoose');

function checkMongoConnection(req, res, next) {
  // MongoDB 연결 상태 확인
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: '데이터베이스에 연결할 수 없습니다.',
      error: 'MongoDB connection not established',
      connectionState: mongoose.connection.readyState === 0 ? 'disconnected' : 
                       mongoose.connection.readyState === 2 ? 'connecting' : 
                       mongoose.connection.readyState === 3 ? 'disconnecting' : 'unknown'
    });
  }
  next();
}

module.exports = checkMongoConnection;

