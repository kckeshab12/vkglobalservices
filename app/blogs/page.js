"use client";

import { useEffect, useState } from "react";
import GuestNavbar from "../components/guest/GuestNavbar";
import Footer from "../components/footer";
import { Calendar, User, ArrowRight, Sparkles, MapPin, ShieldCheck } from "lucide-react";
import SeoJsonLd from "../components/SeoJsonLd";

export default function BlogsPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const blogThemes = [
    "Hiring and workforce insights",
    "BPO and customer operations",
    "Training and career readiness",
    "Business services in Nepal",
  ];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blogs", item: `${siteUrl}/blogs` },
    ],
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/public/blogs');
        const data = await response.json();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-800">
      <GuestNavbar />
      <SeoJsonLd data={breadcrumbSchema} />

      <section className="relative pt-20 pb-16 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Editorial updates
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Insights from VK Global Services
            </h1>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our blog shares practical updates on hiring, workforce support, training, contact center delivery,
              and business services in Nepal. Each post is written to help employers, job seekers, and partners make
              informed decisions.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {blogThemes.map((theme) => (
                <span
                  key={theme}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-sky-600" />
                  {theme}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-slate-600">Loading blogs...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <MapPin className="mx-auto h-10 w-10 text-sky-600" />
              <h2 className="mt-4 text-2xl font-bold text-slate-900">More articles are on the way</h2>
              <p className="mt-3 text-slate-600">
                We publish practical guidance on hiring, training, contact center operations, and business support.
                Check back soon for new posts, or contact us if you want a topic covered in a future article.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                  {blog.poster && (
                    <div className="aspect-video bg-slate-100">
                      <img
                        src={blog.poster}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      {blog.date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(blog.date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {blog.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">
                      {blog.title}
                    </h2>

                    {blog.sub_title && (
                      <p className="text-slate-600 mb-3">{blog.sub_title}</p>
                    )}

                    <p className="text-slate-700 mb-4 line-clamp-5">
                      {blog.content}
                    </p>

                    {blog.message && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-blue-800 text-sm">{blog.message}</p>
                      </div>
                    )}

                    <button className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
