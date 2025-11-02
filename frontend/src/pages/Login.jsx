import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader, Code, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import SEO from '../components/SEO';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Helper function to get user-friendly error messages
  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email. Please check your email or sign up.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address. Please enter a valid email.';
      case 'auth/user-disabled':
        return 'This account has been disabled. Please contact support.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/invalid-credential':
        return 'Invalid email or password. Please check your credentials.';
      default:
        return 'Login failed. Please check your email and password.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      // If login succeeds, navigate (toast is shown in AuthContext)
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      // Toast is already shown in AuthContext, but we also show inline error
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await loginWithGoogle();
      // If login succeeds, navigate (toast is shown in AuthContext)
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch (error) {
      console.error('Google login error:', error);
      const errorMessage = error.message || 'Google login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Admin Login - Portfolio" />
      
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#0a0a0f]">
        {/* Code Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] font-mono text-xs">
          <div className="absolute top-20 left-10 text-blue-500/10">function login() {'{'}</div>
          <div className="absolute top-32 left-14 text-blue-500/10">return &lt;Auth /&gt;</div>
          <div className="absolute top-44 left-10 text-blue-500/10">{'}'}</div>
        </div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full relative z-10"
        >
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Code className="w-8 h-8 text-blue-400" />
                <h1 className="text-3xl font-bold text-white font-mono">
                  <span className="text-blue-400">admin</span>.<span className="text-purple-400">login</span>()
                </h1>
              </div>
              <p className="text-gray-400 font-mono text-sm">
                <span className="text-blue-400">//</span> Sign in to access the dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2 font-mono"
                >
                  <span className="text-blue-400">const</span> email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError(''); // Clear error when user types
                    }}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono"
                    placeholder='""'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2 font-mono"
                >
                  <span className="text-blue-400">const</span> password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(''); // Clear error when user types
                    }}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-800/50 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors font-mono"
                    placeholder='""'
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white font-mono"
                icon={loading ? Loader : null}
              >
                {loading ? 'Signing in...' : 'login()'}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900/50 text-gray-500 font-mono">
                  <span className="text-blue-400">//</span> Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <Button
              onClick={handleGoogleLogin}
              disabled={loading}
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white font-mono"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              loginWithGoogle()
            </Button>

            {/* Info Message */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-xs text-gray-400 leading-relaxed font-mono">
                <span className="text-blue-400">//</span> Note: You need to create an account in Firebase Console first, or use Google Sign-In.
                <br />
                <span className="text-blue-400">//</span> After login, set yourself as admin using the setAdmin script.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
