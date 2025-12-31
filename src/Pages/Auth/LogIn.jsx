import React from 'react'

const loginfields = [
  { label: "Email", type: "email", id: "email", placeholder: "name@company.com" },
  { label: "Password", type: "password", id: "password", placeholder: "••••••••" },
]

const LogIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-green-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/80 dark:bg-slate-900/80 shadow-2xl backdrop-blur-md border border-white dark:border-slate-800">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Welcome<span className="text-green-500">.</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2">Please enter your details to sign in</p>
        </div>

        <form className="space-y-5">
          {loginfields.map((field) => (
            <div key={field.id} className="flex flex-col gap-1.5">
              <label htmlFor={field.id} className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                {field.label}
              </label>
              <input 
                type={field.type} 
                id={field.id}
                placeholder={field.placeholder}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-green-400 focus:border-transparent outline-none transition-all placeholder:text-slate-400" 
              />
            </div>    
          ))}

          <div className="flex items-center justify-between text-xs px-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-500">
              <input type="checkbox" className="accent-green-500" /> Remember me
            </label>
            <a href="#" className="font-semibold text-green-600 hover:text-green-500">Forgot Password?</a>
          </div>

          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-500/30 transition-all active:scale-95 cursor-pointer">
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
          <span className="relative bg-white dark:bg-slate-900 px-4 text-xs text-slate-400 uppercase tracking-widest">Or continue with</span>
        </div>

        {/* Social Logins */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { name: 'Google', icon: 'G', color: 'hover:bg-red-50 text-red-600' },
            { name: 'Facebook', icon: 'F', color: 'hover:bg-blue-50 text-blue-600' },
            { name: 'Apple', icon: 'A', color: 'hover:bg-slate-100 text-slate-900 dark:text-white' }
          ].map(social => (
            <button key={social.name} className={`flex justify-center py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer font-bold ${social.color}`}>
              {social.icon}
            </button>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          New here? <a href="signup" className="font-bold text-green-600 hover:text-green-500">Create account</a>
        </p>
      </div>
    </div>
  )
}

export default LogIn