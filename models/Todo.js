const mongoose = require('mongoose');

// Todo 스키마 정의
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '할일 제목을 입력해주세요.'],
    trim: true,
    maxlength: [200, '제목은 200자 이하여야 합니다.']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, '설명은 1000자 이하여야 합니다.']
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // createdAt과 updatedAt 자동 생성
});

// Todo 모델 생성 및 내보내기
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

