import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Lock, Loader } from 'lucide-react';

const schema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);  // Success notification state
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<{ username: string; email: string; password: string }>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { username: string; email: string; password: string }) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await auth.register(data);
      localStorage.setItem('token', response.token);
      setUser(response.user);
      
      // Display success notification
      setShowSuccess(true);
      
      // Wait a bit before redirecting
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/login');
      }, 3000);  // Show success for 3 seconds
    } catch (err) {
      setError((err as any).response?.data?.error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6"
    >
      <h2 className="text-3xl font-semibold text-center text-pink-700 mb-4">Create Your Account</h2>

      {/* Username Field */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <div className="mt-1 relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            {...register("username")}
            id="username"
            type="text"
            className="pl-10 w-full rounded-lg border border-pink-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Choose a username"
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

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
            placeholder="Create a password"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Error Message */}
      {error && <div className="text-sm text-red-600 text-center">{error}</div>}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center"
      >
        {isLoading ? (
          <Loader className="animate-spin h-5 w-5" />
        ) : (
          "Sign Up"
        )}
      </button>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed top-0 left-0 right-0 p-4 z-50">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg text-center">
            <p className="font-semibold">Registration Successful!</p>
            <p>You will be redirected to the login page shortly.</p>
          </div>
        </div>
      )}

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-pink-600 hover:text-pink-700">
          Log In
        </a>
      </p>
    </form>
  );
}
