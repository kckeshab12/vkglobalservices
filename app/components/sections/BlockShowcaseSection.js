"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, ImageIcon, Newspaper, PlayCircle, Sparkles } from "lucide-react";

function mediaKind(item = {}) {
  return String(item.type || "photo").toLowerCase();
}

export default function BlockShowcaseSection() {
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [blogsResponse, galleryResponse] = await Promise.all([
          fetch("/api/public/blogs", { cache: "no-store" }),
          fetch("/api/public/gallery", { cache: "no-store" }),
        ]);

        const blogsData = await blogsResponse.json();
        const galleryData = await galleryResponse.json();

        if (!cancelled) {
          setBlogs(Array.isArray(blogsData.blogs) ? blogsData.blogs : []);
          setGallery(Array.isArray(galleryData.gallery) ? galleryData.gallery : []);
        }
      } catch {
        if (!cancelled) {
          setBlogs([]);
          setGallery([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleGallery = useMemo(
    () => gallery.filter((item) => Boolean(item?.url) && String(item?.type || "").toLowerCase() !== "client"),
    [gallery]
  );

  if (!loading && blogs.length === 0 && visibleGallery.length === 0) {
    return null;
  }

  return (
    <section className="px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-[#F7EEF1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]"
        >
          <Sparkles className="h-4 w-4" />
          Block
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-4 text-4xl font-black tracking-tight text-[#21161A] md:text-5xl"
        >
          Blogs, highlights, and gallery updates
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-3 max-w-3xl text-[#6a4a55]"
        >
          Explore the latest stories, photos, and videos shared by our team.
        </motion.p>

        <div className="mt-10 space-y-10 text-left">
          <div>
            <div className="mb-5 flex items-center justify-center gap-2 text-[#7A1C2F]">
              <Newspaper className="h-4 w-4" />
              <h2 className="text-xl font-bold text-[#21161A]">Latest Blogs</h2>
            </div>

            {blogs.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#d8c6cb] bg-white p-8 text-center text-[#6a4a55]">
                No blog posts available yet.
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {blogs.slice(0, 6).map((blog) => (
                  <article key={blog.id} className="overflow-hidden rounded-3xl border border-[#ead9dd] bg-white shadow-sm">
                    {blog.poster ? (
                      <div className="aspect-[16/9] overflow-hidden bg-[#F8FBFF]">
                        <img src={blog.poster} alt={blog.title} className="h-full w-full object-cover" />
                      </div>
                    ) : null}
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[#7A1C2F]">
                        <CalendarDays className="h-4 w-4" />
                        {blog.date ? new Date(blog.date).toLocaleDateString() : "Recent"}
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-[#21161A] line-clamp-2">{blog.title}</h3>
                      <p className="mt-2 text-sm text-[#6a4a55] line-clamp-3">{blog.sub_title || blog.content}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-5 flex items-center justify-center gap-2 text-[#7A1C2F]">
              <ImageIcon className="h-4 w-4" />
              <h2 className="text-xl font-bold text-[#21161A]">Recent Highlights</h2>
            </div>

            {visibleGallery.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[#d8c6cb] bg-white p-8 text-center text-[#6a4a55]">
                No media uploaded yet.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {visibleGallery.slice(0, 8).map((item) => {
                  const isVideo = mediaKind(item) === "video";
                  return (
                    <motion.article
                      key={item.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                      className="overflow-hidden rounded-3xl border border-[#ead9dd] bg-white shadow-sm"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-[#F8FBFF]">
                        {isVideo ? (
                          <video src={item.url} controls className="h-full w-full object-cover" />
                        ) : (
                          <img src={item.url} alt={item.title || "Highlight"} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 p-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">
                        {isVideo ? <PlayCircle className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />}
                        {isVideo ? "Video" : "Photo"}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
