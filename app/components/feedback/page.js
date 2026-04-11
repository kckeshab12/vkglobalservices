"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function FeedbackForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
    attachment: null,
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) data.append(key, formData[key]);
      });

      const res = await fetch("/api/feedback", { method: "POST", body: data });
      const result = await res.json();

      if (result.status === "success") {
        setSuccessMessage("Feedback Submitted Successfully!");
        setFormData({ name: "", email: "", number: "", message: "", attachment: null });
        setTimeout(() => router.push("/"), 1500);
      } else {
        alert(result.message || "Submission failed!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 flex items-center justify-center px-4 py-12">
      {/* Home Button */}
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-4 p-2 rounded-full bg-white shadow-md hover:bg-indigo-100 transition z-10"
      >
        <Home className="w-6 h-6 text-indigo-600" />
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn"
      >
        <div className="col-span-1 md:col-span-2 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 mb-2">
            We Value Your Feedback
          </h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Help us improve by sharing your thoughts 💡
          </p>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="number"
            value={formData.number}
            onChange={handleChange}
            placeholder="+977 9812345678"
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* Attachment */}
        <div>
          <label className="block mb-2 font-medium text-gray-700">Attachment</label>
          <input
            type="file"
            name="attachment"
            accept="image/*,application/pdf"
            onChange={handleChange}
            className="w-full text-gray-700"
          />
          <p className="text-xs text-gray-400 mt-1">
            Optional: Upload screenshot or document
          </p>
        </div>

        {/* Message */}
        <div className="col-span-1 md:col-span-2">
          <label className="block mb-2 font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your feedback..."
            rows={5}
            required
            className="w-full p-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
          />
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2 text-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full md:w-1/2 py-3 font-semibold rounded-xl shadow-md text-white transition transform hover:scale-105 ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

          {successMessage && (
            <p className="mt-4 text-green-600 font-medium text-lg animate-bounce">
              {successMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
