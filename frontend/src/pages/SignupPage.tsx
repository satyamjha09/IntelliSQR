import { SignupForm } from '../components/SignupForm';

export const SignupPage = () => {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>📝 Todo App</h1>
      <SignupForm />
    </div>
  );
};