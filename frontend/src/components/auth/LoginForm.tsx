import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, Loader } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await auth.login(data);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      navigate('/dashboard');
    } catch (err) {
      setError((err as any).response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6">
      <h2 className="text-3xl font-semibold text-center text-pink-700 mb-4">Welcome Back</h2>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            {...register("email")}
            id="email"
            type="email"
            className="pl-10 w-full rounded-lg border border-pink-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            {...register("password")}
            id="password"
            type="password"
            className="pl-10 w-full rounded-lg border border-pink-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter your password"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="text-sm text-red-600 mt-2 text-center">{error}</div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? (
          <Loader className="animate-spin h-5 w-5" />
        ) : (
          "Sign In"
        )}
      </button>

      {/* Optional: Add footer or register link */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="text-pink-600 hover:text-pink-700">
            Create one
          </a>
        </p>
      </div>
    </form>
  );
}
