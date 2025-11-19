import { useState } from 'react';
import { Todo, UpdateTodoPayload } from '../types';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: UpdateTodoPayload) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading: boolean;
}

export const TodoItem = ({ todo, onUpdate, onDelete, isLoading }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.description || '');

  const handleUpdate = async () => {
    await onUpdate(todo._id, { title: editTitle, description: editDesc });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo-item">
        <div style={{ flex: 1 }}>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <textarea
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
            style={{ marginBottom: '10px' }}
            rows={2}
          />
          <div className="btn-group">
            <button onClick={handleUpdate} className="btn-success" disabled={isLoading}>
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => onUpdate(todo._id, { completed: e.target.checked })}
        disabled={isLoading}
      />
      <div className="todo-content">
        <div className={`todo-title ${todo.completed ? 'completed' : ''}`}>
          {todo.title}
        </div>
        {todo.description && <div className="todo-description">{todo.description}</div>}
      </div>
      <div className="btn-group">
        <button onClick={() => setIsEditing(true)} className="btn-primary" disabled={isLoading}>
          Edit
        </button>
        <button onClick={() => onDelete(todo._id)} className="btn-danger" disabled={isLoading}>
          Delete
        </button>
      </div>
    </div>
  );
};