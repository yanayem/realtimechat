import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Password toggle icons

const loginFields = [
  { label: "Email", type: "email", id: "email", placeholder: "name@company.com" },
  { label: "Password", type: "password", id: "password", placeholder: "••••••••" },
];

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.token) {
          alert("Token not received from server!");
          setLoading(false);
          return;
        }

        // Save token and user info
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Navigate to home safely
        navigate('/home', { replace: true });
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Cannot connect to server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500 p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 shadow-2xl backdrop-blur-md border border-white dark:border-slate-800">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome<span className="text-green-500">.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">
            Please enter your details to sign in
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {loginFields.map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label htmlFor={field.id} className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                {field.label}
              </label>
              <div className="relative">
                <input
                  type={field.id === 'password' ? (showPassword ? 'text' : 'password') : field.type}
                  id={field.id}
                  placeholder={field.placeholder}
                  value={formData[field.id]}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all placeholder:text-slate-400 pr-12"
                />
                {field.id === 'password' && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-green-500 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-500">
              <input type="checkbox" className="accent-green-500" /> Remember me
            </label>
            <a href="#" className="font-semibold text-green-600 hover:text-green-500">Forgot Password?</a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/30 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
          <span className="relative bg-white dark:bg-slate-900 px-4 text-xs text-slate-400 uppercase tracking-widest">Or continue with</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[{ name: 'Google', icon: 'G' }, { name: 'Facebook', icon: 'F' }, { name: 'Apple', icon: 'A' }].map(social => (
            <button
              key={social.name}
              type="button"
              className="flex justify-center py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer font-bold dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              {social.icon}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          New here? <a href="/signup" className="font-bold text-green-600 hover:text-green-500">Create account</a>
        </p>
      </div>
    </div>
  );
};

export default LogIn;
