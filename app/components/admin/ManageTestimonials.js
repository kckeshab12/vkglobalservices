"use client";

import { useState } from "react";
import { X, Plus, Edit, Trash2 } from "lucide-react";

export default function ManageTestimonials({ isOpen, onClose }) {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    message: '',
    image: ''
  });

  const [uploading, setUploading] = useState(false);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials');
      const data = await response.json();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return '';

    setUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload
      });

      const data = await response.json();
      if (data.success) {
        return data.filePath;
      } else {
        alert('File upload failed');
        return '';
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('File upload failed');
      return '';
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = formData.image;

      // Upload image if it's a file
      if (formData.image && formData.image instanceof File) {
        imagePath = await handleFileUpload(formData.image);
      }

      const submitData = {
        ...formData,
        image: imagePath
      };

      const response = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        alert('Testimonial created successfully!');
        setFormData({ name: '', position: '', message: '', image: '' });
        setShowForm(false);
        fetchTestimonials();
      } else {
        alert('Error creating testimonial');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-900">Manage Testimonials</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add New Testimonial
            </button>
            <button
              onClick={fetchTestimonials}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Refresh
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Customer Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="position"
                  placeholder="Position/Company"
                  value={formData.position}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Profile Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.image && typeof formData.image === 'object' && (
                    <p className="text-sm text-slate-600">Selected: {formData.image.name}</p>
                  )}
                  {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
                </div>
              </div>
              <textarea
                name="message"
                placeholder="Testimonial Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Testimonial'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {testimonials.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No testimonials found. Create your first testimonial!</p>
            ) : (
              testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      {testimonial.position && <p className="text-slate-600">{testimonial.position}</p>}
                      <p className="text-slate-700 mt-2">&quot;{testimonial.message}&quot;</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
