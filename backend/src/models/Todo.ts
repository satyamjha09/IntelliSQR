import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';


interface ITodo {
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<ITodo>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false }
}, { timestamps: true });

export const Todo = model<ITodo>('Todo', todoSchema);