import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Activity, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import useAuth from '../hooks/useAuth';
import { registerUserApi } from '../services/api';

const RegisterPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const passwordVal = watch('password');

  const onSubmit = async (data) => {
    setApiError('');
    setLoading(true);
    const res = await registerUserApi(data.name, data.email, data.password);
    setLoading(false);

    if (res.success && res.data) {
      login(res.data);
      navigate('/dashboard');
    } else {
      setApiError(res.message || 'Registration failed');
    }
  };


  return (
    <div className="space-y-6 text-left">
      <div className="space-y-2 text-center">
        <div className="p-3 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 rounded-2xl w-fit mx-auto">
          <Activity className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-emerald-950 dark:text-white">Create Healora Account</h2>
        <p className="text-xs font-semibold text-emerald-800/80 dark:text-emerald-300">
          Join Healora to manage symptom evaluation logs and track personal wellness
        </p>
      </div>

      {apiError && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 rounded-2xl text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{apiError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <Input
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
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
            className="absolute right-3.5 top-9 text-emerald-600 dark:text-emerald-400 hover:text-emerald-950 cursor-pointer"
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

        <Button type="submit" variant="primary" fullWidth size="lg" icon={ArrowRight} className="healora-glow font-black">
          Register Patient Account
        </Button>
      </form>

      <div className="pt-2">
        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate('/predict')}
          className="font-extrabold text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-50/80 dark:hover:bg-emerald-900/40"
        >
          Continue Without Sign In →
        </Button>
      </div>

      <p className="text-center text-xs font-semibold text-emerald-900/80 dark:text-emerald-300 pt-2">
        Already have a Healora account?{' '}
        <Link to="/login" className="font-black text-emerald-600 dark:text-emerald-400 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;

