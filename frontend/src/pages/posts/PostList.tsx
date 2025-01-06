import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Loader, Edit2, Trash2, BookOpen } from 'lucide-react';
import { blogs } from '../../lib/api';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Post } from '../../types/blog';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const response = await blogs.list();
      setPosts(response);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await blogs.delete(postId);
      setPosts(posts.filter(post => post.id !== postId));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader className="animate-spin h-8 w-8 text-pink-500" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">My Posts</h1>
          <Link
            to="/dashboard/posts/create"
            className="bg-gradient-to-r from-pink-500 to-green-500 text-white px-4 py-2 rounded-md hover:from-pink-600 hover:to-green-600 flex items-center transform transition-transform duration-200 hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-1" />
            New Post
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-200 hover:scale-105"
            >
              <div className="p-6 bg-gradient-to-r from-pink-50 to-green-50">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/dashboard/posts/${post.id}`}
                    className="text-pink-500 hover:text-pink-600 flex items-center"
                  >
                    <BookOpen className="h-5 w-5 mr-1" />
                    Read More
                  </Link>
                  <div className="flex space-x-3">
                    <Link
                      to={`/dashboard/posts/${post.id}/edit`}
                      className="text-green-500 hover:text-green-600"
                    >
                      <Edit2 className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No posts yet. Create your first post!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}