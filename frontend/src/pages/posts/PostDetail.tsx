import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import api from '../../lib/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import CommentSection from '../../components/comments/CommentSection';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/blogs/${id}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-8 w-8 text-blue-600" />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !post) {
    return (
      <DashboardLayout>
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          {error || 'Post not found'}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-6">
        <article className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          <div className="mt-2 text-sm text-gray-500">
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className="mt-6 prose max-w-none">
            {post.content}
          </div>
        </article>

        <div className="mt-8">
          <CommentSection postId={id} />
        </div>
      </div>
    </DashboardLayout>
  );
}