"use client";

import {
  Facebook,
  Linkedin,
  Mail,
  MessageCircle,
  MessageSquare,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SeoJsonLd from "./SeoJsonLd";

export default function Footer() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";

  const faqs = [
    {
      q: "How can I apply for jobs?",
      a: "Browse jobs and use Quick Apply or submit your application directly.",
    },
    {
      q: "Which services does VK Global Services provide?",
      a: "Job Placement, BPO Contact Center, HR, Sales & Marketing, Financial & Accounting, Social Media, Website/Web, Software/App, Cloud & IT, and SEO & Lead Generation.",
    },
    {
      q: "What BPO services do you offer?",
      a: "Inbound, outbound, customer support, and workforce outsourcing solutions.",
    },
    {
      q: "Are training programs available online?",
      a: "Yes, we provide online, offline, and hybrid training programs.",
    },
  ];

  const contactNumber = "9761522137";
  const email = "info@vkglobalservices.com.np";
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "VK Global Services",
    url: siteUrl,
    email,
    telephone: "+977-9761522137",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lalitpur",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    sameAs: ["https://www.facebook.com/share/1FH22ssT1t/"],
  };

  return (
    <footer className="mt-16 border-t border-slate-800/70 bg-[linear-gradient(125deg,#0f172a_0%,#1e293b_45%,#0b3d61_100%)] text-white">
      <SeoJsonLd data={organizationSchema} />
      <SeoJsonLd data={faqSchema} />
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold tracking-wide">VK Global Services</h2>
          <p className="mt-4 text-slate-200 text-sm leading-relaxed max-w-md">
            A complete workforce and business services ecosystem connecting talent to jobs and delivering BPO, HR, marketing, finance, social, web, software, cloud, and SEO-led growth support.
          </p>
          <p className="mt-4 text-sm text-slate-300">
            Lalitpur, Kathmandu Valley, Nepal
            <span className="mx-2 text-white/30">|</span>
            +977-9761522137
            <span className="mx-2 text-white/30">|</span>
            info@vkglobalservices.com.np
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-cyan-200 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-200">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/components/aboutUs" className="hover:text-white">About Us</Link></li>
            <li><Link href="/components/contact-us" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-cyan-200 mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-slate-200">
            <li><Link href="/components/contact-center" className="hover:text-white">Contact Center</Link></li>
            <li><Link href="/components/JobPage" className="hover:text-white">Job Placement</Link></li>
            <li><Link href="/components/TrainingPage" className="hover:text-white">Training & Workforce Development</Link></li>
            <li>
              <button onClick={() => setShowFAQ(true)} className="hover:text-white">FAQs</button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-cyan-200 mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-slate-200">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-cyan-200" />
              <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-cyan-200" />
              <a href={`https://wa.me/977${contactNumber}`} target="_blank" className="hover:text-white">WhatsApp: +977 {contactNumber}</a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-cyan-200" />
              <a href={`viber://chat?number=%2B977${contactNumber}`} className="hover:text-white">Viber: +977 {contactNumber}</a>
            </li>
            <li className="flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-200" />
              <Link href="/components/contact-us" className="hover:text-white">Leave a Message</Link>
            </li>
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <Link href="https://www.facebook.com/share/1FH22ssT1t/" target="_blank">
              <Facebook className="w-5 h-5 hover:text-cyan-200 transition" />
            </Link>
            <Link href="https://linkedin.com" target="_blank">
              <Linkedin className="w-5 h-5 hover:text-cyan-200 transition" />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/15 py-4 text-center text-xs text-slate-300">
        Copyright {new Date().getFullYear()} VK Global Services. All rights reserved.
      </div>

      {showFAQ && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-slate-800 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold">Frequently Asked Questions</h2>
              <button onClick={() => setShowFAQ(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <ul className="space-y-3">
              {faqs.map((faq, i) => (
                <li key={faq.q}>
                  <button
                    onClick={() => setActiveQuestion(activeQuestion === i ? null : i)}
                    className="font-medium hover:text-cyan-700 text-left"
                  >
                    {faq.q}
                  </button>
                  {activeQuestion === i && (
                    <p className="text-sm mt-1 text-slate-600">{faq.a}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </footer>
  );
}
