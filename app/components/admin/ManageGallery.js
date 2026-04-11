"use client";

import { useState } from "react";
import { X, Plus, Edit, Trash2 } from "lucide-react";

export default function ManageGallery({ isOpen, onClose }) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'photo',
    url: '',
    title: '',
    description: ''
  });

  const fetchGallery = async () => {
    try {
      const response = await fetch('/api/admin/gallery');
      const data = await response.json();
      setGallery(data.gallery || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
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
      let mediaPath = formData.url;

      // Upload media if it's a file
      if (formData.url && formData.url instanceof File) {
        mediaPath = await handleFileUpload(formData.url);
      }

      const submitData = {
        ...formData,
        url: mediaPath
      };

      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        alert('Gallery item created successfully!');
        setFormData({ type: 'photo', url: '', title: '', description: '' });
        setShowForm(false);
        fetchGallery();
      } else {
        alert('Error creating gallery item');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating gallery item');
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
          <h2 className="text-2xl font-bold text-slate-900">Manage Gallery</h2>
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
              Add New Item
            </button>
            <button
              onClick={fetchGallery}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Refresh
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-slate-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="photo">Photo</option>
                  <option value="video">Video</option>
                </select>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Media File</label>
                  <input
                    type="file"
                    name="url"
                    accept="image/*,video/*"
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.url && typeof formData.url === 'object' && (
                    <p className="text-sm text-slate-600">Selected: {formData.url.name}</p>
                  )}
                  {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Add to Gallery'}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {gallery.length === 0 ? (
              <p className="col-span-full text-center text-slate-500 py-8">No gallery items found. Add your first item!</p>
            ) : (
              gallery.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 bg-white">
                  <div className="aspect-video bg-slate-100 rounded mb-3 overflow-hidden">
                    {item.type === 'video' ? (
                      <video src={item.url} className="w-full h-full object-cover" />
                    ) : (
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <h3 className="font-semibold">{item.title || 'Untitled'}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {item.type}
                    </span>
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