"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  GalleryHorizontal,
  HeartHandshake,
  ImageUp,
  LayoutDashboard,
  MessageSquareText,
  MonitorPlay,
  Newspaper,
  Sparkles,
  Users,
} from "lucide-react";
import ManageAnnouncements from "./ManageAnnouncements";
import ManageBlogs from "./ManageBlogs";
import ManageContactMessages from "./ManageContactMessages";
import ManageGallery from "./ManageGallery";
import ManageHeroMedia from "./ManageHeroMedia";
import ManageTestimonials from "./ManageTestimonials";
import ManageTrustedClients from "./ManageTrustedClients";

const sections = [
  {
    key: "overview",
    title: "Overview",
    label: "Dashboard",
    description: "A calm home base for the admin area. Use the sidebar to jump into each content module.",
    icon: LayoutDashboard,
    accent: "from-[#7A1C2F] to-[#B45D73]",
    highlights: [
      "See the core admin modules in one place.",
      "Open the matching manager whenever you need to edit content.",
      "Keep the public site updated without hunting through separate screens.",
    ],
    actionLabel: "Review workspace",
  },
  {
    key: "contact",
    title: "Contact Messages",
    label: "Inbox",
    description: "Review inquiries from the contact form and keep communication moving quickly.",
    icon: MessageSquareText,
    accent: "from-[#1F6F8B] to-[#67A5C0]",
    highlights: [
      "Read new form submissions in a single place.",
      "Track message details before replying.",
      "Keep leads from slipping through the cracks.",
    ],
    actionLabel: "Open inbox",
  },
  {
    key: "blogs",
    title: "Blogs",
    label: "Publishing",
    description: "Create articles, update announcements, and keep the content feed fresh.",
    icon: Newspaper,
    accent: "from-[#4D6CFA] to-[#89A7FF]",
    highlights: [
      "Add new posts with titles, authors, and media.",
      "Keep the blog feed current for visitors.",
      "Use it for updates, news, and long-form content.",
    ],
    actionLabel: "Manage posts",
  },
  {
    key: "gallery",
    title: "Gallery",
    label: "Media",
    description: "Upload photos and videos for the public gallery block and other media displays.",
    icon: GalleryHorizontal,
    accent: "from-[#2C7DA0] to-[#8BD3E6]",
    highlights: [
      "Add photo and video items from one form.",
      "Keep the visual showcase aligned with the site.",
      "Support recent project highlights and campaigns.",
    ],
    actionLabel: "Manage gallery",
  },
  {
    key: "trusted-clients",
    title: "Trusted Clients",
    label: "Brand strip",
    description: "Add client names and logos to keep the trusted-client showcase clean and compact.",
    icon: HeartHandshake,
    accent: "from-[#7A1C2F] to-[#E08AA0]",
    highlights: [
      "Store client IDs and names alongside logos.",
      "Keep the logo strip tidy for the public view.",
      "Update brand partners without touching the layout.",
    ],
    actionLabel: "Update clients",
  },
  {
    key: "testimonials",
    title: "Testimonials",
    label: "Social proof",
    description: "Collect and edit testimonials that strengthen trust on the public site.",
    icon: Users,
    accent: "from-[#E07A5F] to-[#F2C6B4]",
    highlights: [
      "Record names, positions, and quotes.",
      "Refresh customer stories whenever needed.",
      "Keep social proof current and polished.",
    ],
    actionLabel: "Edit testimonials",
  },
  {
    key: "announcements",
    title: "Announcements",
    label: "Notices",
    description: "Publish notices, greetings, and time-sensitive updates for the site audience.",
    icon: Bell,
    accent: "from-[#D9A441] to-[#F6D98D]",
    highlights: [
      "Set display mode, timing, and audience targeting.",
      "Share company updates and important notices.",
      "Keep the public-facing alerts organized.",
    ],
    actionLabel: "Post announcement",
  },
  {
    key: "hero-media",
    title: "Hero Media",
    label: "Homepage",
    description: "Manage the rotating background media that powers the homepage hero area.",
    icon: MonitorPlay,
    accent: "from-[#2C7DA0] to-[#B8E0FF]",
    highlights: [
      "Upload hero photos or video clips.",
      "Mark the active media for the homepage.",
      "Control the first impression visitors see.",
    ],
    actionLabel: "Update hero",
  },
];

const previewSources = {
  contact: {
    endpoint: "/api/admin/contact-messages",
    dataKey: "messages",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "email", label: "Email", type: "email", required: true },
      { key: "topic", label: "Topic", type: "text" },
      { key: "message", label: "Message", type: "textarea", required: true },
    ],
    title: (item) => item.name || "Untitled message",
    meta: (item) => [item.email, item.topic].filter(Boolean).join(" - "),
    body: (item) => item.message || "No message text provided.",
  },
  blogs: {
    endpoint: "/api/admin/blogs",
    dataKey: "blogs",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "sub_title", label: "Subtitle", type: "text" },
      { key: "content", label: "Content", type: "textarea", required: true },
      { key: "message", label: "Message", type: "textarea" },
      { key: "poster", label: "Poster URL", type: "text" },
      { key: "author", label: "Author", type: "text" },
      { key: "author_image", label: "Author Image URL", type: "text" },
      { key: "date", label: "Date", type: "text" },
    ],
    title: (item) => item.title || "Untitled blog",
    meta: (item) => [item.author, item.date || item.created_at].filter(Boolean).join(" - "),
    body: (item) => item.sub_title || item.content || "No summary available.",
  },
  gallery: {
    endpoint: "/api/admin/gallery",
    dataKey: "gallery",
    fields: [
      { key: "type", label: "Type", type: "select", options: ["photo", "video"] },
      { key: "url", label: "Media URL", type: "text", required: true },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    title: (item) => item.title || "Untitled media",
    meta: (item) => [item.type].filter(Boolean).join(" - "),
    body: (item) => item.description || "No description available.",
  },
  "trusted-clients": {
    endpoint: "/api/admin/trusted-clients",
    dataKey: "clients",
    fields: [
      { key: "clientId", label: "Client ID", type: "text", required: true },
      { key: "name", label: "Name", type: "text", required: true },
      { key: "logoUrl", label: "Logo URL", type: "text", required: true },
    ],
    title: (item) => item.name || "Untitled client",
    meta: (item) => item.clientId || "",
    body: (item) => item.logoUrl || "No logo path available.",
  },
  testimonials: {
    endpoint: "/api/admin/testimonials",
    dataKey: "testimonials",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "position", label: "Position", type: "text" },
      { key: "message", label: "Message", type: "textarea", required: true },
      { key: "image", label: "Image URL", type: "text" },
    ],
    title: (item) => item.name || "Untitled testimonial",
    meta: (item) => item.position || "",
    body: (item) => item.message || "No testimonial text available.",
  },
  announcements: {
    endpoint: "/api/admin/announcements",
    dataKey: "announcements",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "message", label: "Message", type: "textarea" },
      { key: "highlightMessage", label: "Highlight Message", type: "textarea" },
      { key: "contents", label: "Contents", type: "textarea" },
      { key: "photos", label: "Photos", type: "text" },
      { key: "displayMode", label: "Display Mode", type: "select", options: ["popup", "banner", "modal"] },
      { key: "templateKey", label: "Template Key", type: "text" },
      { key: "logoUrl", label: "Logo URL", type: "text" },
      { key: "targetGuest", label: "Target Guests", type: "checkbox" },
      { key: "targetJobSeeker", label: "Target Job Seekers", type: "checkbox" },
      { key: "targetServiceProvider", label: "Target Service Providers", type: "checkbox" },
      { key: "startAt", label: "Start At", type: "text" },
      { key: "endAt", label: "End At", type: "text" },
      { key: "isActive", label: "Active", type: "checkbox" },
    ],
    title: (item) => item.title || "Untitled announcement",
    meta: (item) => [item.displayMode, item.isActive ? "Active" : "Inactive"].filter(Boolean).join(" - "),
    body: (item) => item.message || item.highlightMessage || "No announcement message available.",
  },
  "hero-media": {
    endpoint: "/api/admin/hero-media",
    dataKey: "heroMedia",
    fields: [
      { key: "type", label: "Type", type: "select", options: ["photo", "video"] },
      { key: "url", label: "Media URL", type: "text", required: true },
      { key: "title", label: "Title", type: "text" },
      { key: "is_active", label: "Active", type: "checkbox" },
    ],
    title: (item) => item.title || "Untitled hero media",
    meta: (item) => [item.type, item.is_active ? "Active" : "Inactive"].filter(Boolean).join(" - "),
    body: (item) => item.url || "No media path available.",
  },
};

export default function AdminDashboardClient() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeModal, setActiveModal] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [previewItems, setPreviewItems] = useState([]);
  const [previewEditingId, setPreviewEditingId] = useState(null);
  const [previewDraft, setPreviewDraft] = useState({});
  const [previewSaving, setPreviewSaving] = useState(false);
  const [previewActionMessage, setPreviewActionMessage] = useState("");

  const activeSectionData = useMemo(
    () => sections.find((section) => section.key === activeSection) || sections[0],
    [activeSection],
  );

  const openModule = (sectionKey) => {
    setActiveSection(sectionKey);
    setActiveModal(sectionKey === "overview" ? null : sectionKey);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    setPreviewOpen(false);
    setPreviewLoading(false);
    setPreviewError("");
    setPreviewItems([]);
    setPreviewEditingId(null);
    setPreviewDraft({});
    setPreviewSaving(false);
    setPreviewActionMessage("");
  }, [activeSection]);

  const loadPreview = async () => {
    const source = previewSources[activeSection];

    if (!source) {
      setPreviewItems([]);
      return;
    }

    setPreviewLoading(true);
    setPreviewError("");
    setPreviewActionMessage("");

    try {
      const response = await fetch(source.endpoint);
      const data = await response.json();
      const rows = Array.isArray(data?.[source.dataKey]) ? data[source.dataKey] : [];
      setPreviewItems(rows);
      setPreviewOpen(true);
      setPreviewEditingId(null);
      setPreviewDraft({});
    } catch (error) {
      console.error("Error loading preview:", error);
      setPreviewError("Preview data could not be loaded right now.");
      setPreviewItems([]);
      setPreviewOpen(true);
    } finally {
      setPreviewLoading(false);
    }
  };

  const sidebarItems = [
    { key: "overview", icon: LayoutDashboard, short: "Dashboard" },
    { key: "contact", icon: MessageSquareText, short: "Inbox" },
    { key: "blogs", icon: Newspaper, short: "Blogs" },
    { key: "gallery", icon: GalleryHorizontal, short: "Gallery" },
    { key: "trusted-clients", icon: HeartHandshake, short: "Clients" },
    { key: "testimonials", icon: Users, short: "Reviews" },
    { key: "announcements", icon: Bell, short: "Notices" },
    { key: "hero-media", icon: MonitorPlay, short: "Hero media" },
  ];

  const getPreviewSource = () => previewSources[activeSection];

  const beginPreviewEdit = (item) => {
    setPreviewEditingId(item.id);
    setPreviewDraft({ ...item });
    setPreviewActionMessage("");
  };

  const cancelPreviewEdit = () => {
    setPreviewEditingId(null);
    setPreviewDraft({});
    setPreviewActionMessage("");
  };

  const handlePreviewDraftChange = (key, value) => {
    setPreviewDraft((prev) => ({ ...prev, [key]: value }));
  };

  const deletePreviewItem = async (item) => {
    const source = getPreviewSource();
    if (!source) return;

    if (!window.confirm("Delete this item?")) return;

    setPreviewSaving(true);
    setPreviewActionMessage("");

    try {
      const response = await fetch(`${source.endpoint}?id=${encodeURIComponent(item.id)}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Delete failed");
      }

      await loadPreview();
      setPreviewActionMessage("Item deleted successfully.");
    } catch (error) {
      console.error("Error deleting preview item:", error);
      setPreviewActionMessage(error.message || "Could not delete item.");
    } finally {
      setPreviewSaving(false);
    }
  };

  const savePreviewItem = async (item) => {
    const source = getPreviewSource();
    if (!source) return;

    setPreviewSaving(true);
    setPreviewActionMessage("");

    try {
      const response = await fetch(source.endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...previewDraft, id: item.id }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Save failed");
      }

      await loadPreview();
      setPreviewActionMessage("Item saved successfully.");
      setPreviewEditingId(null);
      setPreviewDraft({});
    } catch (error) {
      console.error("Error saving preview item:", error);
      setPreviewActionMessage(error.message || "Could not save item.");
    } finally {
      setPreviewSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8fa_0%,#f6fbff_48%,#ffffff_100%)] p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-4 h-fit overflow-hidden rounded-[28px] border border-[#ead9dd] bg-white shadow-[0_18px_60px_rgba(122,28,47,0.08)]">
          <div className="border-b border-[#f0e3e6] bg-[linear-gradient(180deg,#fff8fa_0%,#ffffff_100%)] px-5 py-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-[#F7EEF1] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7A1C2F]">
              <ImageUp className="h-4 w-4" />
              Admin control center
            </div>
            <h1 className="mt-4 text-2xl font-black tracking-tight text-[#21161A]">Admin Section</h1>
            <p className="mt-2 text-sm leading-6 text-[#6a4a55]">
              Use the menu to switch between each workspace and keep the site content organized.
            </p>
          </div>

          <nav className="space-y-1 p-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveSection(item.key)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition ${
                    isActive
                      ? "bg-[#7A1C2F] text-white shadow-lg shadow-[#7A1C2F]/15"
                      : "text-[#4b3340] hover:bg-[#F8FBFF]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`rounded-xl p-2 ${
                        isActive ? "bg-white/15" : "bg-[#F7EEF1] text-[#7A1C2F]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">{item.short}</span>
                      <span className={`block text-xs ${isActive ? "text-white/75" : "text-[#7d6670]"}`}>
                        {sections.find((section) => section.key === item.key)?.label}
                      </span>
                    </span>
                  </span>
                  <ArrowRight className={`h-4 w-4 ${isActive ? "text-white" : "text-[#b59aa2]"}`} />
                </button>
              );
            })}
          </nav>

          <div className="border-t border-[#f0e3e6] px-5 py-5">
            <div className="rounded-3xl bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-4 ring-1 ring-[#ead9dd]">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]">Workspace note</p>
              <p className="mt-2 text-sm leading-6 text-[#4b3340]">
                Each sidebar option is wired to its matching admin function, so the team can focus on one task at a time.
              </p>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="overflow-hidden rounded-[28px] border border-[#ead9dd] bg-white shadow-[0_18px_60px_rgba(122,28,47,0.08)]">
            <div className="grid gap-6 px-6 py-7 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-[#F7EEF1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]">
                  <Sparkles className="h-4 w-4" />
                  {activeSectionData.label}
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-[#21161A] md:text-5xl">
                    {activeSectionData.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6a4a55] md:text-base">
                    {activeSectionData.description}
                  </p>
                </div>

                {activeSection !== "overview" ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => openModule(activeSection)}
                        className="inline-flex items-center justify-center rounded-xl bg-[#7A1C2F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#651726]"
                      >
                        {activeSectionData.actionLabel}
                      </button>
                      <button
                        type="button"
                        onClick={loadPreview}
                        className="rounded-xl border border-[#d8c6cb] bg-white px-5 py-3 text-sm font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
                      >
                        {previewLoading ? "Loading Preview..." : "Preview"}
                      </button>
                    </div>

                    {previewOpen ? (
                      <div className="rounded-3xl border border-[#ead9dd] bg-[#F8FBFF] p-5 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-bold text-[#21161A]">Posted details</h4>
                            <p className="mt-1 text-sm text-[#6a4a55]">Latest items pulled from the database.</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPreviewOpen(false)}
                            className="rounded-xl border border-[#d8c6cb] bg-white px-4 py-2 text-sm font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
                          >
                            Hide
                          </button>
                        </div>

                        <div className="mt-4 space-y-3">
                          {previewLoading ? (
                            <div className="rounded-2xl border border-dashed border-[#d8c6cb] bg-white p-4 text-sm text-[#6a4a55]">
                              Loading preview data...
                            </div>
                          ) : previewError ? (
                            <div className="rounded-2xl border border-dashed border-[#d8c6cb] bg-white p-4 text-sm text-[#6a4a55]">
                              {previewError}
                            </div>
                          ) : previewItems.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-[#d8c6cb] bg-white p-4 text-sm text-[#6a4a55]">
                              No posted records found yet.
                            </div>
                          ) : (
                            previewItems.slice(0, 5).map((item) => {
                              const source = getPreviewSource();
                              const isEditing = previewEditingId === item.id;

                              return (
                                <div
                                  key={item.id || `${activeSection}-${source?.title(item)}`}
                                  className="rounded-2xl border border-[#ead9dd] bg-white p-4"
                                >
                                  <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                      <h5 className="font-semibold text-[#21161A]">{source?.title(item)}</h5>
                                      {source?.meta(item) ? (
                                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">
                                          {source.meta(item)}
                                        </p>
                                      ) : null}
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        type="button"
                                        onClick={() => beginPreviewEdit(item)}
                                        className="rounded-xl border border-[#d8c6cb] bg-white px-3 py-2 text-xs font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => deletePreviewItem(item)}
                                        disabled={previewSaving}
                                        className="rounded-xl border border-[#d8c6cb] bg-white px-3 py-2 text-xs font-semibold text-[#a02034] transition hover:bg-[#fff0f3] disabled:opacity-50"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>

                                  {isEditing ? (
                                    <div className="mt-4 space-y-3">
                                      <div className="grid gap-3 sm:grid-cols-2">
                                        {source?.fields?.map((field) => {
                                          const value = previewDraft[field.key];

                                          if (field.type === "checkbox") {
                                            return (
                                              <label
                                                key={field.key}
                                                className="flex items-center gap-2 rounded-xl border border-[#ead9dd] bg-[#F8FBFF] px-3 py-3 text-sm text-[#4b3340]"
                                              >
                                                <input
                                                  type="checkbox"
                                                  checked={Boolean(value)}
                                                  onChange={(event) => handlePreviewDraftChange(field.key, event.target.checked)}
                                                />
                                                {field.label}
                                              </label>
                                            );
                                          }

                                          if (field.type === "select") {
                                            return (
                                              <label key={field.key} className="space-y-2">
                                                <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">
                                                  {field.label}
                                                </span>
                                                <select
                                                  value={value ?? ""}
                                                  onChange={(event) => handlePreviewDraftChange(field.key, event.target.value)}
                                                  className="w-full rounded-xl border border-[#d8c6cb] bg-white px-3 py-2 text-sm outline-none focus:border-[#7A1C2F]"
                                                >
                                                  {(field.options || []).map((option) => (
                                                    <option key={option} value={option}>
                                                      {option}
                                                    </option>
                                                  ))}
                                                </select>
                                              </label>
                                            );
                                          }

                                          return (
                                            <label key={field.key} className="space-y-2 sm:col-span-1">
                                              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">
                                                {field.label}
                                              </span>
                                              {field.type === "textarea" ? (
                                                <textarea
                                                  rows={4}
                                                  value={value ?? ""}
                                                  required={field.required}
                                                  onChange={(event) => handlePreviewDraftChange(field.key, event.target.value)}
                                                  className="w-full rounded-xl border border-[#d8c6cb] bg-white px-3 py-2 text-sm outline-none focus:border-[#7A1C2F]"
                                                />
                                              ) : (
                                                <input
                                                  type={field.type || "text"}
                                                  value={value ?? ""}
                                                  required={field.required}
                                                  onChange={(event) => handlePreviewDraftChange(field.key, event.target.value)}
                                                  className="w-full rounded-xl border border-[#d8c6cb] bg-white px-3 py-2 text-sm outline-none focus:border-[#7A1C2F]"
                                                />
                                              )}
                                            </label>
                                          );
                                        })}
                                      </div>

                                      <div className="flex flex-wrap gap-3">
                                        <button
                                          type="button"
                                          onClick={() => savePreviewItem(item)}
                                          disabled={previewSaving}
                                          className="rounded-xl bg-[#7A1C2F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#651726] disabled:opacity-50"
                                        >
                                          {previewSaving ? "Saving..." : "Save changes"}
                                        </button>
                                        <button
                                          type="button"
                                          onClick={cancelPreviewEdit}
                                          className="rounded-xl border border-[#d8c6cb] bg-white px-4 py-2.5 text-sm font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <p className="mt-3 text-sm leading-6 text-[#4b3340]">{source?.body(item)}</p>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                        {previewActionMessage ? (
                          <p className="mt-3 text-sm font-medium text-[#7A1C2F]">{previewActionMessage}</p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveSection("gallery")}
                      className="rounded-xl bg-[#7A1C2F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#651726]"
                    >
                      Open Gallery
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveSection("contact")}
                      className="rounded-xl border border-[#d8c6cb] bg-white px-5 py-3 text-sm font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
                    >
                      Review Messages
                    </button>
                  </div>
                )}
              </div>

              <div className="rounded-3xl border border-[#ead9dd] bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]">Workspace note</p>
                <h3 className="mt-2 text-2xl font-bold text-[#21161A]">Focused admin flow</h3>
                <p className="mt-3 text-sm leading-6 text-[#6a4a55]">
                  Switch modules from the sidebar, open the manager when you need to change content, and use Preview to inspect what has already been posted.
                </p>
              </div>
            </div>
          </section>

          {activeSection === "overview" ? (
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {sections
                .filter((section) => section.key !== "overview")
                .map((section) => {
                  const Icon = section.icon;

                  return (
                    <article
                      key={section.key}
                      className="group overflow-hidden rounded-3xl border border-[#ead9dd] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className={`h-2 bg-gradient-to-r ${section.accent}`} />
                      <div className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="rounded-2xl bg-[#F8FBFF] p-3 text-[#7A1C2F] ring-1 ring-[#ead9dd]">
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="rounded-full bg-[#F7EEF1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">
                            {section.label}
                          </span>
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-[#21161A]">{section.title}</h3>
                        <p className="mt-2 min-h-[4.5rem] text-sm leading-6 text-[#6a4a55]">{section.description}</p>

                        <button
                          type="button"
                          onClick={() => setActiveSection(section.key)}
                          className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#7A1C2F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#651726]"
                        >
                          View details
                        </button>
                      </div>
                    </article>
                  );
                })}
            </section>
          ) : (
            <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-3xl border border-[#ead9dd] bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#21161A]">{activeSectionData.title}</h3>
                    <p className="mt-1 text-sm text-[#6a4a55]">What this module handles right now.</p>
                  </div>
                  <div className={`rounded-2xl bg-gradient-to-r ${activeSectionData.accent} p-3 text-white`}>
                    {(() => {
                      const Icon = activeSectionData.icon;
                      return <Icon className="h-6 w-6" />;
                    })()}
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {activeSectionData.highlights.map((item) => (
                    <div key={item} className="rounded-2xl border border-[#ead9dd] bg-[#F8FBFF] p-4 text-sm text-[#4b3340]">
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-dashed border-[#d8c6cb] bg-[#fffdfd] p-4 text-sm text-[#6a4a55]">
                  Select the action button above to open the existing manager for this section.
                </div>
              </div>

              <div className="rounded-3xl border border-[#ead9dd] bg-[linear-gradient(180deg,#F8FBFF_0%,#FFFFFF_100%)] p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-[#21161A]">Admin focus</h3>
                <div className="mt-5 space-y-3 text-sm text-[#4b3340]">
                  <p>Use the sidebar to move between content areas without leaving the admin space.</p>
                  <p>Open the module when you are ready to add, edit, or refresh live content.</p>
                  <p>Keep work grouped by function so the dashboard stays easy to scan.</p>
                  <p>Each section is designed to stay clean and lightweight for daily use.</p>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      <ManageContactMessages isOpen={activeModal === "contact"} onClose={closeModal} />
      <ManageBlogs isOpen={activeModal === "blogs"} onClose={closeModal} />
      <ManageGallery isOpen={activeModal === "gallery"} onClose={closeModal} />
      <ManageTestimonials isOpen={activeModal === "testimonials"} onClose={closeModal} />
      <ManageAnnouncements isOpen={activeModal === "announcements"} onClose={closeModal} />
      <ManageHeroMedia isOpen={activeModal === "hero-media"} onClose={closeModal} />
      <ManageTrustedClients isOpen={activeModal === "trusted-clients"} onClose={closeModal} />
    </div>
  );
}
