import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignin } from '../hooks/useApi';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });
  const signin = useSignin();
  const setAuth = useAuthStore(s => s.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      const result = await signin.mutateAsync(data);
      setAuth(result.user, result.token);
      navigate('/todos');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="auth-container card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email</label>
          <input {...register('email')} type="email" placeholder="your@email.com" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input {...register('password')} type="password" placeholder="••••••••" />
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <button type="submit" className="btn-primary" disabled={signin.isPending} style={{ width: '100%' }}>
          {signin.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account? <Link to="/signup" className="link">Sign up</Link>
      </p>
    </div>
  );
};