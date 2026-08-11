import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Activity, Sparkles } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password);
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6 text-left">
      <div className="space-y-2 text-center">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-2xl w-fit mx-auto">
          <Activity className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-emerald-950 dark:text-white">Welcome Back to Healora</h2>
        <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300">
          Enter your credentials to access your personal AI clinical health portal
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
            className="absolute right-3.5 top-9 text-emerald-600 dark:text-emerald-400 hover:text-emerald-950 cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold">
          <label className="flex items-center gap-2 cursor-pointer text-emerald-950 dark:text-emerald-200">
            <input type="checkbox" className="rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500" />
            <span>Remember login</span>
          </label>
          <a href="#" className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Forgot Password?
          </a>
        </div>

        <Button type="submit" variant="primary" fullWidth size="lg" icon={ArrowRight} className="healora-glow font-black">
          Access Health Portal
        </Button>
      </form>

      <div className="relative flex py-2 items-center">
        <div className="flex-grow border-t border-emerald-100 dark:border-emerald-900"></div>
        <span className="flex-shrink mx-4 text-[10px] text-emerald-800/80 dark:text-emerald-300 uppercase tracking-widest font-black">Or continue with</span>
        <div className="flex-grow border-t border-emerald-100 dark:border-emerald-900"></div>
      </div>

      <Button
        variant="secondary"
        fullWidth
        onClick={() => { login('demo.google@healora.ai', 'password'); navigate('/dashboard'); }}
        className="font-extrabold"
      >
        <Sparkles className="w-4 h-4 mr-2 text-emerald-600" />
        Quick Demo Sign-In
      </Button>

      <p className="text-center text-xs font-semibold text-emerald-900/80 dark:text-emerald-300 pt-2">
        Don't have a Healora account?{' '}
        <Link to="/register" className="font-black text-emerald-600 dark:text-emerald-400 hover:underline">
          Register now
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

