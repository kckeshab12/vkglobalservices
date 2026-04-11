"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarDays, ImageIcon, Megaphone, Sparkles } from "lucide-react";

const THEMES = {
  modern: {
    label: "Service",
    gradient: "from-slate-950 via-blue-950 to-cyan-900",
    ring: "ring-cyan-200/30",
    border: "border-cyan-200/50",
    accent: "bg-cyan-400",
    badge: "bg-cyan-100 text-cyan-800",
  },
  festive: {
    label: "Festive",
    gradient: "from-rose-700 via-orange-600 to-amber-500",
    ring: "ring-amber-200/30",
    border: "border-amber-200/50",
    accent: "bg-amber-300",
    badge: "bg-amber-100 text-amber-800",
  },
  elegant: {
    label: "Elegant",
    gradient: "from-emerald-800 via-teal-700 to-cyan-700",
    ring: "ring-emerald-200/30",
    border: "border-emerald-200/50",
    accent: "bg-emerald-300",
    badge: "bg-emerald-100 text-emerald-800",
  },
  corporate: {
    label: "Service Promotion",
    gradient: "from-slate-900 via-slate-800 to-indigo-900",
    ring: "ring-slate-200/25",
    border: "border-slate-200/40",
    accent: "bg-white",
    badge: "bg-slate-100 text-slate-800",
  },
};

function getTheme(templateKey) {
  return THEMES[templateKey] || THEMES.modern;
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMode(item = {}) {
  const photos = Array.isArray(item.photos) ? item.photos.filter(Boolean) : [];
  const mode = String(item.displayMode || "").toLowerCase().trim();
  if (mode === "photo" || mode === "poster") return mode;
  return photos.length > 0 ? "photo" : "poster";
}

function getAudienceLabels(item = {}) {
  return [
    item.targetGuest ? "Guest" : null,
    item.targetJobSeeker ? "Job Seeker" : null,
    item.targetServiceProvider ? "Service Provider" : null,
  ].filter(Boolean);
}

function StatusPill({ label, tone = "slate" }) {
  const toneClass =
    tone === "emerald"
      ? "bg-emerald-100 text-emerald-700"
      : tone === "blue"
        ? "bg-blue-100 text-blue-700"
        : tone === "rose"
          ? "bg-rose-100 text-rose-700"
          : "bg-slate-100 text-slate-700";

  return <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClass}`}>{label}</span>;
}

function resolveStatus(item = {}) {
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
  return { label: "Draft", tone: "slate" };
}

function splitContentList(value) {
  if (!value) return [];
  return String(value)
    .split(/\n|•|·|;|,/)
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function PosterHeader({ logoSrc, label, title, theme, compact }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/90 p-1.5 shadow-lg">
          <img src={logoSrc} alt="Portal logo" className="h-full w-full object-contain" />
        </div>
        <div>
          <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${theme.badge}`}>
            <Sparkles className="h-3 w-3" />
            {label}
          </div>
          <h3 className={`mt-2 font-semibold leading-tight ${compact ? "text-xl" : "text-2xl"}`}>{title}</h3>
        </div>
      </div>
    </div>
  );
}

function ContentBullets({ items = [], className = "", editable = false, onContentChange }) {
  if (!items.length) return null;
  
  const handleItemChange = (index, newText) => {
    if (!onContentChange) return;
    const newItems = [...items];
    newItems[index] = newText;
    onContentChange('contents', newItems.join('\n'));
  };
  
  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((entry, index) => (
        <div key={index} className="flex items-start gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-current opacity-70" />
          <span
            contentEditable={editable}
            onInput={editable ? (e) => handleItemChange(index, e.target.textContent) : undefined}
            suppressContentEditableWarning={true}
            className="flex-1"
          >
            {entry}
          </span>
        </div>
      ))}
    </div>
  );
}

function getPosterConfig(templateKey, canvasSize) {
  const size = canvasSize || {};
  const width = Number(size.width) || 1080;
  const height = Number(size.height) || 1080;
  const ratio = `${width} / ${height}`;
  const key = String(templateKey || "modern").toLowerCase();
  if (key === "festive") return { ratio, className: "aspect-square" };
  return { ratio, className: "aspect-[4/5]" };
}

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
      logo: { x: 44, y: 26, w: 16, h: 11 },
      title: { x: 14, y: 14, w: 72, h: 10 },
      highlight: { x: 12, y: 28, w: 76, h: 9 },
      message: { x: 12, y: 40, w: 76, h: 12 },
      photo: { x: 10, y: 54, w: 80, h: 28 },
      contents: { x: 14, y: 84, w: 72, h: 10 },
    };
  }
  if (key === "elegant") {
    return {
      palette: getDefaultDesignPalette(key),
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
    logo: { x: 4, y: 4, w: 12, h: 10 },
    title: { x: 4, y: 18, w: 38, h: 10 },
    highlight: { x: 4, y: 30, w: 38, h: 8 },
    message: { x: 4, y: 40, w: 38, h: 14 },
    contents: { x: 4, y: 56, w: 38, h: 16 },
    photo: { x: 46, y: 10, w: 48, h: 56 },
  };
}

function mergeLayout(templateKey, layout = {}) {
  const defaults = getDefaultDesignLayout(templateKey);
  return Object.fromEntries(
    Object.entries(defaults).map(([key, value]) => [
      key,
      {
        ...value,
        ...(layout[key] || {}),
      },
    ])
  );
}

function pct(value) {
  return `${Math.round(value * 1000) / 10}%`;
}

function snapPercent(value, step = 1) {
  return Math.round(value / step) * step;
}

function clampPercent(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getMinSizeForBox(key) {
  if (key === "photo") return { w: 16, h: 16 };
  if (key === "logo") return { w: 8, h: 8 };
  if (key === "highlight") return { w: 16, h: 6 };
  if (key === "message") return { w: 18, h: 10 };
  if (key === "contents") return { w: 18, h: 10 };
  return { w: 18, h: 8 };
}

function EditableHandle({ position = "se" }) {
  const base = "absolute z-20 h-3.5 w-3.5 rounded-full border-2 border-white bg-sky-500 shadow";
  const positions = {
    nw: "-left-2 -top-2 cursor-nwse-resize",
    ne: "-right-2 -top-2 cursor-nesw-resize",
    sw: "-left-2 -bottom-2 cursor-nesw-resize",
    se: "-right-2 -bottom-2 cursor-nwse-resize",
  };
  return <span className={`${base} ${positions[position] || positions.se}`} />;
}

export default function AdvertisementPoster({ item, audienceLabel = "", className = "", compact = false, editable = false, onLayoutChange, onContentChange }) {
  const posterItem = item || {};
  const photos = Array.isArray(posterItem.photos) ? posterItem.photos.filter(Boolean) : [];
  const mode = getMode(posterItem);
  const templateKey = String(posterItem.templateKey || "modern").toLowerCase();
  const theme = getTheme(String(posterItem.templateKey || "modern").toLowerCase());
  const logoSrc = posterItem.logoUrl || "/logo.jpeg";
  const status = resolveStatus(posterItem);
  const audiences = getAudienceLabels(posterItem);
  const highlight = posterItem.highlightMessage || (mode === "photo" ? "Photo Story" : "Announcement");
  const hasBody = Boolean(posterItem.message || posterItem.contents);
  const bodyClass = compact ? "text-sm leading-6" : "text-base leading-7";
  const rawPhoto = photos[0] || "";
  const extraPhotos = photos.slice(1);
  const contentItems = splitContentList(posterItem.contents);
  const designLayout = mergeLayout(templateKey, posterItem.designLayout || {});
  const palette = designLayout.palette || getDefaultDesignLayout(templateKey).palette;
  const posterConfig = getPosterConfig(templateKey, designLayout.canvasSize);
  const dragState = useRef(null);
  const canvasRef = useRef(null);
  const [draggingKey, setDraggingKey] = useState(null);

  useEffect(() => {
    if (!editable || !onLayoutChange) return undefined;
    const handleMove = (event) => {
      if (!dragState.current || !canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const { id, action, handle, originX, originY, originW, originH, startX, startY } = dragState.current;
      const deltaX = ((event.clientX - startX) / rect.width) * 100;
      const deltaY = ((event.clientY - startY) / rect.height) * 100;
      const minSize = getMinSizeForBox(id);
      let nextX = originX;
      let nextY = originY;
      let nextW = originW;
      let nextH = originH;

      if (action === "move") {
        nextX = snapPercent(clampPercent(originX + deltaX, 0, 100 - originW));
        nextY = snapPercent(clampPercent(originY + deltaY, 0, 100 - originH));
      } else if (action === "resize") {
        const resized = {
          x: originX,
          y: originY,
          w: originW,
          h: originH,
        };

        if (handle === "se") {
          resized.w = originW + deltaX;
          resized.h = originH + deltaY;
        } else if (handle === "sw") {
          resized.x = originX + deltaX;
          resized.w = originW - deltaX;
          resized.h = originH + deltaY;
        } else if (handle === "ne") {
          resized.y = originY + deltaY;
          resized.w = originW + deltaX;
          resized.h = originH - deltaY;
        } else if (handle === "nw") {
          resized.x = originX + deltaX;
          resized.y = originY + deltaY;
          resized.w = originW - deltaX;
          resized.h = originH - deltaY;
        }

        resized.w = snapPercent(Math.max(minSize.w, resized.w));
        resized.h = snapPercent(Math.max(minSize.h, resized.h));
        resized.x = snapPercent(clampPercent(resized.x, 0, 100 - resized.w));
        resized.y = snapPercent(clampPercent(resized.y, 0, 100 - resized.h));
        nextX = resized.x;
        nextY = resized.y;
        nextW = resized.w;
        nextH = resized.h;
      }

      onLayoutChange({
        ...designLayout,
        [id]: { ...designLayout[id], x: nextX, y: nextY, w: nextW, h: nextH },
      });
    };
    const handleUp = () => {
      dragState.current = null;
      setDraggingKey(null);
    };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };
  }, [editable, onLayoutChange, designLayout]);

  if (!item) return null;

  if (mode === "poster" && (editable || item.designLayout)) {
    const bgStyle = {
      background: `linear-gradient(135deg, ${palette.background} 0%, ${palette.primary} 52%, ${palette.secondary} 100%)`,
    };
    const primaryGlow = palette.primary || "#0a2540";
    const secondaryGlow = palette.secondary || "#133b63";
    const photo = rawPhoto || "";

    const renderBox = (key, content, extraClass = "", options = {}) => {
      const pos = designLayout[key];
      if (!pos) return null;
      const isDragging = draggingKey === key;
      const style = {
        left: pct(pos.x),
        top: pct(pos.y),
        width: pct(pos.w),
        height: pct(pos.h),
        zIndex: options.zIndex || 10,
      };

      return (
        <div
          key={key}
          className={`absolute select-none ${editable ? "cursor-move" : ""} ${extraClass}`}
          style={style}
          onPointerDown={(event) => {
            if (!editable || !onLayoutChange) return;
            // Don't start drag if clicking on editable content
            if (event.target.contentEditable === 'true' || event.target.closest('[contenteditable="true"]')) return;
            event.preventDefault();
            event.stopPropagation();
            const target = designLayout[key];
            dragState.current = {
              id: key,
              action: "move",
              startX: event.clientX,
              startY: event.clientY,
              originX: target.x,
              originY: target.y,
              originW: target.w,
              originH: target.h,
            };
            setDraggingKey(key);
          }}
        >
          <div className={`relative h-full w-full overflow-hidden rounded-2xl border ${isDragging ? "border-sky-300 shadow-lg" : "border-white/20"} ${editable ? "ring-1 ring-white/20" : ""}`} style={options.fillStyle || undefined}>
            {editable ? <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:12px_12px] opacity-70" /> : null}
            {editable ? (
              <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-700">
                {options.label || key}
              </span>
            ) : null}
            {content}
            {editable ? (
              <>
                <button
                  type="button"
                  aria-label={`Resize ${key} top left`}
                  className="absolute -left-2 -top-2 z-30 h-5 w-5 rounded-full bg-white shadow ring-2 ring-sky-500"
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const target = designLayout[key];
                    dragState.current = {
                      id: key,
                      action: "resize",
                      handle: "nw",
                      startX: event.clientX,
                      startY: event.clientY,
                      originX: target.x,
                      originY: target.y,
                      originW: target.w,
                      originH: target.h,
                    };
                    setDraggingKey(key);
                  }}
                >
                  <EditableHandle position="nw" />
                </button>
                <button
                  type="button"
                  aria-label={`Resize ${key} top right`}
                  className="absolute -right-2 -top-2 z-30 h-5 w-5 rounded-full bg-white shadow ring-2 ring-sky-500"
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const target = designLayout[key];
                    dragState.current = {
                      id: key,
                      action: "resize",
                      handle: "ne",
                      startX: event.clientX,
                      startY: event.clientY,
                      originX: target.x,
                      originY: target.y,
                      originW: target.w,
                      originH: target.h,
                    };
                    setDraggingKey(key);
                  }}
                >
                  <EditableHandle position="ne" />
                </button>
                <button
                  type="button"
                  aria-label={`Resize ${key} bottom left`}
                  className="absolute -left-2 -bottom-2 z-30 h-5 w-5 rounded-full bg-white shadow ring-2 ring-sky-500"
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const target = designLayout[key];
                    dragState.current = {
                      id: key,
                      action: "resize",
                      handle: "sw",
                      startX: event.clientX,
                      startY: event.clientY,
                      originX: target.x,
                      originY: target.y,
                      originW: target.w,
                      originH: target.h,
                    };
                    setDraggingKey(key);
                  }}
                >
                  <EditableHandle position="sw" />
                </button>
                <button
                  type="button"
                  aria-label={`Resize ${key} bottom right`}
                  className="absolute -right-2 -bottom-2 z-30 h-5 w-5 rounded-full bg-white shadow ring-2 ring-sky-500"
                  onPointerDown={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    const target = designLayout[key];
                    dragState.current = {
                      id: key,
                      action: "resize",
                      handle: "se",
                      startX: event.clientX,
                      startY: event.clientY,
                      originX: target.x,
                      originY: target.y,
                      originW: target.w,
                      originH: target.h,
                    };
                    setDraggingKey(key);
                  }}
                >
                  <EditableHandle position="se" />
                </button>
              </>
            ) : null}
          </div>
        </div>
      );
    };

    return (
      <article
        ref={canvasRef}
        className={`relative overflow-hidden rounded-[28px] border shadow-lg ${className}`}
        style={{ aspectRatio: posterConfig.ratio }}
      >
        <div className="absolute inset-0" style={bgStyle} />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-0 top-0 h-28 w-28 rounded-full bg-white blur-3xl" style={{ backgroundColor: primaryGlow }} />
          <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white blur-3xl" style={{ backgroundColor: secondaryGlow }} />
        </div>
        {editable ? (
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:10%_10%] opacity-50" />
        ) : null}

        {renderBox(
          "logo",
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white/90 p-2">
            {logoSrc ? (
              <img src={logoSrc} alt="Portal logo" className="h-full w-full object-contain" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-500">Logo</div>
            )}
          </div>,
          "",
          { label: "Logo", zIndex: 30, fillStyle: { backgroundColor: "rgba(255,255,255,0.92)" } }
        )}

        {renderBox(
          "title",
          <div className="flex h-full w-full items-center rounded-2xl bg-black/18 px-3 py-2 backdrop-blur-sm">
            <h3 
              className="w-full text-left text-[clamp(1.4rem,2.4vw,3rem)] font-black leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
              contentEditable={editable}
              onInput={editable ? (e) => onContentChange?.('title', e.target.textContent) : undefined}
              suppressContentEditableWarning={true}
            >
              {item.title || "Untitled update"}
            </h3>
          </div>,
          "",
          { label: "Title", zIndex: 25, fillStyle: { backgroundColor: "rgba(0,0,0,0.18)" } }
        )}

        {renderBox(
          "highlight",
          <div className="flex h-full w-full items-center px-3 py-2">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white shadow-sm" style={{ backgroundColor: palette.accent || "rgba(255,255,255,0.18)" }}>
              <Megaphone className="h-4 w-4" />
              <span
                contentEditable={editable}
                onInput={editable ? (e) => onContentChange?.('highlightMessage', e.target.textContent) : undefined}
                suppressContentEditableWarning={true}
              >
                {highlight}
              </span>
            </div>
          </div>,
          "",
          { label: "Highlight", zIndex: 26, fillStyle: { backgroundColor: "rgba(0,0,0,0.16)" } }
        )}

        {renderBox(
          "message",
          <div className="flex h-full w-full items-start rounded-2xl bg-black/16 px-3 py-2 backdrop-blur-sm">
            <p 
              className={`w-full whitespace-pre-wrap text-left ${templateKey === "elegant" ? "text-[#f5efe2]" : "text-white"} ${bodyClass} drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]`}
              contentEditable={editable}
              onInput={editable ? (e) => onContentChange?.('message', e.target.textContent) : undefined}
              suppressContentEditableWarning={true}
            >
              {item.message || "Add a message for this poster."}
            </p>
          </div>,
          "",
          { label: "Message", zIndex: 24, fillStyle: { backgroundColor: "rgba(0,0,0,0.16)" } }
        )}

        {renderBox(
          "contents",
          <div className="flex h-full w-full items-start rounded-2xl bg-black/16 px-3 py-2 backdrop-blur-sm">
            <div className={`w-full ${templateKey === "elegant" ? "text-[#f5efe2]" : "text-white"} ${compact ? "text-sm" : "text-base"}`}>
              {contentItems.length ? (
                <ContentBullets items={contentItems} editable={editable} onContentChange={onContentChange} />
              ) : (
                <p 
                  className="whitespace-pre-wrap"
                  contentEditable={editable}
                  onInput={editable ? (e) => onContentChange?.('contents', e.target.textContent) : undefined}
                  suppressContentEditableWarning={true}
                >
                  {item.contents || "Add contents or bullet points here."}
                </p>
              )}
            </div>
          </div>,
          "",
          { label: "Contents", zIndex: 23, fillStyle: { backgroundColor: "rgba(0,0,0,0.16)" } }
        )}

        {renderBox(
          "photo",
          photo ? (
            <img src={photo} alt={item.title || "Advertisement"} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/10 text-sm text-white/80">Add photo</div>
          ),
          "overflow-hidden",
          { label: "Photo", zIndex: 15, fillStyle: { backgroundColor: "rgba(255,255,255,0.08)" } }
        )}
      </article>
    );
  }

  if (mode === "photo" && photos.length > 0) {
    // Display uploaded poster at its original size
    return (
      <article className={`overflow-hidden rounded-[28px] border shadow-lg bg-slate-900 ${theme.border} ${className}`}>
        <div className="flex flex-col items-center justify-center w-full h-full">
          {photos.map((photo, index) => (
            <img
              key={`${item.id || "draft"}-photo-${index}`}
              src={photo}
              alt={item.title || "Advertisement"}
              className="w-full h-auto object-contain"
            />
          ))}
        </div>
      </article>
    );
  }

  if (templateKey === "festive") {
    return (
      <article className={`relative overflow-hidden rounded-[30px] border shadow-lg ${theme.border} ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-rose-700 via-orange-600 to-amber-400" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute left-0 top-0 h-36 w-36 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-amber-200 blur-3xl" />
        </div>

        <div className={`relative p-5 text-white ${compact ? "md:p-5" : "md:p-6"}`}>
          <div className="flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white/90 p-1.5 shadow-lg">
              <img src={logoSrc} alt="Portal logo" className="h-full w-full object-contain" />
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">Festive Template</p>
            <h3 className={`mt-2 font-black leading-tight ${compact ? "text-2xl" : "text-3xl"}`}>
              {item.title || "Untitled update"}
            </h3>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold shadow-sm">
              <Megaphone className="h-4 w-4" />
              {highlight}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[0.95fr_1.05fr] md:items-stretch">
            <div className="rounded-[26px] border border-white/20 bg-black/20 p-4 backdrop-blur-sm">
              {hasBody ? <p className={`text-white/95 ${bodyClass}`}>{item.message}</p> : null}
              {contentItems.length ? (
                <div className="mt-4 space-y-2 text-sm text-white/95">
                  {contentItems.map((entry) => (
                    <div key={entry} className="flex items-start gap-2 rounded-xl bg-white/10 px-3 py-2">
                      <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-100" />
                      <span>{entry}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="relative overflow-hidden rounded-[26px] border border-white/20 bg-white/10">
              {rawPhoto ? (
                <img
                  src={rawPhoto}
                  alt={item.title || "Advertisement"}
                  className="h-full min-h-[240px] w-full object-cover"
                />
              ) : (
                <div className="flex min-h-[240px] items-center justify-center text-sm text-white/80">
                  Add a raw photo for a stronger festive look.
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {audiences.map((label) => (
              <span key={label} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                {label}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  if (templateKey === "elegant") {
    return (
      <article className={`overflow-hidden rounded-[30px] border border-[#d7c9a6] bg-[#0f0f0f] shadow-lg ${className}`}>
        <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
          <div className="flex flex-col justify-between bg-[#151515] p-5 text-[#d4af37] md:p-6">
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-[#f4ead4] p-1.5 shadow-lg">
                  <img src={logoSrc} alt="Portal logo" className="h-full w-full object-contain" />
                </div>
                <StatusPill label={status.label} tone={status.tone} />
              </div>

              <div className="mt-6 text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e8d9b5]">Elegant Template</p>
                <h3 className={`mt-3 font-serif text-[#f8f3e7] ${compact ? "text-2xl" : "text-4xl"}`}>{item.title || "Untitled update"}</h3>
                <div className="mx-auto mt-4 h-px w-24 bg-[#d4af37]" />
                <p className="mt-4 italic text-[#e8d9b5]">{highlight}</p>
              </div>

              {hasBody ? <p className={`mt-5 text-center text-[#f5efe2]/90 ${bodyClass}`}>{item.message}</p> : null}
            </div>

            <div className="mt-5 rounded-2xl border border-[#d4af37]/30 bg-[#f7f1e6]/8 p-4">
              <div className="flex items-center justify-center gap-2 text-[#d4af37]">
                <span className="h-px w-12 bg-[#d4af37]" />
                <span className="text-sm uppercase tracking-[0.18em]">Contents</span>
                <span className="h-px w-12 bg-[#d4af37]" />
              </div>
              <ContentBullets items={contentItems} className="mt-4 text-sm text-[#f5efe2]" />
            </div>

            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {audiences.map((label) => (
                <span key={label} className="rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#f8f3e7]">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#f4ead4] p-4 md:p-5">
            <div className="overflow-hidden rounded-[26px] border border-[#d4af37]/30 bg-black">
              {rawPhoto ? (
                <img
                  src={rawPhoto}
                  alt={item.title || "Advertisement"}
                  className="h-full min-h-[340px] w-full object-cover opacity-95"
                />
              ) : (
                <div className="flex min-h-[340px] items-center justify-center bg-[#1b1b1b] text-sm text-[#e8d9b5]">
                  Add a raw photo for the luxury template.
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  }

  if (templateKey === "corporate") {
    return (
      <article className={`overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-lg ${className}`}>
        <div className="grid gap-0 md:grid-cols-[1fr_1fr]">
          <div className="flex flex-col justify-between bg-[#0a2540] p-5 text-white md:p-6">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/90 p-1.5 shadow-lg">
                  <img src={logoSrc} alt="Portal logo" className="h-full w-full object-contain" />
                </div>
                <StatusPill label={status.label} tone={status.tone} />
              </div>

              <div className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">Service Promotion Template</p>
                <h3 className={`mt-2 font-semibold leading-tight ${compact ? "text-2xl" : "text-4xl"}`}>{item.title || "Untitled update"}</h3>
                <div className="mt-4 inline-flex max-w-max items-center gap-2 rounded-full bg-cyan-400/15 px-3 py-2 text-sm font-semibold text-cyan-100">
                  <Megaphone className="h-4 w-4" />
                  {highlight}
                </div>
              </div>

              {hasBody ? <p className={`mt-5 max-w-xl text-white/90 ${bodyClass}`}>{item.message}</p> : null}
            </div>

            <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-4">
              <div className="grid gap-2 sm:grid-cols-2">
                {contentItems.length ? (
                  <ContentBullets items={contentItems} className="text-sm text-white/90" />
                ) : (
                  <p className="text-sm text-white/70">Add contents to show service highlights and key points.</p>
                )}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {audiences.map((label) => (
                <span key={label} className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 md:p-5">
            <div className="grid gap-3">
              {rawPhoto ? (
                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">
                  <img src={rawPhoto} alt={item.title || "Advertisement"} className="h-64 w-full object-cover" />
                </div>
              ) : null}
              {extraPhotos.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {extraPhotos.slice(0, 4).map((photo, index) => (
                    <img
                      key={`${item.id || "draft"}-extra-${index}`}
                      src={photo}
                      alt={item.title || "Advertisement"}
                      className="h-36 w-full rounded-2xl border border-slate-200 object-cover shadow-sm"
                    />
                  ))}
                </div>
              ) : null}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Sparkles className="h-4 w-4 text-cyan-700" />
                  Highlights
                </div>
                <div className="mt-3 grid gap-2 text-sm text-slate-600">
                  <div className="rounded-xl bg-slate-50 px-3 py-2">Clean service announcement</div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2">Simple and professional layout</div>
                  <div className="rounded-xl bg-slate-50 px-3 py-2">Built for jobs, services, and updates</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`relative overflow-hidden rounded-[28px] border shadow-lg ${theme.border} ${className}`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-95`} />
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute left-0 top-0 h-28 w-28 rounded-full ${theme.accent} blur-3xl`} />
        <div className="absolute bottom-0 right-0 h-32 w-32 rounded-full bg-white blur-3xl" />
      </div>

      <div className={`relative p-5 text-white ${compact ? "md:p-5" : "md:p-6"}`}>
        <PosterHeader logoSrc={logoSrc} label={`${theme.label} Template`} title={item.title || "Untitled update"} theme={theme} compact={compact} />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center gap-2 rounded-full ${theme.badge} px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em]`}>
            <Megaphone className="h-3.5 w-3.5" />
            {highlight}
          </span>
          {audienceLabel ? <StatusPill label={audienceLabel} tone="blue" /> : null}
        </div>

        {hasBody ? <p className={`mt-4 max-w-2xl text-white/92 ${bodyClass}`}>{item.message}</p> : null}

        <div className="mt-5 grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <ContentBullets items={contentItems.length ? contentItems : [item.contents].filter(Boolean)} className="text-sm text-white/90" />
            </div>

            <div className="flex flex-wrap gap-2">
              {audiences.map((label) => (
                <span key={label} className="rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/90">
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[24px] border border-white/20 bg-white/10">
            {rawPhoto ? (
              <img src={rawPhoto} alt={item.title || "Advertisement"} className="h-full min-h-[240px] w-full object-cover" />
            ) : (
              <div className="flex min-h-[240px] items-center justify-center text-sm text-white/80">
                Upload a raw photo to complete this template.
              </div>
            )}
          </div>
        </div>

        {(item.startAt || item.endAt) && (
          <div className="mt-5 flex flex-wrap gap-2 text-xs text-white/80">
            {item.startAt ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 font-medium">
                <CalendarDays className="h-3 w-3" />
                Starts {formatDate(item.startAt)}
              </span>
            ) : null}
            {item.endAt ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 font-medium">
                <CalendarDays className="h-3 w-3" />
                Ends {formatDate(item.endAt)}
              </span>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
