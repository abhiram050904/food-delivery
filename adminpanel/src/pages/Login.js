import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Both email and password are required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/login', {
        username: email, // Assuming the API expects a 'username' field
        password,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigate('/'); // Navigate to the main dashboard or home page after login
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Invalid email or password. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col antialiased transition-colors duration-200">
      <header className="sticky top-0 z-50 w-full border-b border-[#e5e7eb] dark:border-[#3f2a2a] bg-surface-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-primary flex items-center justify-center">
              <span className="material-symbols-outlined !text-3xl">restaurant_menu</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">FoodieExpress</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" href="#">Home</a>
            <a className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" href="#">Browse Food</a>
            <a className="text-sm font-medium hover:text-primary transition-colors text-slate-600 dark:text-slate-300" href="#">Offers</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex min-w-[100px] items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden flex min-h-[600px] border border-slate-100 dark:border-[#3f2a2a]">
          <div className="hidden lg:block w-1/2 relative">
            <img alt="Delicious food spread" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBSpOMl0txbbnkNtd19s-e2sp9CFxPyQgCbqscxKYfRnyi-KixYgsZlS6roiWuQtKbJwhKO_LNqH-2QIsQC2kVfxhryAncsH5tBVsNv6i5fjprHzxMhh_PQ67jS9Ct0pI4LRewm7n53y4oD3-l7glkDc-TJOC8gBBdXYW2W66a_S0a9yuymOJ4CxL-P_OdlkftEMWuX8e7B95Qv7SLdub6srGKwsPnfZQsDsAKcTRrJpoIb2QZ-rPjfxtx9jpMOac0wppXRlg5ktA" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-12">
              <p className="text-white text-3xl font-bold leading-tight mb-2">Taste the convenience.</p>
              <p className="text-white/90 text-lg">Order from the best local restaurants with easy, on-demand delivery.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 md:p-12 lg:p-16 relative">
            <div className="max-w-md mx-auto w-full flex flex-col gap-6">
              <div className="w-full p-1 bg-slate-100 dark:bg-[#3f2a2a] rounded-xl flex gap-1">
                <button className="flex-1 py-2 px-4 rounded-lg bg-white dark:bg-surface-dark shadow-sm text-slate-900 dark:text-white text-sm font-bold transition-all border border-slate-200 dark:border-transparent">
                  Log In
                </button>
                <button className="flex-1 py-2 px-4 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-all hover:bg-white/50 dark:hover:bg-white/5">
                  Sign Up
                </button>
              </div>

              <div className="space-y-2 mt-4">
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Welcome Back</h2>
                <p className="text-slate-500 dark:text-slate-400">Enter your details to access your account</p>
              </div>

              <form className="flex flex-col gap-5 mt-2" onSubmit={handleLogin}>
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <input
                      className="form-input block w-full pl-10 pr-3 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary dark:focus:border-primary sm:text-sm transition-shadow shadow-sm"
                      placeholder="name@example.com"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                      Password
                    </label>
                    <a className="text-sm font-semibold text-primary hover:text-red-600 transition-colors" href="#">
                      Forgot Password?
                    </a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <input
                      className="form-input block w-full pl-10 pr-10 py-3 rounded-xl border-slate-200 dark:border-slate-700 bg-white dark:bg-background-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-primary dark:focus:border-primary sm:text-sm transition-shadow shadow-sm"
                      placeholder="Enter your password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer" type="button">
                      <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                    </button>
                  </div>
                </div>
                 {error && (
                    <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 animate-shake">
                        <div className="flex">
                        <div className="flex-shrink-0">
                            <span className="material-icons-outlined text-red-500 text-xl">error</span>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-red-800 dark:text-red-400">{error}</p>
                        </div>
                        </div>
                    </div>
                 )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-red-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-red-500/25 transition-all transform active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Logging In...' : 'Log In'}
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </form>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-surface-light dark:bg-surface-dark text-slate-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-[#3f2a2a] transition-colors bg-white dark:bg-transparent text-slate-700 dark:text-slate-200 font-medium text-sm">
                  <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M12.0003 20.45c4.6667 0 8.45-3.7833 8.45-8.45 0-.4667-.05-.9167-.1333-1.35H12.0003v3.2h4.8333c-.2 1.1-.8666 2.0333-1.8333 2.6667v2.2166h2.9667c1.7333-1.6 2.7333-3.95 2.7333-6.6333 0-.6667-.1-1.3167-.2833-1.9167H4.55029v1.9167h7.45c0 4.6667-3.7833 8.45-8.45 8.45-4.6667 0-8.45-3.7833-8.45-8.45S3.33362 3.55 8.00029 3.55c2.3 0 4.38331.8333 6.01671 2.2167l2.4-2.4C13.9836 1.6833 11.1669.35 8.00029.35 3.78362.35.35029 3.7833.35029 8s3.43333 7.65 7.65 7.65z" fill="currentColor"></path>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-[#3f2a2a] transition-colors bg-white dark:bg-transparent text-slate-700 dark:text-slate-200 font-medium text-sm">
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.6004 2.12656C13.6004 2.12656 13.6667 4.09995 12.1932 5.56658C10.7932 6.96658 9.06659 6.83325 9.06659 6.83325C9.06659 6.83325 8.86659 4.76658 10.3333 3.16658C11.6667 1.63325 13.6004 2.12656 13.6004 2.12656ZM12.2599 7.39991C12.2599 7.39991 14.6599 7.26658 16.0599 9.39991C16.0599 9.39991 14.7266 10.2666 14.7266 12.1999C14.7266 14.1332 16.2599 14.9333 16.2599 14.9333C16.2599 14.9333 15.3266 17.5999 13.0599 17.5999C11.5932 17.5999 11.1933 16.6666 9.45992 16.6666C7.79326 16.6666 7.25992 17.5333 5.92659 17.5999C3.65992 17.6666 1.39326 13.1999 2.59326 9.73325C2.59326 9.73325 3.39326 7.26658 6.12659 7.26658C7.52659 7.26658 8.65992 8.13325 9.45992 8.13325C10.2599 8.13325 11.3933 7.39991 12.2599 7.39991Z"></path>
                  </svg>
                  Apple
                </button>
              </div>

              <div className="text-center mt-2 lg:hidden">
                <p className="text-sm text-slate-500">
                  Don't have an account?
                  <a className="font-bold text-primary hover:underline" href="#">Sign Up</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background-light dark:bg-background-dark pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </main>
    </div>
  );
};

export default Login;
