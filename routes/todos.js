const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const mongoose = require('mongoose');

// 모든 할일 조회 라우터 (GET /api/todos)
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: '할일 목록을 성공적으로 조회했습니다.',
      count: todos.length,
      data: todos
    });
  } catch (error) {
    console.error('할일 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '할일 조회 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

// 특정 할일 조회 라우터 (GET /api/todos/:id)
router.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 유효한 MongoDB ObjectId인지 확인
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: '유효하지 않은 할일 ID입니다.'
      });
    }

    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '해당 할일을 찾을 수 없습니다.'
      });
    }

    res.status(200).json({
      success: true,
      message: '할일을 성공적으로 조회했습니다.',
      data: todo
    });
  } catch (error) {
    console.error('할일 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '할일 조회 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

// 할일 생성 라우터 (POST /api/todos)
router.post('/todos', async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    // title이 없으면 에러 반환
    if (!title) {
      return res.status(400).json({
        success: false,
        message: '할일 제목(title)은 필수입니다.'
      });
    }

    // 새로운 할일 생성
    const todo = new Todo({
      title,
      description: description || '',
      completed: completed || false
    });

    // 데이터베이스에 저장
    const savedTodo = await todo.save();

    res.status(201).json({
      success: true,
      message: '할일이 성공적으로 생성되었습니다.',
      data: savedTodo
    });
  } catch (error) {
    console.error('할일 생성 오류:', error);
    res.status(500).json({
      success: false,
      message: '할일 생성 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

// 할일 수정 라우터 (PUT /api/todos/:id)
router.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    // 유효한 MongoDB ObjectId인지 확인
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: '유효하지 않은 할일 ID입니다.'
      });
    }

    // 업데이트할 데이터 객체 생성
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (completed !== undefined) updateData.completed = completed;

    // 업데이트할 데이터가 없으면 에러 반환
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: '수정할 데이터가 없습니다. title, description, completed 중 하나 이상을 제공해주세요.'
      });
    }

    // 할일 수정
    const todo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // new: true는 업데이트된 문서 반환, runValidators: true는 스키마 검증 실행
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '해당 할일을 찾을 수 없습니다.'
      });
    }

    res.status(200).json({
      success: true,
      message: '할일이 성공적으로 수정되었습니다.',
      data: todo
    });
  } catch (error) {
    console.error('할일 수정 오류:', error);
    res.status(500).json({
      success: false,
      message: '할일 수정 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

// 할일 삭제 라우터 (DELETE /api/todos/:id)
router.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // 유효한 MongoDB ObjectId인지 확인
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: '유효하지 않은 할일 ID입니다.'
      });
    }

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: '해당 할일을 찾을 수 없습니다.'
      });
    }

    res.status(200).json({
      success: true,
      message: '할일이 성공적으로 삭제되었습니다.',
      data: todo
    });
  } catch (error) {
    console.error('할일 삭제 오류:', error);
    res.status(500).json({
      success: false,
      message: '할일 삭제 중 오류가 발생했습니다.',
      error: error.message
    });
  }
});

module.exports = router;

