"use client";

import { useEffect, useState } from "react";
import { Edit, Plus, Trash2, X } from "lucide-react";

export default function ManageTrustedClients({ isOpen, onClose }) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    logoFile: null,
  });

  useEffect(() => {
    if (isOpen) {
      fetchClients();
    }
  }, [isOpen]);

  const fetchClients = async () => {
    try {
      const response = await fetch("/api/admin/trusted-clients");
      const data = await response.json();
      setClients(Array.isArray(data.clients) ? data.clients : []);
    } catch (error) {
      console.error("Error fetching trusted clients:", error);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return "";

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();
      return data.success ? data.filePath : "";
    } catch (error) {
      console.error("Upload error:", error);
      return "";
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, logoFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let logoPath = "";
      if (formData.logoFile instanceof File) {
        logoPath = await handleFileUpload(formData.logoFile);
      }

      const response = await fetch("/api/admin/trusted-clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: formData.clientId.trim(),
          name: formData.name.trim(),
          logoPath,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to save client");
      }

      setFormData({ clientId: "", name: "", logoFile: null });
      setShowForm(false);
      fetchClients();
    } catch (error) {
      console.error("Error saving trusted client:", error);
      alert(error.message || "Failed to save client");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this client?")) return;

    try {
      const response = await fetch(`/api/admin/trusted-clients?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to delete client");
      }
      fetchClients();
    } catch (error) {
      console.error("Error deleting trusted client:", error);
      alert(error.message || "Failed to delete client");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#ead9dd] p-6">
          <h2 className="text-2xl font-bold text-[#21161A]">Manage Trusted Clients</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-[#7A1C2F]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#7A1C2F] px-4 py-2 text-white hover:bg-[#651726]"
            >
              <Plus className="h-4 w-4" />
              Add Client
            </button>
            <button
              onClick={fetchClients}
              className="rounded-lg border border-[#d8c6cb] bg-white px-4 py-2 text-[#7A1C2F] hover:bg-[#F7EEF1]"
            >
              Refresh
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="mb-6 rounded-2xl border border-[#ead9dd] bg-[#F8FBFF] p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleChange}
                  placeholder="Client ID"
                  className="rounded-xl border border-[#d8c6cb] px-4 py-3 outline-none focus:border-[#7A1C2F]"
                  required
                />
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Client Name"
                  className="rounded-xl border border-[#d8c6cb] px-4 py-3 outline-none focus:border-[#7A1C2F]"
                  required
                />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#4b3340]">Upload Logo From Device</label>
                  <input
                    type="file"
                    name="logoFile"
                    accept="image/*"
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-xl border border-[#d8c6cb] bg-white px-4 py-3"
                    required
                  />
                  {formData.logoFile ? (
                    <p className="mt-2 text-sm text-[#6a4a55]">Selected: {formData.logoFile.name}</p>
                  ) : null}
                  {uploading ? <p className="mt-2 text-sm text-[#7A1C2F]">Uploading...</p> : null}
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[#7A1C2F] px-4 py-2 text-white hover:bg-[#651726] disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Client"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-xl border border-[#d8c6cb] bg-white px-4 py-2 text-[#4b3340]"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {clients.length === 0 ? (
              <p className="col-span-full rounded-2xl border border-dashed border-[#d8c6cb] bg-[#F8FBFF] p-8 text-center text-[#6a4a55]">
                No trusted clients added yet.
              </p>
            ) : (
              clients.map((client) => (
                <div key={client.id} className="rounded-2xl border border-[#ead9dd] bg-white p-4 shadow-sm">
                  <div className="aspect-video overflow-hidden rounded-xl bg-[#F8FBFF]">
                    <img src={client.logoUrl} alt={client.name} className="h-full w-full object-contain p-4" />
                  </div>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">{client.clientId}</p>
                  <h3 className="mt-1 text-lg font-semibold text-[#21161A]">{client.name}</h3>
                  <div className="mt-4 flex justify-end gap-2">
                    <button className="rounded-lg border border-[#d8c6cb] px-3 py-2 text-[#4b3340] hover:bg-[#F8FBFF]">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="rounded-lg border border-[#d8c6cb] px-3 py-2 text-[#7A1C2F] hover:bg-[#F7EEF1]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
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
