import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>📝 Todo App</h1>
      <LoginForm />
    </div>
  );
};