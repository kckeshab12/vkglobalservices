"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const PANEL_LAYOUT = [
  {
    clip: "polygon(0 0, 40% 0, 54% 100%, 0 100%)",
    tint: "bg-[linear-gradient(180deg,rgba(68,0,30,0.36)_0%,rgba(68,0,30,0.30)_100%)]",
  },
  {
    clip: "polygon(34% 0, 68% 0, 82% 100%, 48% 100%)",
    tint: "bg-[linear-gradient(180deg,rgba(18,12,30,0.12)_0%,rgba(18,12,30,0.16)_100%)]",
  },
  {
    clip: "polygon(58% 0, 100% 0, 100% 100%, 72% 100%)",
    tint: "bg-[linear-gradient(180deg,rgba(16,74,120,0.08)_0%,rgba(16,74,120,0.12)_100%)]",
  },
];

function normalizeUrl(url) {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  return url.startsWith("/") ? url : `/${url}`;
}

export default function HeroMediaBackdrop() {
  const [heroMedia, setHeroMedia] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function fetchHeroMedia() {
      try {
        const response = await fetch("/api/public/hero-media", { cache: "no-store" });
        if (!response.ok) return;

        const data = await response.json();
        const items = Array.isArray(data.heroMedia)
          ? data.heroMedia.filter((item) => item?.type === "photo" && item?.url)
          : [];

        if (!ignore) {
          setHeroMedia(items);
        }
      } catch (error) {
        console.error("Failed to fetch hero media:", error);
      }
    }

    fetchHeroMedia();

    return () => {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    if (heroMedia.length <= 1) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMedia.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [heroMedia.length]);

  const displayMedia = useMemo(() => {
    if (heroMedia.length === 0) return [];

    const slots = [];
    for (let i = 0; i < 3; i += 1) {
      const nextIndex = (currentIndex + i) % heroMedia.length;
      slots.push(heroMedia[nextIndex]);
    }
    return slots;
  }, [currentIndex, heroMedia]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#140812]">
      {displayMedia.map((item, index) => (
        <motion.div
          key={`${item.id || item.url}-${currentIndex}-${index}`}
          className="absolute inset-y-0 overflow-hidden"
          style={{ clipPath: PANEL_LAYOUT[index]?.clip || "inset(0)" }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
          aria-hidden
        >
          <img
            src={normalizeUrl(item.url)}
            alt={`VK Global Services hero media: ${item.title || `featured image ${index + 1}`}`}
            loading="eager"
            decoding="async"
            fetchPriority={index === 0 ? "high" : "auto"}
            className="h-full w-full object-cover scale-[1.08]"
            style={{
              objectPosition:
                index === 0 ? "center left" : index === 1 ? "center" : "center right",
            }}
          />
          <div className={`absolute inset-0 ${PANEL_LAYOUT[index]?.tint || "bg-black/20"}`} />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,10,18,0.72)_0%,rgba(24,10,18,0.50)_26%,rgba(24,10,18,0.10)_58%,rgba(9,56,103,0.16)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_20%,rgba(255,255,255,0.10),transparent_26%),radial-gradient(circle_at_86%_18%,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="absolute right-3 top-6 h-56 w-10 rounded-full bg-[radial-gradient(circle,rgba(219,234,254,0.45)_2px,transparent_2px)] bg-[length:10px_10px] opacity-45" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgba(20,8,18,0)_0%,rgba(20,8,18,0.22)_100%)]" />
    </div>
  );
}
