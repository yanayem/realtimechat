import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  // Get user data from localStorage initially
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [user, setUser] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
    gender: storedUser.gender || "",
    avatar: storedUser.avatar || "", // profile picture
  });

  const [avatarFile, setAvatarFile] = useState(null); // for upload
  const [loading, setLoading] = useState(false);

  // Fetch user from backend (optional)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchUser();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle profile pic selection
  const handleFileChange = (e) => {
    setAvatarFile(e.target.files[0]);
    setUser({ ...user, avatar: URL.createObjectURL(e.target.files[0]) });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("phone", user.phone);
      formData.append("gender", user.gender);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/profile`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <form onSubmit={handleSubmit} className="bg-slate-900 rounded-xl p-6 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-700">
            {user.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-xl flex items-center justify-center h-full">?</span>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        {/* Profile fields */}
        <ProfileRow label="Name">
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="bg-slate-800 rounded p-2 w-full text-white"
            required
          />
        </ProfileRow>

        <ProfileRow label="Email">
          <input
            type="email"
            name="email"
            value={user.email}
            disabled
            className="bg-slate-700 rounded p-2 w-full text-slate-400 cursor-not-allowed"
          />
        </ProfileRow>

        <ProfileRow label="Phone">
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="bg-slate-800 rounded p-2 w-full text-white"
          />
        </ProfileRow>

        <ProfileRow label="Gender">
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="bg-slate-800 rounded p-2 w-full text-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </ProfileRow>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-xl text-white font-bold transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

const ProfileRow = ({ label, children }) => (
  <div className="flex flex-col gap-1">
    <label className="text-slate-400 font-medium">{label}</label>
    {children}
  </div>
);

export default Profile;
