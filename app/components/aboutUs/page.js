// app/components/aboutUs/page.js
"use client";

import {
  Users,
  Target,
  HeartHandshake,
  Mail,
  Phone,
  Star,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Rocket,
  ShieldCheck,
  Building2,
  BarChart3,
  Sparkles,
  CircleCheckBig,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Footer from "../footer";
import GuestNavbar from "../guest/GuestNavbar";
import SeoJsonLd from "../SeoJsonLd";

const HIGHLIGHTS = [
  { icon: Users, value: "500+", label: "Learners Trained", color: "text-[#7A1C2F]" },
  { icon: CheckCircle, value: "85%", label: "Placement Success", color: "text-[#7A1C2F]" },
  { icon: Star, value: "4.8/5", label: "Average Rating", color: "text-[#4d8bc6]" },
  { icon: Building2, value: "100+", label: "Hiring Employers", color: "text-[#6a4a55]" },
];

const VALUES = [
  {
    icon: Users,
    title: "Collaboration",
    text: "We align trainers, recruiters, and employers to build clear and practical hiring pipelines.",
  },
  {
    icon: Target,
    title: "Outcome Focus",
    text: "Every service workflow is designed for measurable business outcomes, delivery quality, and operational clarity.",
  },
  {
    icon: HeartHandshake,
    title: "Integrity",
    text: "We maintain transparent communication between candidates, admin teams, and service providers.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability",
    text: "Structured workflows and role-based controls keep hiring decisions auditable and consistent.",
  },
];

const PROCESS = [
  "Client posts requirement",
  "Admin validates and publishes opening",
  "Candidates apply through Job Portal / Easy Apply",
  "Applications are screened and shared to client",
  "Client updates screening, interview schedule, and final result",
  "Selected candidates receive interview and selection notifications",
];

const EXPERTISE = [
  {
    icon: Briefcase,
    name: "HR & Recruitment Operations",
    detail: "Job publishing, screening coordination, and hiring lifecycle tracking.",
  },
  {
    icon: BarChart3,
    name: "Sales & Marketing Support",
    detail: "Lead flow support, funnel visibility, and campaign execution assistance.",
  },
  {
    icon: Rocket,
    name: "SEO & Lead Generation",
    detail: "Structured outreach support and search visibility oriented execution.",
  },
  {
    icon: Sparkles,
    name: "Social Media Handling",
    detail: "Brand-aware social operations with timely content and engagement workflows.",
  },
];

const TESTIMONIALS = [
  {
    quote: "The practical projects and mentorship helped me land my first role in 3 months.",
    person: "Amina, Full-Stack Graduate",
  },
  {
    quote: "Great mentorship and real employer connections with clear communication at each stage.",
    person: "Karim, Data Analyst",
  },
];

export default function AboutContact() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "VK Global Services",
    url: siteUrl,
    logo: `${siteUrl}/logo.jpeg`,
    sameAs: ["https://www.facebook.com/share/1FH22ssT1t/"],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "About Us", item: `${siteUrl}/components/aboutUs` },
    ],
  };

  return (
    <div className="bg-white">
      <GuestNavbar />
      <SeoJsonLd data={organizationSchema} />
      <SeoJsonLd data={breadcrumbSchema} />

      <section className="relative overflow-hidden px-6 pb-14 pt-16 sm:pt-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_#f7eef1_0%,_#eef7ff_42%,_#ffffff_78%)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-white/95 px-4 py-2 text-sm font-medium text-[#7A1C2F] shadow-sm">
              <CircleCheckBig className="h-4 w-4" />
              Trusted Career & Business Support Partner
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
              About <span className="text-[#7A1C2F]">VK Global Services</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#6a4a55] sm:text-lg">
              VK Global Services bridges workforce development and business execution through one connected ecosystem
              from Lalitpur, Kathmandu Valley, Nepal: job placement, BPO contact center, HR, sales and marketing,
              financial accounting, social media, web services, software and app development, cloud and IT, and SEO
              lead generation.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="https://vkcareersolution.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#7A1C2F] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#d8c6cb]/60 transition hover:bg-[#651726]"
              >
                Explore Easy Apply
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://vkcareersolution.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-white px-6 py-3 text-sm font-semibold text-[#4b3340] transition hover:border-[#7A1C2F] hover:text-[#7A1C2F]"
              >
                <GraduationCap className="h-4 w-4" />
                Join as Job Seeker
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-[#ead9dd] bg-white p-6 shadow-xl sm:p-8">
            <h2 className="text-lg font-semibold text-[#21161A]">Impact Snapshot</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {HIGHLIGHTS.map((item) => (
                <div key={item.label} className="rounded-2xl border border-[#ead9dd] bg-[#F8FBFF] p-4">
                  <item.icon className={`h-7 w-7 ${item.color}`} />
                  <p className="mt-3 text-2xl font-extrabold text-[#21161A]">{item.value}</p>
                  <p className="text-sm text-[#6a4a55]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-[#ead9dd] bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-[#21161A]">Mission & Operating Model</h3>
              <p className="mt-3 text-[#6a4a55]">
                We deliver an integrated operations workflow where each stakeholder has role-specific controls:
                Admin manages governance, Service Providers update client decisions, and Job Seekers track outcomes transparently while business service teams execute measurable delivery plans.
              </p>
              <ul className="mt-5 space-y-3">
                {PROCESS.map((step) => (
                  <li key={step} className="flex items-start gap-3 text-[#4b3340]">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 flex-none text-[#7A1C2F]" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid gap-4">
              {VALUES.map((value) => (
                <article
                  key={value.title}
                  className="rounded-2xl border border-[#ead9dd] bg-[#F8FBFF] p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <value.icon className="h-7 w-7 text-[#7A1C2F]" />
                  <h4 className="mt-3 text-lg font-semibold text-[#21161A]">{value.title}</h4>
                  <p className="mt-2 text-sm text-[#6a4a55]">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-4">
        <div className="mx-auto max-w-7xl">
          <h3 className="text-center text-2xl font-bold text-[#21161A]">Our Expertise</h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-[#6a4a55]">
            We combine people operations and growth execution services to support both recruitment and business performance.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {EXPERTISE.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-[#ead9dd] bg-white p-5 shadow-sm transition hover:border-[#7A1C2F]/30 hover:shadow-md"
              >
                <item.icon className="h-7 w-7 text-[#7A1C2F]" />
                <h4 className="mt-3 text-lg font-semibold text-[#21161A]">{item.name}</h4>
                <p className="mt-2 text-sm text-[#6a4a55]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-[#ead9dd] bg-gradient-to-r from-[#F7EEF1] via-white to-[#eef7ff] p-6 sm:p-8">
          <h3 className="text-center text-2xl font-bold text-[#21161A]">What Learners Say</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {TESTIMONIALS.map((item) => (
              <blockquote key={item.person} className="rounded-2xl border border-[#ead9dd] bg-white p-5 shadow-sm">
                <p className="text-[#4b3340]">&quot;{item.quote}&quot;</p>
                <footer className="mt-3 text-sm font-medium text-[#6a4a55]">{item.person}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-14">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#7A1C2F] p-6 text-white shadow-2xl sm:p-8">
          <h3 className="text-2xl font-bold">Connect With VK Global Services</h3>
          <p className="mt-2 text-[#f4e8eb]">
            Talk to us for hiring support, BPO operations, and complete business service partnerships.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a
              href="mailto:info@vkglobalservices.com.np"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
            >
              <Mail className="h-4 w-4" />
              Email Us
            </a>
            <a
              href="tel:+9779761522137"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#DCEEFF] px-4 py-3 text-sm font-semibold text-[#21161A] transition hover:bg-white"
            >
              <Phone className="h-4 w-4" />
              Call Now
            </a>
            <a
              href="https://vkcareersolution.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
            >
              <GraduationCap className="h-4 w-4" />
              Job Portal
            </a>
            <a
              href="https://vkcareersolution.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-transparent px-4 py-3 text-sm font-semibold transition hover:border-[#DCEEFF] hover:text-[#DCEEFF]"
            >
              <Briefcase className="h-4 w-4" />
              Job Portal
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
