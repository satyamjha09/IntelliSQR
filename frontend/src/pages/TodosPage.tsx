import { useFetchTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from '../hooks/useApi';
import { TodoForm, TodoItem } from '../components';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { CreateTodoPayload, UpdateTodoPayload } from '../types';

export const TodosPage = () => {
  const { data: todos, isLoading } = useFetchTodos();
  const createTodo = useCreateTodo();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const logout = useAuthStore(s => s.logout);
  const user = useAuthStore(s => s.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateTodo = async (data: CreateTodoPayload) => {
    try {
      await createTodo.mutateAsync(data);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to create todo');
    }
  };

  const handleUpdateTodo = async (id: string, data: UpdateTodoPayload) => {
    try {
      await updateTodo.mutateAsync({ id, ...data });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to update todo');
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      await deleteTodo.mutateAsync(id);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to delete todo');
    }
  };

  if (isLoading) {
    return <div className="loading">Loading todos...</div>;
  }

  return (
    <div>
      <div className="header">
        <div>
          <h1>📝 My Todos</h1>
          <p>Welcome, {user?.name}!</p>
        </div>
        <button onClick={handleLogout} className="btn-danger">
          Logout
        </button>
      </div>

      <div className="container">
        <TodoForm 
          onSubmit={handleCreateTodo} 
          isLoading={createTodo.isPending}
        />

        <div>
          {!todos || todos.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', color: '#999' }}>
              <p>No todos yet. Create one to get started! 🚀</p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={handleUpdateTodo}
                onDelete={handleDeleteTodo}
                isLoading={updateTodo.isPending || deleteTodo.isPending}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};