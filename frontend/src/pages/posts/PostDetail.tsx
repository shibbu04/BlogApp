import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { blogs } from '../../lib/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import CommentSection from '../../components/comments/CommentSection';
import { Post } from '../../types/blog';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) return;
        setIsLoading(true);
        const response = await blogs.get(id);
        setPost(response);
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
          <Loader className="animate-spin h-8 w-8 text-pink-500" />
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
        <article className="bg-gradient-to-r from-pink-50 to-green-50 p-6 rounded-lg shadow-lg mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="text-sm text-gray-500 mb-6">
            {new Date(post.created_at).toLocaleDateString()}
          </div>
          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {post.content}
          </div>
        </article>

        <div className="mt-8">
          {id && <CommentSection postId={id} />}
        </div>
      </div>
    </DashboardLayout>
  );
}