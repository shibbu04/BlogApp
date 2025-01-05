import { useEffect, useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import { FileText, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    recentPosts: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <div>
        {/* Header */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.username}!
          </h1>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Total Posts */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Posts</p>
                <p className="text-xl font-bold text-gray-800">
                  {stats.totalPosts}
                </p>
              </div>
            </div>
          </div>

          {/* Total Comments */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center">
              <MessageSquare className="h-8 w-8 text-pink-500" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Comments</p>
                <p className="text-xl font-bold text-gray-800">
                  {stats.totalComments}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-800">Recent Posts</h3>
          <div className="mt-4 space-y-4">
            {stats.recentPosts.length > 0 ? (
              stats.recentPosts.map((post: any) => (
                <div
                  key={post.id}
                  className="border-b border-gray-200 pb-4 last:border-0"
                >
                  <h4 className="text-md font-semibold text-gray-700">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent posts available.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
