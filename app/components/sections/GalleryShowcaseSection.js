"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, PlayCircle, Sparkles } from "lucide-react";

function mediaKind(item = {}) {
  return String(item.type || "photo").toLowerCase();
}

function GalleryCard({ item, featured = false }) {
  const isVideo = mediaKind(item) === "video";

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      className={`group overflow-hidden rounded-2xl border border-[#ead9dd] bg-white shadow-sm ${
        featured ? "md:row-span-2" : ""
      }`}
    >
      <div className={`${featured ? "aspect-[16/10]" : "aspect-[16/10]"} overflow-hidden bg-[#F8FBFF]`}>
        {isVideo ? (
          <video src={item.url} controls className="h-full w-full object-cover" />
        ) : (
          <img
            src={item.url}
            alt={item.title || "Gallery item"}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="space-y-1.5 p-3.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]">
          {isVideo ? <PlayCircle className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
          {isVideo ? "Video" : "Photo"}
        </div>
        <h3 className="text-sm font-semibold text-[#21161A]">{item.title || "Untitled"}</h3>
        {item.description ? <p className="text-sm text-[#6a4a55]">{item.description}</p> : null}
      </div>
    </motion.article>
  );
}

export default function GalleryShowcaseSection({ showEmptyState = false }) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadGallery = async () => {
      try {
        const response = await fetch("/api/public/gallery", { cache: "no-store" });
        const data = await response.json();
        if (!cancelled) {
          setGallery(Array.isArray(data.gallery) ? data.gallery : []);
        }
      } catch {
        if (!cancelled) {
          setGallery([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadGallery();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleGallery = useMemo(
    () =>
      gallery.filter((item) => {
        const kind = String(item?.type || "photo").toLowerCase();
        return Boolean(item?.url) && kind !== "client";
      }),
    [gallery]
  );

  if (!loading && visibleGallery.length === 0 && !showEmptyState) {
    return null;
  }

  return (
    <section id="gallery-block" className="px-6 py-12 lg:px-10">
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-[#F7EEF1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]">
              <Sparkles className="h-4 w-4" />
              Highlights & Gallery
            </div>
            <h2 className="mt-3 text-2xl font-bold text-[#21161A] md:text-3xl">Recent highlights from our team</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#6a4a55] md:text-base">
              Browse the latest photos and videos shared by our team.
            </p>
          </div>
        </div>

        {visibleGallery.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-[#d8c6cb] bg-[#F8FBFF] p-8 text-center text-[#6a4a55]">
            No highlights have been shared yet.
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visibleGallery.slice(0, 1).map((item) => (
              <GalleryCard key={item.id} item={item} featured />
            ))}
            {visibleGallery.slice(1, 4).map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
