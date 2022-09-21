const jwt = require('jsonwebtoken');
const { Todo } = require('../models');

exports.getalltodo = async (req, res, next) => {
    try {
         const todos = await Todo.findAll({ where: { userId: req.user.id} });
         res.status(200).json({ todos });
    } catch (err) {
        next(err);
    }
};

exports.getTodoById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findOne({where: { id, userId: req.user.id }});
        res.status(200).json({ todo });
    } catch (err) {
        next(err);
    }
}

exports.createTodo = async (req, res, next) => {
    try {
        const { title, completed } = req.body;

        const todo = await Todo.create({ title, completed, userId: req.user.id });
        res.status(201).json({ todo });
    } catch (err) {
        next(err);
    }
};

exports.updateTodo = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { title, completed } = req.body;

        const [affectedRow] = await Todo.update(
            { title, completed },
            { where: { id, userId: req.user.id } }
        );
        
        if (affectedRow === 0) 
            return res.status(400).json({ message: 'cannot update todo' });
        
        const todo = await Todo.findOne({ where: { id } });
        res.status(200).json({ todo });

    } catch (err) {
        next(err);
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        const { id } = req.params;

        const affectedRow = await Todo.destroy({ where: { id, userId: req.user.id } });
        //responsr ของค่าที่ return จาก .destroy มันจะเป็น จำนวนแถวที่ลบ ถ้า = 0 คือมันไม่ได้ลบออก
        if (affectedRow === 0) return res.status(400).json({ message: 'cannot delete todo' });

        res.status(204).json();

    } catch(err) {
        next(err);
    }
}

