"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import AdvertisementPoster from "./advertisements/AdvertisementPoster";

function isLivePoster(item = {}) {
  const mode = String(item.displayMode || "").toLowerCase().trim();
  const photos = Array.isArray(item.photos) ? item.photos.filter(Boolean) : [];
  return mode === "photo" ? photos.length > 0 : mode === "poster";
}

function PopupCard({ item, index, onClose }) {
  const photos = Array.isArray(item.photos) ? item.photos.filter(Boolean) : [];
  const isPhotoMode = String(item.displayMode || "").toLowerCase().trim() === "photo" && photos.length > 0;
  const offset = index * 18;
  const maxWidth = isPhotoMode ? "min(96vw, 1180px)" : "min(96vw, 1100px)";

  return (
    <div
      className="pointer-events-auto fixed left-1/2 z-[60] -translate-x-1/2"
      style={{
        top: `calc(72px + ${offset}px)`,
        width: maxWidth,
      }}
    >
      <div className="relative max-h-[calc(100vh-72px)] overflow-y-auto rounded-[26px] border border-sky-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.35)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-sm hover:bg-white"
          aria-label="Close advertisement popup"
        >
          <X className="h-5 w-5" />
        </button>

        {isPhotoMode ? (
          <img
            src={photos[0]}
            alt={item.title || "Uploaded advertisement"}
            className="block max-h-[calc(100vh-110px)] w-full object-contain"
          />
        ) : (
          <div className="max-h-[calc(100vh-110px)] overflow-auto bg-slate-100 p-2 sm:p-3">
            <AdvertisementPoster item={item} audienceLabel="Portal update" className="mx-auto w-fit max-w-none" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function PortalAnnouncements({ audience, className = "" }) {
  const [items, setItems] = useState([]);
  const [dismissedIds, setDismissedIds] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch(
          `/api/admin/status?feature=advertisements&audience=${encodeURIComponent(audience)}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (!cancelled && data.success && Array.isArray(data.rows)) {
          setItems(data.rows);
        }
      } catch (error) {
        console.error("Failed to load portal announcements:", error);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [audience]);

  const visibleItems = useMemo(
    () => items.filter(isLivePoster).filter((item) => !dismissedIds.includes(String(item.id))),
    [items, dismissedIds]
  );

  if (!visibleItems.length) return null;

  return (
    <div className={`fixed inset-x-0 bottom-0 top-[72px] z-[55] pointer-events-none bg-slate-950/30 backdrop-blur-sm ${className}`}>
      {visibleItems.map((item, index) => (
        <PopupCard
          key={item.id}
          item={item}
          index={index}
          onClose={() => setDismissedIds((prev) => [...prev, String(item.id)])}
        />
      ))}
    </div>
  );
}
