"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const endpoint = isLogin ? "/api/admin/login" : "/api/admin/register";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        if (isLogin) {
          setTimeout(() => {
            router.push("/admin11");
          }, 1500); // Show message for 1.5 seconds before redirect
        } else {
          setMessage("Registration submitted. Please wait for approval.");
        }
      } else {
        setMessage(data.error || "An error occurred");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#fff8fa_0%,#f8fbff_48%,#ffffff_100%)] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-[#ead9dd]">
        <h1 className="text-2xl font-bold text-[#21161A] text-center mb-8">
          Admin {isLogin ? "Login" : "Registration"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#4b3340] mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#d8c6cb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C2F]"
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#4b3340] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-[#d8c6cb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C2F]"
              />
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#4b3340] mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-[#d8c6cb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A1C2F]"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg ${message.includes("error") || message.includes("Error") ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-[#F7EEF1] text-[#7A1C2F] border border-[#d8c6cb]"}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#7A1C2F] text-white py-2 px-4 rounded-lg hover:bg-[#651726] focus:outline-none focus:ring-2 focus:ring-[#7A1C2F] disabled:opacity-50"
          >
            {loading ? "Processing..." : (isLogin ? "Login" : "Register")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#7A1C2F] hover:text-[#651726]"
          >
            {isLogin ? "Need to register?" : "Already have an account?"}
          </button>
        </div>
      </div>
    </div>
  );
}
