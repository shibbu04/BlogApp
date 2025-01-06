import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader, PenTool } from 'lucide-react';
import { blogs } from '../../lib/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const schema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

export default function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) return;
        const post = await blogs.get(id);
        reset(post);
      } catch (err) {
        setError('Failed to load post');
      }
    };

    fetchPost();
  }, [id, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (!id) return;
      setIsLoading(true);
      setError('');
      await blogs.update(id, data);
      navigate('/dashboard/posts');
    } catch (err) {
      setError('Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-6">
        <div className="bg-gradient-to-r from-pink-50 to-green-50 p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <PenTool className="h-8 w-8 text-pink-500 mr-3" />
            <h1 className="text-2xl font-semibold text-gray-800">Edit Post</h1>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                {...register('title')}
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Content</label>
              <textarea
                {...register('content')}
                rows={8}
                className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
              />
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => navigate('/dashboard/posts')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-pink-500 to-green-500 text-white px-6 py-3 rounded-md hover:from-pink-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 flex items-center transform transition-transform duration-200 hover:scale-105"
              >
                {isLoading ? (
                  <><Loader className="animate-spin h-5 w-5 mr-2" /> Saving...</>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}