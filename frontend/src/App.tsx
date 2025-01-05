import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import Dashboard from './pages/Dashboard';
import PostList from './pages/posts/PostList';
import CreatePost from './pages/posts/CreatePost';
import EditPost from './pages/posts/EditPost';
import PostDetail from './pages/posts/PostDetail';
import UserSettings from './pages/settings/UserSettings';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/login" element={
              <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <LoginForm />
              </div>
            } />
            <Route path="/register" element={
              <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <RegisterForm />
              </div>
            } />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/posts" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
            <Route path="/dashboard/posts/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
            <Route path="/dashboard/posts/:id/edit" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
            <Route path="/dashboard/posts/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />
            <Route path="/dashboard/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
export default App;