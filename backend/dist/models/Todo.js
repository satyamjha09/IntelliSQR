"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const todoSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    completed: { type: Boolean, default: false }
}, { timestamps: true });
exports.Todo = model('Todo', todoSchema);
//# sourceMappingURL=Todo.js.map