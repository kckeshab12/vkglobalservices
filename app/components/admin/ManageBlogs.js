"use client";

import { useState } from "react";
import { X, Plus, Edit, Trash2 } from "lucide-react";

export default function ManageBlogs({ isOpen, onClose }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    sub_title: '',
    content: '',
    message: '',
    poster: '',
    author: '',
    author_image: '',
    date: ''
  });

  const [uploading, setUploading] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/admin/blogs');
      const data = await response.json();
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
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
      let posterPath = formData.poster;
      let authorImagePath = formData.author_image;

      // Upload poster if it's a file
      if (formData.poster && formData.poster instanceof File) {
        posterPath = await handleFileUpload(formData.poster);
      }

      // Upload author image if it's a file
      if (formData.author_image && formData.author_image instanceof File) {
        authorImagePath = await handleFileUpload(formData.author_image);
      }

      const submitData = {
        ...formData,
        poster: posterPath,
        author_image: authorImagePath
      };

      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        alert('Blog created successfully!');
        setFormData({
          title: '', sub_title: '', content: '', message: '',
          poster: '', author: '', author_image: '', date: ''
        });
        setShowForm(false);
        fetchBlogs();
      } else {
        alert('Error creating blog');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating blog');
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
          <h2 className="text-2xl font-bold text-slate-900">Manage Blogs</h2>
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
              Add New Blog
            </button>
            <button
              onClick={fetchBlogs}
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
                  name="title"
                  placeholder="Blog Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  name="sub_title"
                  placeholder="Sub Title (Optional)"
                  value={formData.sub_title}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Poster Image</label>
                  <input
                    type="file"
                    name="poster"
                    accept="image/*"
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg w-full"
                  />
                  {formData.poster && typeof formData.poster === 'object' && (
                    <p className="text-sm text-slate-600 mt-1">{formData.poster.name}</p>
                  )}
                </div>
                <input
                  type="text"
                  name="author"
                  placeholder="Author Name"
                  value={formData.author}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Author Image</label>
                  <input
                    type="file"
                    name="author_image"
                    accept="image/*"
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg w-full"
                  />
                  {formData.author_image && typeof formData.author_image === 'object' && (
                    <p className="text-sm text-slate-600 mt-1">{formData.author_image.name}</p>
                  )}
                </div>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>
              <textarea
                name="content"
                placeholder="Blog Content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />
              <textarea
                name="message"
                placeholder="Additional Message (Optional)"
                value={formData.message}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : uploading ? 'Uploading...' : 'Create Blog'}
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
            {blogs.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No blogs found. Create your first blog!</p>
            ) : (
              blogs.map((blog) => (
                <div key={blog.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{blog.title}</h3>
                      {blog.sub_title && <p className="text-slate-600">{blog.sub_title}</p>}
                      <p className="text-sm text-slate-500 mt-1">
                        By {blog.author} • {new Date(blog.created_at).toLocaleDateString()}
                      </p>
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