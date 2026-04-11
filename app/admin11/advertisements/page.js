"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Edit3,
  Eye,
  Download,
  ImagePlus,
  Plus,
  Save,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import AdvertisementPoster from "../../components/advertisements/AdvertisementPoster";

function createEmptyForm() {
  return {
    title: "",
    message: "",
    highlightMessage: "",
    contents: "",
    photos: [],
    displayMode: "poster",
    templateKey: "modern",
    designLayout: {
      palette: getDefaultDesignPalette("modern"),
      canvasSize: { width: 1080, height: 1080 },
      logo: { x: 4, y: 4, w: 12, h: 10 },
      title: { x: 4, y: 18, w: 38, h: 10 },
      highlight: { x: 4, y: 30, w: 38, h: 8 },
      message: { x: 4, y: 40, w: 38, h: 14 },
      contents: { x: 4, y: 56, w: 38, h: 16 },
      photo: { x: 46, y: 10, w: 48, h: 56 },
    },
    logoUrl: "/logo.jpeg",
    targetGuest: true,
    targetJobSeeker: true,
    targetServiceProvider: true,
    startAt: "",
    endAt: "",
    isActive: true,
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatDateTime(value) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString();
}

function getStatus(item) {
  const now = new Date();
  const start = item.startAt ? new Date(item.startAt) : null;
  const end = item.endAt ? new Date(item.endAt) : null;
  const active = Boolean(item.isActive);
  const started = !start || start <= now;
  const notEnded = !end || end >= now;

  if (!active) return { label: "Paused", tone: "slate" };
  if (started && notEnded) return { label: "Live", tone: "emerald" };
  if (start && start > now) return { label: "Scheduled", tone: "blue" };
  if (end && end < now) return { label: "Expired", tone: "rose" };
  return { label: "Draft", tone: "amber" };
}

function TargetBadge({ children, tone = "slate" }) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-100 text-emerald-700"
      : tone === "blue"
        ? "bg-blue-100 text-blue-700"
        : tone === "rose"
          ? "bg-rose-100 text-rose-700"
          : "bg-slate-100 text-slate-700";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${toneClass}`}>{children}</span>;
}

const TEMPLATE_OPTIONS = [
  { key: "modern", label: "Service", desc: "Modern corporate service layout with a clean photo split." },
  { key: "festive", label: "Festive", desc: "Best for holidays, wishes, and seasonal posters." },
  { key: "elegant", label: "Elegant", desc: "Premium look for formal notices and launches." },
  { key: "corporate", label: "Service Promotion", desc: "A polished promo layout for services and announcements." },
];

function getDefaultDesignPalette(templateKey) {
  const key = String(templateKey || "modern").toLowerCase();
  if (key === "festive") {
    return {
      primary: "#b91c1c",
      secondary: "#ea580c",
      accent: "#f59e0b",
      background: "#fff4e6",
    };
  }
  if (key === "elegant") {
    return {
      primary: "#0f0f0f",
      secondary: "#d4af37",
      accent: "#f4ead4",
      background: "#090909",
    };
  }
  if (key === "corporate") {
    return {
      primary: "#0a2540",
      secondary: "#8d1737",
      accent: "#38bdf8",
      background: "#06111f",
    };
  }
  return {
    primary: "#0a2540",
    secondary: "#133b63",
    accent: "#67e8f9",
    background: "#06111f",
  };
}

function getDefaultDesignLayout(templateKey) {
  const key = String(templateKey || "modern").toLowerCase();
  if (key === "festive") {
    return {
      palette: getDefaultDesignPalette(key),
      canvasSize: { width: 1080, height: 1080 },
      logo: { x: 42, y: 8, w: 16, h: 12 },
      title: { x: 14, y: 18, w: 72, h: 10 },
      highlight: { x: 14, y: 30, w: 72, h: 8 },
      message: { x: 14, y: 40, w: 72, h: 12 },
      contents: { x: 12, y: 84, w: 76, h: 10 },
      photo: { x: 10, y: 54, w: 80, h: 28 },
    };
  }
  if (key === "elegant") {
    return {
      palette: getDefaultDesignPalette(key),
      canvasSize: { width: 1080, height: 1080 },
      logo: { x: 43, y: 6, w: 14, h: 10 },
      title: { x: 12, y: 20, w: 76, h: 10 },
      highlight: { x: 16, y: 33, w: 68, h: 8 },
      message: { x: 18, y: 44, w: 64, h: 12 },
      contents: { x: 18, y: 58, w: 64, h: 16 },
      photo: { x: 22, y: 76, w: 56, h: 18 },
    };
  }
  if (key === "corporate") {
    return {
      palette: getDefaultDesignPalette(key),
      canvasSize: { width: 1080, height: 1080 },
      logo: { x: 4, y: 4, w: 12, h: 10 },
      title: { x: 4, y: 18, w: 36, h: 12 },
      highlight: { x: 4, y: 30, w: 36, h: 8 },
      message: { x: 4, y: 42, w: 36, h: 16 },
      contents: { x: 4, y: 60, w: 36, h: 18 },
      photo: { x: 46, y: 10, w: 48, h: 60 },
    };
  }
  return {
    palette: getDefaultDesignPalette(key),
    canvasSize: { width: 1080, height: 1080 },
    logo: { x: 4, y: 4, w: 12, h: 10 },
    title: { x: 4, y: 18, w: 38, h: 10 },
    highlight: { x: 4, y: 30, w: 38, h: 8 },
    message: { x: 4, y: 40, w: 38, h: 14 },
    contents: { x: 4, y: 56, w: 38, h: 16 },
    photo: { x: 46, y: 10, w: 48, h: 56 },
  };
}

function getExportSize(form) {
  const size = form?.designLayout?.canvasSize || { width: 1080, height: 1080 };
  const width = Number(size.width) || 1080;
  const height = Number(size.height) || 1080;
  return { width, height };
}

function wrapCanvasText(ctx, text, maxWidth) {
  const words = String(text || "").split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  words.forEach((word) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = testLine;
    }
  });
  if (line) lines.push(line);
  return lines;
}

async function loadCanvasImage(src) {
  if (!src) return null;
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

async function downloadDesignPoster(form) {
  const { width, height } = getExportSize(form);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const layout = form.designLayout || getDefaultDesignLayout(form.templateKey);
  const templateKey = String(form.templateKey || "modern").toLowerCase();
  const palette = layout.palette || getDefaultDesignPalette(templateKey);
  const bg = [palette.background, palette.primary, palette.secondary];

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, bg[0]);
  gradient.addColorStop(0.55, bg[1]);
  gradient.addColorStop(1, bg[2]);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  if (templateKey === "elegant") {
    ctx.fillStyle = palette.accent;
    ctx.fillRect(0, height - 260, width, 260);
  } else if (templateKey === "corporate") {
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(0, 0, Math.round(width * 0.45), height);
  }

  const logo = await loadCanvasImage(form.logoUrl || "/logo.jpeg");
  const mainPhoto = await loadCanvasImage(form.photos?.[0] || "");

  const drawBox = (box, draw) => {
    const x = Math.round((box.x / 100) * width);
    const y = Math.round((box.y / 100) * height);
    const w = Math.round((box.w / 100) * width);
    const h = Math.round((box.h / 100) * height);
    draw({ x, y, w, h });
  };

  drawBox(layout.logo, ({ x, y, w, h }) => {
    if (logo) {
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 20);
      ctx.fill();
      ctx.drawImage(logo, x + 10, y + 10, w - 20, h - 20);
      ctx.restore();
    }
  });

  drawBox(layout.title, ({ x, y, w, h }) => {
    ctx.fillStyle = templateKey === "elegant" ? "#f8f3e7" : "#ffffff";
    ctx.font = `800 ${Math.max(36, Math.round(h * 0.55))}px Arial`;
    const lines = wrapCanvasText(ctx, form.title || "Untitled update", w);
    let cy = y + 10;
    lines.slice(0, 3).forEach((line) => {
      ctx.fillText(line, x, cy);
      cy += Math.max(36, Math.round(h * 0.6));
    });
  });

  drawBox(layout.highlight, ({ x, y, w, h }) => {
    ctx.fillStyle = templateKey === "elegant" ? palette.secondary : "rgba(255,255,255,0.18)";
    if (templateKey !== "elegant") {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 999);
      ctx.fill();
      ctx.fillStyle = palette.accent || "#ffffff";
    }
    ctx.font = `700 ${Math.max(24, Math.round(h * 0.48))}px Arial`;
    const text = form.highlightMessage || "Highlight Message";
    const textWidth = ctx.measureText(text).width;
    const tx = x + Math.max(12, (w - textWidth) / 2);
    ctx.fillText(text, tx, y + 10);
  });

  drawBox(layout.message, ({ x, y, w, h }) => {
    ctx.fillStyle = templateKey === "elegant" ? "#f5efe2" : "#ffffff";
    ctx.font = `400 ${Math.max(22, Math.round(h * 0.24))}px Arial`;
    const lines = wrapCanvasText(ctx, form.message || "", w - 10);
    let cy = y;
    lines.slice(0, 6).forEach((line) => {
      ctx.fillText(line, x, cy);
      cy += Math.max(24, Math.round(h * 0.22));
    });
  });

  drawBox(layout.contents, ({ x, y, w, h }) => {
    ctx.fillStyle = templateKey === "elegant" ? "#f5efe2" : "#ffffff";
    ctx.font = `700 ${Math.max(20, Math.round(h * 0.18))}px Arial`;
    const lines = wrapCanvasText(ctx, form.contents || "", w - 10);
    let cy = y;
    lines.slice(0, 8).forEach((line) => {
      ctx.fillText(`• ${line}`, x, cy);
      cy += Math.max(22, Math.round(h * 0.18));
    });
  });

  drawBox(layout.photo, ({ x, y, w, h }) => {
    if (!mainPhoto) return;
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 22);
    ctx.clip();
    const ratio = mainPhoto.width / mainPhoto.height;
    let drawW = w;
    let drawH = h;
    let dx = x;
    let dy = y;
    if (ratio > w / h) {
      drawH = w / ratio;
      dy = y + (h - drawH) / 2;
    } else {
      drawW = h * ratio;
      dx = x + (w - drawW) / 2;
    }
    ctx.drawImage(mainPhoto, dx, dy, drawW, drawH);
    ctx.restore();
  });

  const link = document.createElement("a");
  link.download = `advertisement-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export default function AdvertisementsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [entryMode, setEntryMode] = useState("design");
  const [form, setForm] = useState(createEmptyForm());

  const loadItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/status?feature=advertisements&scope=admin", {
        cache: "no-store",
      });
      const data = await res.json();
      setItems(Array.isArray(data.rows) ? data.rows : []);
    } catch (error) {
      console.error("Failed to load advertisements:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [
        item.title,
        item.message,
        item.highlightMessage,
        item.contents,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }, [items, search]);

  const stats = useMemo(() => {
    const live = items.filter((item) => getStatus(item).label === "Live").length;
    const scheduled = items.filter((item) => getStatus(item).label === "Scheduled").length;
    const paused = items.filter((item) => getStatus(item).label === "Paused").length;
    return { total: items.length, live, scheduled, paused };
  }, [items]);

  const previewItem = useMemo(
    () => ({
      ...form,
      id: "draft",
      logoUrl: form.logoUrl || "/logo.jpeg",
      designLayout: form.designLayout || getDefaultDesignLayout(form.templateKey || "modern"),
    }),
    [form]
  );

  const handleChange = (field, value) => {
    setForm((prev) => {
      if (field === "templateKey") {
        return {
          ...prev,
          templateKey: value,
          designLayout: getDefaultDesignLayout(value),
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const updatePalette = (field, value) => {
    setForm((prev) => {
      const currentLayout = prev.designLayout || getDefaultDesignLayout(prev.templateKey || "modern");
      return {
        ...prev,
        designLayout: {
          ...currentLayout,
          palette: {
            ...(currentLayout.palette || getDefaultDesignPalette(prev.templateKey || "modern")),
            [field]: value,
          },
        },
      };
    });
  };

  const updateCanvasSize = (field, value) => {
    const nextValue = Math.max(1, Number(value) || 0);
    setForm((prev) => {
      const currentLayout = prev.designLayout || getDefaultDesignLayout(prev.templateKey || "modern");
      return {
        ...prev,
        designLayout: {
          ...currentLayout,
          canvasSize: {
            ...(currentLayout.canvasSize || { width: 1080, height: 1080 }),
            [field]: nextValue,
          },
        },
      };
    });
  };

  const selectEntryMode = (mode) => {
    setEntryMode(mode);
    setForm((prev) => ({
      ...prev,
      displayMode: mode === "upload" ? "photo" : "poster",
    }));
  };

  const handleAudience = (field) => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    try {
      const uploads = await Promise.all(files.map(readFileAsDataUrl));
      setForm((prev) => ({ ...prev, photos: [...prev.photos, ...uploads] }));
      e.target.value = "";
    } catch (error) {
      console.error("Failed to read photos:", error);
      alert("Unable to process the selected photos.");
    }
  };

  const removePhoto = (index) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, current) => current !== index),
    }));
  };

  const resetForm = () => {
    setEditingId(null);
    setEntryMode("design");
    setForm(createEmptyForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (entryMode === "design" && (!form.title.trim() || !form.message.trim() || form.photos.length === 0)) {
      alert("Title, message, and photos are required for design templates.");
      return;
    }
    if (entryMode === "upload" && form.photos.length === 0) {
      alert("Upload at least one photo for photo mode.");
      return;
    }
    if (!form.targetGuest && !form.targetJobSeeker && !form.targetServiceProvider) {
      alert("Select at least one portal to display this content.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
          action: "saveAdvertisement",
          id: editingId,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to save advertisement");
      }
      await loadItems();
      resetForm();
      alert("Advertisement saved successfully.");
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to save advertisement");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEntryMode((item.displayMode || (Array.isArray(item.photos) && item.photos.length > 0 ? "photo" : "poster")) === "photo" ? "upload" : "design");
    setForm({
      title: item.title || "",
      message: item.message || "",
      highlightMessage: item.highlightMessage || "",
      contents: item.contents || "",
      photos: Array.isArray(item.photos) ? item.photos : [],
      displayMode: item.displayMode || (Array.isArray(item.photos) && item.photos.length > 0 ? "photo" : "poster"),
      templateKey: item.templateKey || "modern",
      designLayout: item.designLayout ? { ...getDefaultDesignLayout(item.templateKey || "modern"), ...item.designLayout, palette: { ...getDefaultDesignPalette(item.templateKey || "modern"), ...(item.designLayout.palette || {}) } } : getDefaultDesignLayout(item.templateKey || "modern"),
      logoUrl: item.logoUrl || "/logo.jpeg",
      targetGuest: Boolean(item.targetGuest),
      targetJobSeeker: Boolean(item.targetJobSeeker),
      targetServiceProvider: Boolean(item.targetServiceProvider),
      startAt: item.startAt ? String(item.startAt).slice(0, 16) : "",
      endAt: item.endAt ? String(item.endAt).slice(0, 16) : "",
      isActive: Boolean(item.isActive),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this advertisement?")) return;
    try {
      const res = await fetch(`/api/admin/status?feature=advertisements&id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to delete advertisement");
      }
      await loadItems();
      if (editingId === id) resetForm();
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to delete advertisement");
    }
  };

  const clearSearch = () => setSearch("");

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-700/40 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 p-6 text-white">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-300">
          <Sparkles className="h-4 w-4" />
          System Control
        </div>
        <h1 className="mt-2 text-2xl font-semibold md:text-3xl">Advertisements</h1>
        <p className="mt-2 text-sm text-slate-200">
          Create scheduled updates, messages, and promotional banners for the guest page, job seeker portal, and service provider portal.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Stat label="Total" value={stats.total} />
          <Stat label="Live" value={stats.live} />
          <Stat label="Scheduled" value={stats.scheduled} />
          <Stat label="Paused" value={stats.paused} />
        </div>
      </section>

      <form onSubmit={handleSubmit} className="sp-card space-y-6 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{editingId ? "Edit Advertisement" : "Create Advertisement"}</h2>
            <p className="text-sm text-slate-500">
              Pick a creation mode, choose the target portals, and schedule when it should appear.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" />
              New
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : editingId ? "Update" : "Publish"}
            </button>
          </div>
        </div>

        {entryMode === "design" ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Announcement title" />
              <Field label="Highlight Message" value={form.highlightMessage} onChange={(e) => handleChange("highlightMessage", e.target.value)} placeholder="Short highlighted line" />
            </div>

            <Field
              label="Message"
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Main announcement text"
              textarea
            />

            <Field
              label="Contents"
              value={form.contents}
              onChange={(e) => handleChange("contents", e.target.value)}
              placeholder="Long-form content, details, instructions, or call to action"
              textarea
              rows={5}
            />

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <ImagePlus className="h-4 w-4 text-blue-700" />
                Photos
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Upload one or more photos that will be placed into the chosen design template.
              </p>
              <div className="mt-3">
                <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="block w-full text-sm" />
              </div>
              {form.photos.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {form.photos.map((photo, index) => (
                    <div key={`${photo.slice(0, 18)}-${index}`} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <img src={photo} alt={`Design photo ${index + 1}`} className="h-32 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                  Upload photos to power the design template.
                </div>
              )}
            </div>
          </>
        ) : null}

        <div className="grid gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => selectEntryMode("upload")}
            className={`rounded-3xl border-2 px-5 py-5 text-left transition ${
              entryMode === "upload"
                ? "border-blue-600 bg-blue-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">Upload Templates</p>
                <p className="mt-1 text-sm text-slate-600">
                  Upload a designed poster image, choose the audience, set the timeline, and publish.
                </p>
              </div>
              <ImagePlus className={`h-7 w-7 ${entryMode === "upload" ? "text-blue-700" : "text-slate-400"}`} />
            </div>
          </button>

          <button
            type="button"
            onClick={() => selectEntryMode("design")}
            className={`rounded-3xl border-2 px-5 py-5 text-left transition ${
              entryMode === "design"
                ? "border-blue-600 bg-blue-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-slate-900">Design Templates</p>
                <p className="mt-1 text-sm text-slate-600">
                  Create and edit the advertisement design here with the live poster template.
                </p>
              </div>
              <Wand2 className={`h-7 w-7 ${entryMode === "design" ? "text-blue-700" : "text-slate-400"}`} />
            </div>
          </button>
        </div>

        {entryMode === "design" ? (
          <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Wand2 className="h-4 w-4 text-blue-700" />
                Design Template Mode
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Use the editor to compose the poster and choose a design template before publishing.
              </p>
              <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">
                Manual design uses the live poster renderer. Switch to Upload Templates if you already have a finished design file.
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    <Sparkles className="h-4 w-4 text-blue-700" />
                    Style
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Choose the visual style for the poster.</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {TEMPLATE_OPTIONS.map((template) => (
                  <button
                    key={template.key}
                    type="button"
                    onClick={() => handleChange("templateKey", template.key)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      form.templateKey === template.key
                        ? "border-blue-500 bg-blue-50 shadow-sm"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-slate-900">{template.label}</p>
                      {form.templateKey === template.key ? (
                        <CheckCircle2 className="h-4 w-4 text-blue-700" />
                      ) : null}
                    </div>
                  <p className="mt-2 text-sm text-slate-600">{template.desc}</p>
                </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Sparkles className="h-4 w-4 text-blue-700" />
                Color Selection
              </div>
              <p className="mt-1 text-sm text-slate-500">Match the poster tone by adjusting the four core colors.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["primary", "Primary"],
                  ["secondary", "Secondary"],
                  ["accent", "Accent"],
                  ["background", "Background"],
                ].map(([key, label]) => {
                  const current = (form.designLayout?.palette?.[key]) || getDefaultDesignPalette(form.templateKey)[key];
                  return (
                    <label key={key} className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm">
                      <span className="font-semibold text-slate-800">{label}</span>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={current}
                          onChange={(e) => updatePalette(key, e.target.value)}
                          className="h-10 w-14 cursor-pointer rounded-lg border border-slate-300 bg-white p-1"
                        />
                        <input
                          type="text"
                          value={current}
                          onChange={(e) => updatePalette(key, e.target.value)}
                          className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Eye className="h-4 w-4 text-blue-700" />
                Canvas Size
              </div>
              <p className="mt-1 text-sm text-slate-500">Default is 1080 × 1080. You can switch or fine tune the poster size below.</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { width: 1080, height: 1080, label: "Square" },
                  { width: 1080, height: 1350, label: "Portrait" },
                  { width: 1080, height: 1920, label: "Story" },
                ].map((size) => {
                  const activeWidth = Number(form.designLayout?.canvasSize?.width || 1080);
                  const activeHeight = Number(form.designLayout?.canvasSize?.height || 1080);
                  const active = activeWidth === size.width && activeHeight === size.height;
                  return (
                    <button
                      key={`${size.width}x${size.height}`}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          designLayout: {
                            ...(prev.designLayout || getDefaultDesignLayout(prev.templateKey || "modern")),
                            canvasSize: { width: size.width, height: size.height },
                          },
                        }))
                      }
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        active
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div>{size.label}</div>
                      <div className="mt-1 text-xs font-medium opacity-80">
                        {size.width} × {size.height}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-800">
                  Width
                  <input
                    type="number"
                    min="200"
                    step="10"
                    value={form.designLayout?.canvasSize?.width || 1080}
                    onChange={(e) => updateCanvasSize("width", e.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-800">
                  Height
                  <input
                    type="number"
                    min="200"
                    step="10"
                    value={form.designLayout?.canvasSize?.height || 1080}
                    onChange={(e) => updateCanvasSize("height", e.target.value)}
                    className="rounded-xl border border-slate-300 px-4 py-2 font-normal outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <ImagePlus className="h-4 w-4 text-blue-700" />
              Upload Template Mode
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Upload your finished advertisement image here. No manual text or template setup is required.
            </p>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <ImagePlus className="h-4 w-4 text-blue-700" />
                Upload attachment
              </div>
              <p className="mt-1 text-sm text-slate-500">Upload a finished advertisement image in photo format.</p>
              <div className="mt-3">
                <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="block w-full text-sm" />
              </div>
              {form.photos.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {form.photos.map((photo, index) => (
                    <div key={`${photo.slice(0, 18)}-${index}`} className="relative overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <img src={photo} alt={`Preview ${index + 1}`} className="h-32 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
                  Upload an image to preview it here.
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Start Date" type="datetime-local" value={form.startAt} onChange={(e) => handleChange("startAt", e.target.value)} />
          <Field label="End Date" type="datetime-local" value={form.endAt} onChange={(e) => handleChange("endAt", e.target.value)} />
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-sm font-semibold text-slate-800">Status</p>
            <label className="mt-3 inline-flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.isActive} onChange={() => handleChange("isActive", !form.isActive)} />
              Active on portal
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Eye className="h-4 w-4 text-blue-700" />
            Targets
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            <Toggle label="Guest Page" checked={form.targetGuest} onChange={() => handleAudience("targetGuest")} />
            <Toggle label="Job Seeker Page" checked={form.targetJobSeeker} onChange={() => handleAudience("targetJobSeeker")} />
            <Toggle label="Service Provider Page" checked={form.targetServiceProvider} onChange={() => handleAudience("targetServiceProvider")} />
          </div>
        </div>

        {entryMode === "design" ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                <Eye className="h-4 w-4 text-blue-700" />
                Live Preview
              </div>
              <button
                type="button"
                onClick={() => downloadDesignPoster(previewItem)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <Download className="h-4 w-4" />
                Download PNG
              </button>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              This is how the item will appear in the portal using the current content and template selection.
            </p>
            <div className="mt-4">
              <AdvertisementPoster
                item={previewItem}
                audienceLabel=""
                compact={false}
                editable
                onLayoutChange={(nextLayout) => handleChange("designLayout", nextLayout)}
                onContentChange={(field, value) => handleChange(field, value)}
              />
            </div>
          </div>
        ) : null}
      </form>

      <section className="sp-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Published Items</h2>
            <p className="text-sm text-slate-500">
              Review and manage every announcement stored in the database.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search announcements..."
              className="w-full rounded-xl border border-slate-300 px-4 py-2 text-sm md:w-72"
            />
            <button
              type="button"
              onClick={clearSearch}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={loadItems}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
            Loading advertisements...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-500">
            No advertisements found.
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">S.N.</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Targets</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Timeline</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredItems.map((item, index) => {
                    const status = getStatus(item)
                    const photos = Array.isArray(item.photos) ? item.photos.filter(Boolean) : []
                    const isPhotoMode = item.displayMode === "photo" && photos.length > 0
                    const targets = [
                      item.targetGuest ? "Guest" : null,
                      item.targetJobSeeker ? "Job Seeker" : null,
                      item.targetServiceProvider ? "Service Provider" : null,
                    ].filter(Boolean).join(" | ") || "None"

                    return (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900">{index + 1}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <TargetBadge tone={isPhotoMode ? "blue" : "emerald"}>{isPhotoMode ? "Upload Template" : "Design Template"}</TargetBadge>
                            {item.templateKey ? <TargetBadge tone="slate">{item.templateKey}</TargetBadge> : null}
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="max-w-[300px]">
                            <p className="font-semibold text-slate-900">{item.title || (isPhotoMode ? "Uploaded Template" : "Designed Template")}</p>
                            <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                              {isPhotoMode
                                ? "Uploaded poster image published through selected portal and timeline."
                                : "Template designed from title, highlight, message, contents, photos, and logo."}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-slate-600">{targets}</td>
                        <td className="px-4 py-4 text-sm text-slate-600">
                          {formatDateTime(item.startAt)}
                          <span className="mx-1 text-slate-300">-&gt;</span>
                          {item.endAt ? formatDateTime(item.endAt) : "Open"}
                        </td>
                        <td className="px-4 py-4">
                          <TargetBadge tone={status.tone}>{status.label}</TargetBadge>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(item)}
                              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item.id)}
                              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-white">
      <p className="text-xs uppercase tracking-[0.12em] text-slate-200">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, textarea = false, rows = 4, type = "text" }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-semibold text-slate-900">{label}</span>
      {textarea ? (
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      )}
    </label>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <span className="text-sm font-medium text-slate-800">{label}</span>
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-blue-600" />
    </label>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}
