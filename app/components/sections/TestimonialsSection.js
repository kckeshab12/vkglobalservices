"use client";

import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import SeoJsonLd from "../SeoJsonLd";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/public/testimonials');
        const data = await response.json();
        setTestimonials(data.testimonials || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="px-6 lg:px-10 py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl text-center">
          <p>Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VK Global Services",
    url: siteUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: String(testimonials.length),
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.slice(0, 10).map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name || "Client",
      },
      reviewBody: testimonial.message || "",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };

  return (
    <section className="px-6 lg:px-10 py-16 bg-slate-50">
      <SeoJsonLd data={reviewSchema} />
      <div className="mx-auto max-w-7xl text-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">What Our Clients Say</h2>
          <p className="mx-auto mt-2 max-w-3xl text-slate-600">
            Testimonials are published from real feedback collected and reviewed by our team through the admin
            dashboard, so the comments you see reflect actual client and learner experiences.
          </p>
        </div>

        <div className="mx-auto mb-10 grid max-w-4xl gap-3 sm:grid-cols-3">
          {[
            "Verified by admin review",
            "Collected from real interactions",
            "Focused on client outcomes",
          ].map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
              {item}
            </div>
          ))}
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 text-left">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <Quote className="w-8 h-8 text-slate-300 mb-4" />

              <p className="text-slate-700 mb-6 leading-relaxed">
                &quot;{testimonial.message}&quot;
              </p>

              <div className="flex items-center gap-3">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-semibold text-slate-900">{testimonial.name}</p>
                  {testimonial.position && (
                    <p className="text-sm text-slate-600">{testimonial.position}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
