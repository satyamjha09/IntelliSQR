import { useForm } from 'react-hook-form';
import { CreateTodoPayload } from '../types';

interface TodoFormProps {
  onSubmit: (data: CreateTodoPayload) => Promise<void>;
  isLoading: boolean;
}

export const TodoForm = ({ onSubmit, isLoading }: TodoFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateTodoPayload>({
    defaultValues: {
      title: '',
      description: ''
    }
  });

  const handleFormSubmit = async (data: CreateTodoPayload) => {
    await onSubmit(data);
    reset();
  };

  return (
    <div className="card">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-group">
          <label>Todo Title</label>
          <input 
            {...register('title', { required: 'Title is required' })} 
            placeholder="What needs to be done?"
          />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <textarea 
            {...register('description')} 
            placeholder="Add more details..."
            rows={3}
          />
        </div>

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Todo'}
        </button>
      </form>
    </div>
  );
};
