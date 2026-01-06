import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

/* ======================
   API CONFIG
====================== */
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* ======================
   FORM FIELDS
====================== */
const signupFields = [
  { name: "Name", type: "text", id: "name", placeholder: "Your Full Name" },
  { name: "Phone Number", type: "tel", id: "phone", placeholder: "+8801XXXXXXXXX" },
  { name: "Email", type: "email", id: "email", placeholder: "name@email.com" },
  { name: "Password", type: "password", id: "password", placeholder: "••••••••" },
  { name: "Confirm Password", type: "password", id: "confirmPassword", placeholder: "••••••••" },
];

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "others",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ======================
     HANDLE INPUT
  ====================== */
  const handleChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    const field = id || name;

    setFormData((prev) => ({
      ...prev,
      [field]: type === "checkbox" ? checked : value,
    }));
  };

  /* ======================
     SUBMIT
  ====================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("❌ Passwords do not match");
    }

    if (!formData.agree) {
      return alert("❌ Please agree to Terms & Conditions");
    }

    setLoading(true);

    try {
      const res = await API.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        gender: formData.gender,
      });

      alert("✅ Registration successful!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ======================
     UI
  ====================== */
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-green-50 dark:from-slate-950 dark:to-slate-900 p-4">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white/70 dark:bg-slate-900/80 shadow-2xl backdrop-blur-xl border border-white dark:border-slate-800">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-black text-slate-800 dark:text-white">
            Create Account
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Join YT Chat to start messaging
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          {signupFields.map((field) => {
            const isPassword = field.type === "password";
            const isConfirm = field.id === "confirmPassword";

            const inputType = isPassword
              ? isConfirm
                ? showConfirmPassword
                  ? "text"
                  : "password"
                : showPassword
                  ? "text"
                  : "password"
              : field.type;

            return (
              <div key={field.id}>
                <label className="text-xs font-bold uppercase text-slate-500">
                  {field.name}
                </label>

                <div className="relative">
                  <input
                    id={field.id}
                    type={inputType}
                    value={formData[field.id]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full p-3 rounded-2xl border bg-white/50 dark:bg-slate-800 pr-12"
                  />

                  {isPassword && (
                    <button
                      type="button"
                      onClick={() =>
                        isConfirm
                          ? setShowConfirmPassword(!showConfirmPassword)
                          : setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {isConfirm
                        ? showConfirmPassword
                          ? <EyeOff size={18} />
                          : <Eye size={18} />
                        : showPassword
                          ? <EyeOff size={18} />
                          : <Eye size={18} />}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Gender */}
          <div>
            <label className="text-xs font-bold uppercase text-slate-500">
              Gender
            </label>
            <div className="flex gap-2">
              {["male", "female", "others"].map((g) => (
                <label key={g} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={handleChange}
                    className="hidden peer"
                  />
                  <div className="p-2 text-center rounded-xl border peer-checked:bg-green-500 peer-checked:text-white">
                    {g.charAt(0).toUpperCase() + g.slice(1)}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Agree */}
          <label className="flex gap-2 text-xs">
            <input
              type="checkbox"
              id="agree"
              checked={formData.agree}
              onChange={handleChange}
            />
            I agree to Terms & Conditions
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-2xl"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <button onClick={() => navigate("/")} className="text-green-600">
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
