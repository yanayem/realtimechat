import React from 'react'

const signupfields = [
  { name: "Name", type: "text", id: "name", placeholder: "Your Full Name" },
  { name: "Phone Number", type: "tel", id: "phone", placeholder: "+1 (555) 000-0000" },
  { name: "Email", type: "email", id: "email", placeholder: "name@company.com" },
  { name: "Password", type: "password", id: "password", placeholder: "••••••••" },
  { name: "Confirm Password", type: "password", id: "confirm-password", placeholder: "••••••••" }
]

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-green-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-500 p-4">
      
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/70 dark:bg-slate-900/80 shadow-2xl backdrop-blur-xl border border-white dark:border-slate-800 transition-all">
        
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Create Account</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Join PuzzleFusion to start solving</p>
        </header>

        <form className="space-y-4">
          {signupfields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label htmlFor={field.id} className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">
                {field.name}
              </label>
              <input 
                type={field.type} 
                id={field.id} 
                placeholder={field.placeholder}
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800 text-slate-900 dark:text-white outline-hidden focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all placeholder:text-slate-400"
              />
            </div>
          ))}

          {/* Gender Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Gender</label>
            <div className="flex gap-2">
              {['Male', 'Female', 'Other'].map((gender) => (
                <label key={gender} className="flex-1 group relative cursor-pointer">
                  <input type="radio" name="gender" value={gender.toLowerCase()} className="peer sr-only" />
                  <div className="p-2.5 text-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400 transition-all peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500 peer-checked:shadow-lg peer-checked:shadow-green-500/30 hover:border-green-300">
                    {gender}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-center gap-3 cursor-pointer group mt-2">
            <input type="checkbox" className="w-5 h-5 rounded-md border-slate-300 accent-green-500 cursor-pointer" />
            <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
              I agree to the <a href="#" className="underline font-medium">Terms & Conditions</a>
            </span>
          </label>

          {/* Submit Button */}
          <button className="w-full mt-6 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-3.5 rounded-2xl shadow-xl shadow-green-500/25 transition-all cursor-pointer">
            Register Now
          </button>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2">
            Already have an account? <a href="/" className="text-green-600 dark:text-green-400 font-bold hover:underline">Log In</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default SignUp