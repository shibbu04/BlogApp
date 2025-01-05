import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
        <div className="min-h-screen bg-gradient-to-r from-teal-200 via-lime-200 to-pink-200">
          <Navbar />
          <Routes>
            {/* Root page with a fresh and modern card design */}
            <Route path="/" element={
              <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-cover bg-center"
                style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?morning,light")' }}>
                <div className="bg-white bg-opacity-70 p-10 rounded-2xl shadow-xl max-w-lg mx-auto transition-transform duration-500 transform hover:scale-105">
                  <h1 className="text-5xl font-serif font-semibold text-center text-gray-900 mb-6 tracking-wider animate__animated animate__fadeIn animate__delay-0.5s">
                    Welcome to BlogPlatform
                  </h1>
                  <p className="text-lg text-center text-gray-600 mb-8 leading-relaxed font-light animate__animated animate__fadeIn animate__delay-1s">
                    A place to share your thoughts and inspire others. Whether you're writing for fun or sharing your ideas, we’ve got you covered.
                  </p>
                  <div className="flex space-x-6 justify-center">
                    {/* <Link to="/login">
                      <button className="bg-teal-500 hover:bg-teal-600 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-md transform hover:scale-110 transition-all duration-300">
                        Login
                      </button>
                    </Link> */}
                    <Link to="/register">
                      <button className="bg-teal-500 hover:bg-yellow-600 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-md transform hover:scale-110 transition-all duration-300">
                        Get Started
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            } />

            {/* Other routes */}
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
