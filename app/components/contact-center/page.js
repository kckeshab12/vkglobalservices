"use client";

import Link from "next/link";
import {
  BarChart,
  Briefcase,
  CheckCircle2,
  Clock3,
  Layers,
  MessageSquare,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import GuestNavbar from "../guest/GuestNavbar";
import Footer from "../footer";
import SeoJsonLd from "../SeoJsonLd";

export default function ContactCenterPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "BPO Contact Center Services",
    serviceType: "BPO Contact Center",
    provider: {
      "@type": "Organization",
      name: "VK Global Services",
      url: siteUrl,
    },
    areaServed: { "@type": "Country", name: "Nepal" },
    url: `${siteUrl}/components/contact-center`,
    description:
      "Explore VK Global Services contact center operations, support services, and BPO delivery capabilities.",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Contact Center", item: `${siteUrl}/components/contact-center` },
    ],
  };

  const solutions = [
    {
      title: "Inbound Customer Support",
      desc: "Multichannel voice, chat, and email support for enquiries, troubleshooting, and order handling.",
      icon: Users,
    },
    {
      title: "Outbound Sales & Retention",
      desc: "Lead qualification, upsell, renewals, and collections with campaign reporting.",
      icon: Target,
    },
    {
      title: "Technical & Product Support",
      desc: "Tier-1 and tier-2 support with guided troubleshooting and escalation workflows.",
      icon: Briefcase,
    },
    {
      title: "Back-office Processing",
      desc: "Data entry, claims processing, invoice reconciliation, and rule-based BPO operations.",
      icon: Layers,
    },
    {
      title: "Automation & Bots",
      desc: "Hybrid automation for routine flows with smooth human handoff for complex issues.",
      icon: CheckCircle2,
    },
    {
      title: "Analytics & QA",
      desc: "Speech/text analytics, QA audits, coaching, and dashboards to improve quality and CSAT.",
      icon: BarChart,
    },
  ];

  const capabilities = [
    "Workforce hiring, role-based training and certification",
    "Forecasting, scheduling, and workforce management",
    "SOPs, process design, and knowledge base management",
    "Quality assurance, calibration, and coaching",
    "CCaaS/IVR, omnichannel routing, and CRM integrations",
    "Security, data protection, and compliance standards",
  ];

  const industries = [
    "Banking and Financial Services",
    "Telecommunications and ISP",
    "Healthcare",
    "E-commerce and Retail",
    "Fintech and Payments",
    "Travel, Logistics, and Hospitality",
  ];

  const process = [
    "Discovery and process mapping",
    "Transition and pilot setup",
    "Agent training and QA baseline",
    "SLA-driven go-live and optimization",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <GuestNavbar />
      <SeoJsonLd data={serviceSchema} />
      <SeoJsonLd data={breadcrumbSchema} />

      <main className="flex-grow pt-20">
        <header className="relative overflow-hidden bg-[linear-gradient(130deg,#081b2a_0%,#0b3d61_45%,#0a5275_100%)] text-white py-16 md:py-20">
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.11em] bg-white/10 border border-white/20 rounded-full px-3 py-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              BPO Delivery Unit
            </span>

            <h1 className="mt-4 text-3xl md:text-5xl font-extrabold leading-tight">BPO Contact Center Services in Nepal</h1>
            <p className="mt-4 text-base md:text-lg text-slate-100 max-w-3xl">
              Scalable contact center operations from our Lalitpur, Kathmandu Valley team with omnichannel support,
              sales and retention, technical helpdesk, and back-office processing backed by measurable SLAs and
              continuous improvement.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/components/contact-us" className="px-5 py-3 bg-cyan-300 text-slate-900 rounded-xl font-semibold hover:bg-cyan-200 transition">
                Contact Us
              </Link>
              <a href="mailto:info@vkglobalservices.com.np?subject=Contact%20BPO%20Services" className="px-5 py-3 bg-white text-[#0B3D61] rounded-xl font-semibold hover:bg-slate-100 transition">
                Request Info
              </a>
            </div>
          </div>
        </header>

        <section className="-mt-8 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Channels", value: "Voice, Chat, Email" },
              { label: "Coverage", value: "24/7 or Shift-based" },
              { label: "QA", value: "Scorecards + Coaching" },
              { label: "Reporting", value: "Daily / Weekly / Monthly" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                <p className="text-xs uppercase tracking-[0.08em] text-slate-500">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-14 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">What We Offer</h2>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {solutions.map((s) => {
                const Icon = s.icon;
                return (
                  <article key={s.title} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-100">
                        <Icon size={19} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{s.title}</h3>
                        <p className="text-sm mt-1 text-slate-600">{s.desc}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-14 bg-white px-4 sm:px-6 border-y border-slate-200">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Capabilities & Operations</h2>
              <ul className="grid gap-3 text-slate-700">
                {capabilities.map((c) => (
                  <li key={c} className="p-3 border border-slate-200 rounded-lg bg-slate-50 text-sm">
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Delivery Process</h2>
              <div className="space-y-3">
                {process.map((step, idx) => (
                  <div key={step} className="flex gap-3 p-3 border border-slate-200 rounded-lg bg-slate-50">
                    <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-semibold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-700">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800 inline-flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Security and Compliance Ready
                </p>
                <p className="text-sm text-emerald-700 mt-1">
                  Controlled access, process governance, and audit-friendly workflows for sensitive operations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Technology Stack</h2>
              <p className="text-slate-700 mb-4 text-sm md:text-base">
                We implement CCaaS, IVR, CRM integrations, chat automation, analytics, and BI dashboards to improve speed, visibility, and resolution outcomes.
              </p>
              <div className="flex flex-wrap gap-2">
                {["CCaaS (Twilio / Genesys)", "CRM / Ticketing", "IVR and Voice Gateway", "Chatbots and Automation", "Speech and Text Analytics", "BI Dashboards"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm text-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {industries.map((i) => (
                  <div key={i} className="p-3 bg-white border border-slate-200 rounded-lg text-slate-700 text-sm">
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 bg-gradient-to-br from-[#0A5275] to-[#0B3D61] text-white px-4 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Ready to Scale Your Contact Center?</h3>
            <p className="mb-6 text-slate-100 max-w-2xl mx-auto">
              Partner with a local team experienced in hiring, training, and operating omnichannel contact center programs across Nepal.
            </p>
            <div className="flex justify-center flex-wrap gap-3">
              <Link href="/components/contact-us" className="px-6 py-3 bg-white text-[#0B3D61] rounded-xl font-semibold hover:bg-slate-100 transition">
                Contact Us
              </Link>
              <a href="mailto:info@vkglobalservices.com.np?subject=BPO%20Contact%20Center%20Inquiry" className="px-6 py-3 border border-white rounded-xl hover:bg-white/10 transition inline-flex items-center gap-2">
                <Clock3 className="w-4 h-4" />
                Request Info
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
