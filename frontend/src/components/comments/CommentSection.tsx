import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader, MessageSquare } from 'lucide-react';
import { comments } from '../../lib/api';
import { Comment } from '../../types/blog';

const schema = z.object({
  content: z.string().min(1, 'Comment cannot be empty'),
});

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ content: string }>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      const response = await comments.list(postId);
      setCommentList(response);
    } catch (err) {
      setError('Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: { content: string }) => {
    try {
      const response = await comments.create({
        ...data,
        post_id: postId,
      });
      setCommentList([...commentList, response]);
      reset();
    } catch (err) {
      setError('Failed to post comment');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader className="animate-spin h-6 w-6 text-pink-500" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-pink-50 to-green-50 p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <MessageSquare className="h-6 w-6 text-pink-500 mr-2" />
        <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div>
          <textarea
            {...register('content')}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white"
            placeholder="Write a comment..."
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-green-500 text-white px-4 py-2 rounded-md hover:from-pink-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform transition-transform duration-200 hover:scale-105"
          >
            Post Comment
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {commentList.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-900">
                {comment.user.username}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}