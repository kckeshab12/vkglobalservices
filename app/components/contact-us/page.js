"use client";

import { useMemo, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, AlertCircle, MessageSquareText, ShieldCheck, TimerReset } from "lucide-react";
import Footer from "../footer";
import GuestNavbar from "../guest/GuestNavbar";
import SeoJsonLd from "../SeoJsonLd";

const EMAIL = "info@vkglobalservices.com.np";
const PHONE = "+977-9761522137";

const TOPICS = [
  "General Inquiry",
  "Training & Programs",
  "Job/Employer Support",
  "Partnerships",
  "Technical Issue",
];

const INITIAL_FORM = {
  name: "",
  email: "",
  topic: TOPICS[0],
  message: "",
};

export default function AboutContact() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const messageCount = formData.message.length;
  const canSubmit = useMemo(() => !loading, [loading]);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Contact Us", item: `${siteUrl}/components/contact-us` },
    ],
  };
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact VK Global Services",
    url: `${siteUrl}/components/contact-us`,
    mainEntity: {
      "@type": "Organization",
      name: "VK Global Services",
      url: siteUrl,
      telephone: "+977-9761522137",
      email: "info@vkglobalservices.com.np",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lalitpur",
        addressRegion: "Bagmati Province",
        addressCountry: "NP",
      },
    },
  };

  const validate = () => {
    const errors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name) errors.name = "Name is required.";
    if (name && name.length < 2) errors.name = "Name must be at least 2 characters.";

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!message) {
      errors.message = "Message is required.";
    } else if (message.length < 20) {
      errors.message = "Please provide at least 20 characters for better support.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          topic: formData.topic,
          message: formData.message.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg(data.message || "Message sent successfully.");
        setFormData(INITIAL_FORM);
        setFieldErrors({});
      } else {
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch (err) {
      setErrorMsg("Failed to send message. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <GuestNavbar />
      <SeoJsonLd data={breadcrumbSchema} />
      <SeoJsonLd data={contactPageSchema} />

      <main className="px-4 pb-14 pt-20 sm:px-6 lg:px-8">
        <section className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#ead9dd] bg-[linear-gradient(135deg,#7A1C2F_0%,#9a3348_45%,#DCEEFF_100%)] px-6 py-12 text-white sm:px-10">
          <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -bottom-14 left-20 h-48 w-48 rounded-full bg-[#DCEEFF]/25 blur-2xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-[0.1em]">
                <MessageSquareText className="h-3.5 w-3.5" />
                CONTACT DESK
              </span>
              <h1 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">Contact VK Global Services</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#f6fbff] sm:text-base">
                Reach out to our Lalitpur, Kathmandu Valley team for job placement, BPO contact center, HR, sales and
                marketing, finance, social media, web, software, cloud, and SEO lead generation support. Our team
                will route your request to the right service line and respond promptly.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-white/25 bg-white/10 p-4">
                <div className="inline-flex items-center gap-2 text-[#f6fbff]">
                  <TimerReset className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.08em]">Response Time</span>
                </div>
                <p className="mt-2 text-xl font-bold">Within 24 Business Hours</p>
              </div>
              <div className="rounded-2xl border border-white/25 bg-white/10 p-4">
                <div className="inline-flex items-center gap-2 text-[#f6fbff]">
                  <ShieldCheck className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-[0.08em]">Data Privacy</span>
                </div>
                <p className="mt-2 text-xl font-bold">Secure Message Handling</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <aside className="space-y-4">
            <article className="rounded-2xl border border-[#ead9dd] bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-[#21161A]">Contact Channels</h2>
              <div className="mt-4 space-y-3 text-sm">
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-3 rounded-xl border border-[#ead9dd] bg-[#F8FBFF] p-3 text-[#4b3340] hover:border-[#7A1C2F] hover:text-[#7A1C2F]">
                  <Mail className="mt-0.5 h-5 w-5 text-[#7A1C2F]" />
                  <span>{EMAIL}</span>
                </a>
                <a href={`tel:${PHONE.replace(/-/g, "")}`} className="flex items-start gap-3 rounded-xl border border-[#ead9dd] bg-[#F8FBFF] p-3 text-[#4b3340] hover:border-[#7A1C2F] hover:text-[#7A1C2F]">
                  <Phone className="mt-0.5 h-5 w-5 text-[#4d8bc6]" />
                  <span>{PHONE}</span>
                </a>
                <div className="flex items-start gap-3 rounded-xl border border-[#ead9dd] bg-[#F8FBFF] p-3 text-[#4b3340]">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#7A1C2F]" />
                  <span>Lalitpur, Kathmandu, Nepal</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-[#ead9dd] bg-[#F8FBFF] p-3 text-[#4b3340]">
                  <Clock className="mt-0.5 h-5 w-5 text-[#7A1C2F]" />
                  <span>Mon - Fri: 9:30 AM - 5:30 PM</span>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-[#ead9dd] bg-[#F8FBFF] p-3 text-[#4b3340]">
                  <MapPin className="mt-0.5 h-5 w-5 text-[#7A1C2F]" />
                  <span>Service area: Lalitpur, Kathmandu, Bhaktapur, and across Nepal</span>
                </div>
              </div>
            </article>

            <article className="rounded-2xl border border-[#ead9dd] bg-[#F8FBFF] p-5 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#7A1C2F]">Our Location</h3>
              <p className="mt-3 text-sm leading-6 text-[#4b3340]">
                VK Global Services is based in Lalitpur, Kathmandu Valley, Nepal. Visitors looking for workforce,
                BPO, training, or business support can use this dedicated contact page to reach the right team.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Lalitpur%2C+Kathmandu%2C+Nepal"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#7A1C2F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#651726]"
              >
                View on Google Maps
              </a>
            </article>

            <article className="rounded-2xl border border-[#d8c6cb] bg-[#F7EEF1] p-5">
              <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#7A1C2F]">Before You Submit</h3>
              <ul className="mt-3 space-y-2 text-sm text-[#4b3340]">
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Include project or role context in your message.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Use your active email for faster follow-up.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4" /> Mention preferred callback time if needed.</li>
              </ul>
            </article>
          </aside>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-[#ead9dd] bg-white p-5 shadow-sm sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[#21161A] sm:text-2xl">Send Us a Message</h2>
              <span className="text-xs text-[#6a4a55]">All fields are required</span>
            </div>

            {successMsg ? (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4" />
                <span>{successMsg}</span>
              </div>
            ) : null}

            {errorMsg ? (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                <AlertCircle className="mt-0.5 h-4 w-4" />
                <span>{errorMsg}</span>
              </div>
            ) : null}

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Full Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  maxLength={80}
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${fieldErrors.name ? "border-rose-300 bg-rose-50" : "border-[#d8c6cb] focus:border-[#7A1C2F]"}`}
                />
                {fieldErrors.name ? <p className="text-xs text-rose-600">{fieldErrors.name}</p> : null}
              </label>

              <label className="space-y-2 text-sm text-slate-700">
                <span className="font-medium">Email Address</span>
                <input
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={120}
                  className={`w-full rounded-xl border px-4 py-3 outline-none transition ${fieldErrors.email ? "border-rose-300 bg-rose-50" : "border-[#d8c6cb] focus:border-[#7A1C2F]"}`}
                />
                {fieldErrors.email ? <p className="text-xs text-rose-600">{fieldErrors.email}</p> : null}
              </label>
            </div>

            <label className="mt-4 block space-y-2 text-sm text-slate-700">
              <span className="font-medium">Topic</span>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#d8c6cb] px-4 py-3 outline-none transition focus:border-[#7A1C2F]"
              >
                {TOPICS.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block space-y-2 text-sm text-slate-700">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium">Message</span>
                <span className={`text-xs ${messageCount > 600 ? "text-rose-600" : "text-slate-500"}`}>{messageCount}/700</span>
              </div>
              <textarea
                name="message"
                placeholder="Share your requirement, challenge, or question with enough detail."
                value={formData.message}
                onChange={handleChange}
                rows={7}
                maxLength={700}
                className={`w-full rounded-xl border px-4 py-3 outline-none transition ${fieldErrors.message ? "border-rose-300 bg-rose-50" : "border-[#d8c6cb] focus:border-[#7A1C2F]"}`}
              />
              {fieldErrors.message ? <p className="text-xs text-rose-600">{fieldErrors.message}</p> : null}
            </label>

            <button
              type="submit"
              disabled={!canSubmit}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" />
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
