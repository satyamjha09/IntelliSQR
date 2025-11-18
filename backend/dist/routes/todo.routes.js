"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Todo_1 = require("../models/Todo");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title)
            return res.status(400).json({ error: 'Title required' });
        const todo = await Todo_1.Todo.create({ userId: req.userId, title, description });
        res.status(201).json(todo);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        const todos = await Todo_1.Todo.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.patch('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const todo = await Todo_1.Todo.findOneAndUpdate({ _id: req.params.id, userId: req.userId }, req.body, { new: true });
        if (!todo)
            return res.status(404).json({ error: 'Todo not found' });
        res.json(todo);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const todo = await Todo_1.Todo.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!todo)
            return res.status(404).json({ error: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=todo.routes.js.map