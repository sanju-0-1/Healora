import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const passwordVal = watch('password');

  const onSubmit = (data) => {
    registerUser(data.name, data.email, data.password);
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Account</h2>
        <p className="text-xs text-slate-500">Join Healora to manage symptom prediction history</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          icon={User}
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="name@example.com"
          icon={Mail}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
          })}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            icon={Lock}
            error={errors.password?.message}
            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Input
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          icon={Lock}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm password',
            validate: (val) => val === passwordVal || 'Passwords do not match'
          })}
        />

        <Button type="submit" variant="primary" fullWidth size="lg" icon={ArrowRight}>
          Register Account
        </Button>
      </form>

      <p className="text-center text-xs text-slate-500 pt-2">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
