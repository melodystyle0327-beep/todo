// 할일 데이터 확인 스크립트
require('dotenv').config();
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

async function checkTodos() {
  try {
    // MongoDB 연결
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB 연결 성공!\n');

    // 모든 할일 조회
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    console.log('=== 할일 목록 ===');
    console.log(`총 ${todos.length}개의 할일이 있습니다.\n`);

    if (todos.length === 0) {
      console.log('할일이 없습니다.');
    } else {
      todos.forEach((todo, index) => {
        console.log(`[${index + 1}]`);
        console.log(`  ID: ${todo._id}`);
        console.log(`  제목: ${todo.title}`);
        console.log(`  설명: ${todo.description || '(없음)'}`);
        console.log(`  완료 상태: ${todo.completed ? '완료' : '미완료'}`);
        console.log(`  생성일: ${todo.createdAt}`);
        console.log(`  수정일: ${todo.updatedAt}`);
        console.log('');
      });
    }

    // 연결 종료
    await mongoose.disconnect();
    console.log('MongoDB 연결 종료');
  } catch (error) {
    console.error('오류 발생:', error.message);
    process.exit(1);
  }
}

checkTodos();


