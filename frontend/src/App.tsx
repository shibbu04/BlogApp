import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import Dashboard from "./pages/Dashboard";
import PostList from "./pages/posts/PostList";
import CreatePost from "./pages/posts/CreatePost";
import EditPost from "./pages/posts/EditPost";
import PostDetail from "./pages/posts/PostDetail";
import UserSettings from "./pages/settings/UserSettings";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-r from-green-100 via-pink-50 to-pink-100 flex flex-col">
          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <Routes>
            {/* Landing Page */}
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center min-h-screen text-gray-800">
                  <div
                    className="bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl max-w-lg mx-auto transform transition-transform duration-500 hover:scale-105"
                  >
                    <h1 className="text-4xl font-bold text-center text-gray-900 mb-6 tracking-wide">
                      Welcome to BlogPlatform
                    </h1>
                    <p className="text-lg text-center text-gray-600 mb-8">
                      A space to share your ideas, stories, and creativity with
                      the world. Get started today and inspire others!
                    </p>
                    <div className="flex justify-center space-x-6">
                      <Link to="/register">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transform hover:scale-110 transition-all duration-300">
                          Get Started
                        </button>
                      </Link>
                      <Link to="/login">
                        <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transform hover:scale-110 transition-all duration-300">
                          Login
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              }
            />

            {/* Login Page */}
            <Route
              path="/login"
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                      Login to Your Account
                    </h2>
                    <LoginForm />
                  </div>
                </div>
              }
            />

            {/* Register Page */}
            <Route
              path="/register"
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                      Create an Account
                    </h2>
                    <RegisterForm />
                  </div>
                </div>
              }
            />

            {/* Dashboard and Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/posts"
              element={
                <ProtectedRoute>
                  <PostList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/posts/create"
              element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/posts/:id/edit"
              element={
                <ProtectedRoute>
                  <EditPost />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/posts/:id"
              element={
                <ProtectedRoute>
                  <PostDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/settings"
              element={
                <ProtectedRoute>
                  <UserSettings />
                </ProtectedRoute>
              }
            />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="flex items-center justify-center min-h-screen text-gray-800">
                  <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
