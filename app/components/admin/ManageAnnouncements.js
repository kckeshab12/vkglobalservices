"use client";

import { useState } from "react";
import { X, Plus, Edit, Trash2 } from "lucide-react";

export default function ManageAnnouncements({ isOpen, onClose }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    highlightMessage: '',
    contents: '',
    photos: '',
    displayMode: 'popup',
    templateKey: '',
    designLayout: '',
    logoUrl: '',
    targetGuest: false,
    targetJobSeeker: false,
    targetServiceProvider: false,
    startAt: '',
    endAt: '',
    isActive: true
  });

  const fetchAnnouncements = async () => {
    try {
      const response = await fetch('/api/admin/announcements');
      const data = await response.json();
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
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
      let logoPath = formData.logoUrl;

      // Upload logo if it's a file
      if (formData.logoUrl && formData.logoUrl instanceof File) {
        logoPath = await handleFileUpload(formData.logoUrl);
      }

      const submitData = {
        ...formData,
        logoUrl: logoPath
      };

      const response = await fetch('/api/admin/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      });

      if (response.ok) {
        alert('Announcement created successfully!');
        setFormData({
          title: '', message: '', highlightMessage: '', contents: '', photos: '',
          displayMode: 'popup', templateKey: '', designLayout: '', logoUrl: '',
          targetGuest: false, targetJobSeeker: false, targetServiceProvider: false,
          startAt: '', endAt: '', isActive: true
        });
        setShowForm(false);
        fetchAnnouncements();
      } else {
        alert('Error creating announcement');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating announcement');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-900">Manage Announcements</h2>
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
              Add New Announcement
            </button>
            <button
              onClick={fetchAnnouncements}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Refresh
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-slate-50 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Announcement Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="px-3 py-2 border rounded-lg"
                />
                <select
                  name="displayMode"
                  value={formData.displayMode}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                >
                  <option value="popup">Popup</option>
                  <option value="banner">Banner</option>
                  <option value="modal">Modal</option>
                </select>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700">Logo Image</label>
                  <input
                    type="file"
                    name="logoUrl"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.logoUrl && typeof formData.logoUrl === 'object' && (
                    <p className="text-sm text-slate-600">Selected: {formData.logoUrl.name}</p>
                  )}
                  {uploading && <p className="text-sm text-blue-600">Uploading...</p>}
                </div>
                <input
                  type="datetime-local"
                  name="startAt"
                  value={formData.startAt}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
                <input
                  type="datetime-local"
                  name="endAt"
                  value={formData.endAt}
                  onChange={handleChange}
                  className="px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Target Audience:</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="targetGuest"
                      checked={formData.targetGuest}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Guests
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="targetJobSeeker"
                      checked={formData.targetJobSeeker}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Job Seekers
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="targetServiceProvider"
                      checked={formData.targetServiceProvider}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    Service Providers
                  </label>
                </div>
              </div>

              <textarea
                name="message"
                placeholder="Main Message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />

              <textarea
                name="highlightMessage"
                placeholder="Highlight Message"
                value={formData.highlightMessage}
                onChange={handleChange}
                rows={2}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />

              <textarea
                name="contents"
                placeholder="Additional Content"
                value={formData.contents}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />

              <input
                type="text"
                name="photos"
                placeholder="Photo URLs (comma-separated)"
                value={formData.photos}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg mb-4"
              />

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Announcement'}
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
            {announcements.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No announcements found. Create your first announcement!</p>
            ) : (
              announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-lg p-4 bg-white">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{announcement.title}</h3>
                      <p className="text-slate-600">{announcement.message}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          announcement.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {announcement.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                          {announcement.displayMode}
                        </span>
                      </div>
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