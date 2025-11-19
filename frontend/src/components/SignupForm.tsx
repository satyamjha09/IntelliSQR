import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignup } from '../hooks/useApi';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type SignupFormType = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema)
  });
  const { mutateAsync, isPending } = useSignup();
  const setAuth = useAuthStore(s => s.setAuth);
  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormType) => {
    try {
      const result = await mutateAsync(data);
      setAuth(result.user, result.token);
      navigate('/todos');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-container card">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Full Name</label>
          <input {...register('name')} placeholder="John Doe" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

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

        <button type="submit" className="btn-success" disabled={isPending} style={{ width: '100%' }}>
          {isPending ? 'Creating account...' : 'Sign Up'}
        </button>
      </form>

      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Already have an account? <Link to="/login" className="link">Login</Link>
      </p>
    </div>
  );
};