"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BarChart,
  CheckCircle2,
  Calculator,
  FileText,
  Globe,
  Megaphone,
  Search,
  Share2,
  ShieldCheck,
  TrendingUp,
  UserCog,
  X,
} from "lucide-react";

function AnimatedCounter({ end, suffix = "", prefix = "", duration = 1200 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;

    let rafId;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * end));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [duration, end, inView]);

  return (
    <span ref={ref} className="text-lg font-bold text-slate-900">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

const services = [
  {
    icon: UserCog,
    title: "HR Services",
    poster: "/HR%20service%20banner.jpg.jpeg",
    desc: "End-to-end people operations support including hiring, onboarding, and HR process setup.",
    bestFor: "Growing teams and scaling businesses",
    delivery: "Retainer or project-based HR support",
    turnaround: "Weekly operational support cycles",
    caseStudyStats: [
      { label: "Time-to-Hire", value: 33, prefix: "-", suffix: "%" },
      { label: "Retention Improvement", value: 22, prefix: "+", suffix: "%" },
    ],
    outcomes: ["Faster hiring cycles", "Stronger employee onboarding", "Structured HR compliance workflows"],
    sections: [
      { heading: "Talent Acquisition", content: "Role definition, sourcing support, candidate screening, and coordinated hiring workflows." },
      { heading: "Onboarding & Policy", content: "Onboarding systems, HR policy frameworks, and role-aligned documentation." },
      { heading: "People Operations", content: "Attendance process, performance tracking structure, and HR operational reporting." },
    ],
  },
  {
    icon: Megaphone,
    title: "Sales & Marketing Services",
    poster: "/Sales%20&%20Marketing%20Services%20banner.jpg.jpeg",
    desc: "Integrated sales enablement and marketing execution to improve pipeline quality and conversions.",
    bestFor: "Revenue-focused teams and service companies",
    delivery: "Monthly growth execution plans",
    turnaround: "Bi-weekly optimization sprints",
    caseStudyStats: [
      { label: "Pipeline Growth", value: 35, prefix: "+", suffix: "%" },
      { label: "Lead-to-Sale Rate", value: 19, prefix: "+", suffix: "%" },
    ],
    outcomes: ["Stronger sales pipeline", "Better lead handoff process", "Improved campaign-to-revenue visibility"],
    sections: [
      { heading: "Go-to-Market Planning", content: "Positioning, audience segmentation, channel planning, and offer structuring." },
      { heading: "Campaign Execution", content: "Multi-channel sales and marketing campaigns with measurable targets." },
      { heading: "Sales Enablement", content: "Lead qualification flow, collateral optimization, and conversion tracking." },
    ],
  },
  {
    icon: Calculator,
    title: "Financial & Accounting Services",
    poster: "/Financial%20&%20Accounting%20Services%20banner.jpg.jpeg",
    desc: "Reliable accounting operations, reporting support, and process standardization for business finance.",
    bestFor: "SMEs, startups, and service-led organizations",
    delivery: "Monthly accounting and compliance support",
    turnaround: "Periodic reporting and close cycles",
    caseStudyStats: [
      { label: "Reporting Accuracy", value: 28, prefix: "+", suffix: "%" },
      { label: "Month-End Time", value: 31, prefix: "-", suffix: "%" },
    ],
    outcomes: ["Cleaner financial records", "Faster financial reporting", "Better cash-flow visibility"],
    sections: [
      { heading: "Bookkeeping", content: "Daily transaction records, reconciliations, and ledger discipline." },
      { heading: "Reporting", content: "Periodic MIS reports and performance-oriented financial summaries." },
      { heading: "Process Controls", content: "Accounting SOPs and review checkpoints for accuracy and compliance." },
    ],
  },
  {
    icon: Share2,
    title: "Social Media Handling Services",
    poster: "/Social%20Media%20Handling%20Services%20banner.jpg.jpeg",
    desc: "Content planning, creative posting, and engagement management across major social platforms.",
    bestFor: "Brands building digital presence and engagement",
    delivery: "Calendar-driven social operations",
    turnaround: "Weekly publishing and engagement loops",
    caseStudyStats: [
      { label: "Engagement Growth", value: 42, prefix: "+", suffix: "%" },
      { label: "Audience Reach", value: 37, prefix: "+", suffix: "%" },
    ],
    outcomes: ["Consistent brand communication", "Higher audience interaction", "Stronger social visibility"],
    sections: [
      { heading: "Content Calendar", content: "Monthly content themes, post scheduling, and campaign planning." },
      { heading: "Community Management", content: "Audience response handling, query moderation, and engagement support." },
      { heading: "Performance Insights", content: "Social performance reporting with recommendations for continuous growth." },
    ],
  },
  {
    icon: Globe,
    title: "Website & Web Services",
    poster: "/Website%20&%20Web%20Services%20banner.jpg.jpeg",
    desc: "Modern websites, web apps, and integrations tailored to your brand and operations.",
    bestFor: "SMEs, startups, and service brands",
    delivery: "Project-based or retainer",
    turnaround: "2-8 weeks based on scope",
    caseStudyStats: [
      { label: "Conversion Lift", value: 32, prefix: "+", suffix: "%" },
      { label: "Bounce Drop", value: 24, prefix: "-", suffix: "%" },
    ],
    outcomes: ["Faster website performance", "Higher lead conversion", "Stronger brand trust"],
    sections: [
      { heading: "Design & Development", content: "Responsive websites with modern UI/UX and scalable architecture." },
      { heading: "Maintenance", content: "Continuous updates, performance optimization, and issue resolution." },
      { heading: "Analytics", content: "Performance and conversion tracking for better decisions." },
    ],
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    poster: "/Digital%20Marketing%20Services%20banner.jpg.jpeg",
    desc: "Campaign strategy and execution to improve reach, engagement, and lead quality.",
    bestFor: "Growth-stage and sales-driven teams",
    delivery: "Monthly campaign management",
    turnaround: "Weekly optimization cycles",
    caseStudyStats: [
      { label: "Lead Growth", value: 38, prefix: "+", suffix: "%" },
      { label: "CPA Reduction", value: 27, prefix: "-", suffix: "%" },
    ],
    outcomes: ["Qualified inbound traffic", "Lower cost-per-lead", "Clear ROI reporting"],
    sections: [
      { heading: "Social Media", content: "Platform-specific campaigns and audience engagement plans." },
      { heading: "Paid Ads", content: "Optimized ad funnels with controlled budget and measurable ROI." },
      { heading: "Reporting", content: "Insight-driven reporting for continuous campaign improvements." },
    ],
  },
  {
    icon: FileText,
    title: "Software & App Development",
    poster: "/Software%20&%20App%20Development%20banner.jpg.jpeg",
    desc: "Custom applications that automate workflows and improve customer experience.",
    bestFor: "Operations-heavy organizations",
    delivery: "Milestone-based implementation",
    turnaround: "4-16 weeks based on complexity",
    caseStudyStats: [
      { label: "Task Automation", value: 46, prefix: "+", suffix: "%" },
      { label: "Ops Time Saved", value: 35, prefix: "-", suffix: "%" },
    ],
    outcomes: ["Reduced manual operations", "Better customer journey", "Scalable digital foundation"],
    sections: [
      { heading: "Mobile Apps", content: "Android, iOS, and cross-platform solutions built for reliability." },
      { heading: "Business Software", content: "Tailored ERP, CRM, and operation tools for core business use." },
      { heading: "Integration", content: "APIs and platform integrations for seamless data exchange." },
    ],
  },
  {
    icon: BarChart,
    title: "Cloud & IT Services",
    poster: "/Cloud%20&%20IT%20Services%20banner.jpg.jpeg",
    desc: "Cloud hosting, infrastructure support, and security-focused IT services.",
    bestFor: "Companies scaling online systems",
    delivery: "Managed support model",
    turnaround: "Rapid response support SLA",
    caseStudyStats: [
      { label: "Uptime Stability", value: 99, suffix: ".9%" },
      { label: "Incident Recovery", value: 40, prefix: "+", suffix: "%" },
    ],
    outcomes: ["Higher uptime", "Lower downtime risk", "Secure infrastructure controls"],
    sections: [
      { heading: "Hosting", content: "Scalable infrastructure for websites, apps, and business systems." },
      { heading: "Support", content: "Remote and on-site technical support to reduce downtime." },
      { heading: "Security", content: "Monitoring, protection, and backup recovery planning." },
    ],
  },
  {
    icon: Search,
    title: "SEO & Lead Generation Services",
    poster: "/SEO%20&%20Lead%20Generation%20Services%20banner.jpg.jpeg",
    desc: "Integrated SEO and lead generation strategy to drive discoverability and high-intent prospects.",
    bestFor: "B2B and high-ticket service teams",
    delivery: "Performance-driven campaigns",
    turnaround: "Continuous pipeline iteration",
    caseStudyStats: [
      { label: "Organic Leads", value: 41, prefix: "+", suffix: "%" },
      { label: "Search Visibility", value: 36, prefix: "+", suffix: "%" },
    ],
    outcomes: ["Higher search ranking", "Better lead quality", "Stronger conversion consistency"],
    sections: [
      { heading: "Technical + On-page SEO", content: "Site structure, speed, metadata, indexing, and content optimization for ranking growth." },
      { heading: "Lead Funnel Setup", content: "Landing flow, form strategy, and multi-channel traffic capture aligned with intent." },
      { heading: "Nurture & Conversion", content: "Lead scoring, follow-up frameworks, and pipeline tuning for better close rates." },
    ],
  },
];

export default function OfferedServicesSection() {
  const router = useRouter();
  const [serviceModal, setServiceModal] = useState(null);
  const ModalIcon = serviceModal?.icon;

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const heroBlurb = [
    "Nine service lines, each paired with a dedicated banner.",
    "A richer card layout that balances poster, summary, and outcomes.",
    "Click any card to explore the deeper service framework.",
  ];

  return (
    <section
      id="offered-services"
      className="relative overflow-hidden py-20 px-6 lg:px-24 bg-[linear-gradient(180deg,#fff8fa_0%,#f7fbff_46%,#ffffff_100%)]"
    >
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(122,28,47,.12),transparent_70%)]" />
      <div className="absolute right-0 top-24 h-56 w-56 rounded-full bg-[#dceeff]/50 blur-3xl" />
      <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-[#7A1C2F]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#7A1C2F] shadow-sm backdrop-blur"
        >
          <ShieldCheck className="h-4 w-4" />
          Services we offer
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.04 }}
          className="text-center text-3xl font-bold text-[#21161A] lg:text-5xl"
        >
          Built for business, hiring, and digital growth
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-[#6a4a55]"
        >
          Service lines designed to strengthen online presence, optimize operations, and improve business outcomes.
        </motion.p>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
          {heroBlurb.map((item) => (
            <div key={item} className="rounded-2xl border border-[#ead9dd] bg-white/80 px-4 py-3 text-sm text-[#4b3340] shadow-sm backdrop-blur">
              {item}
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, idx) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="group cursor-pointer overflow-hidden rounded-[28px] border border-[#ead9dd] bg-white shadow-[0_16px_50px_rgba(33,22,26,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(33,22,26,0.14)]"
                onClick={() => setServiceModal({ ...service, activeSection: 0 })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setServiceModal({ ...service, activeSection: 0 })}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f8fbff]">
                  <img
                    src={service.poster}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#21161A]/72 via-[#21161A]/16 to-transparent" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                    <Icon className="h-3.5 w-3.5" />
                    {idx + 1}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="max-w-[85%] text-sm font-semibold uppercase tracking-[0.14em] text-white/80">
                      {service.bestFor}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm leading-6 text-[#5f424d]">{service.desc}</p>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {service.caseStudyStats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-[#ead9dd] bg-[#F8FBFF] px-3 py-2.5">
                        <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                        <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-[#6a4a55]">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">
                      <TrendingUp className="h-4 w-4" />
                      Quick outcomes
                    </div>
                    <div className="space-y-2">
                      {service.outcomes.slice(0, 2).map((item) => (
                        <p key={item} className="flex items-center gap-2 text-sm text-[#4b3340]">
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F7EEF1] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">
                      Open details
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#7A1C2F]">
                      View framework
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {serviceModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/55" onClick={() => setServiceModal(null)} />

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-[30px] border border-[#ead9dd] bg-white shadow-2xl"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[280px] lg:min-h-full">
                <img src={serviceModal.poster} alt={serviceModal.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#21161A]/70 via-[#21161A]/24 to-transparent" />
                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                  {ModalIcon ? <ModalIcon className="h-3.5 w-3.5" /> : null}
                  Featured service
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-3xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
                    {serviceModal.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-white/85">{serviceModal.desc}</p>
                </div>
              </div>

              <div className="relative max-h-[90vh] overflow-y-auto p-6 md:p-8">
                <button
                  onClick={() => setServiceModal(null)}
                  className="absolute right-4 top-4 rounded-full border border-[#ead9dd] bg-white p-2 text-slate-500 hover:text-slate-800"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="pr-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A1C2F]">
                    {serviceModal.bestFor}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-[#21161A]">{serviceModal.title}</h3>
                  <p className="mt-3 text-base leading-7 text-[#5f424d]">{serviceModal.desc}</p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#ead9dd] bg-[#F8FBFF] px-4 py-3 text-sm text-[#4b3340]">
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">Delivery Model</span>
                    <span className="mt-1 block font-medium">{serviceModal.delivery}</span>
                  </div>
                  <div className="rounded-2xl border border-[#ead9dd] bg-[#F7EEF1] px-4 py-3 text-sm text-[#4b3340]">
                    <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1C2F]">Turnaround</span>
                    <span className="mt-1 block font-medium">{serviceModal.turnaround}</span>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {serviceModal.caseStudyStats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-[#ead9dd] bg-white px-4 py-3 shadow-sm">
                      <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                      <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[220px_1fr]">
                  <div className="space-y-2">
                    {serviceModal.sections.map((section, index) => (
                      <button
                        key={section.heading}
                        onClick={() => setServiceModal((prev) => ({ ...prev, activeSection: index }))}
                        className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                          serviceModal.activeSection === index
                            ? "border-[#7A1C2F] bg-[#7A1C2F] text-white shadow-sm"
                            : "border-[#ead9dd] bg-white text-slate-700 hover:bg-[#F8FBFF]"
                        }`}
                      >
                        {section.heading}
                      </button>
                    ))}
                  </div>

                  <div className="rounded-3xl border border-[#ead9dd] bg-[linear-gradient(180deg,#F8FBFF_0%,#ffffff_100%)] p-5 text-slate-700">
                    <p className="text-base leading-7">{serviceModal.sections[serviceModal.activeSection].content}</p>
                    <div className="mt-5">
                      <p className="mb-2 text-sm font-semibold text-[#21161A]">Expected Outcomes</p>
                      <div className="space-y-2">
                        {serviceModal.outcomes.map((item) => (
                          <p key={item} className="flex items-center gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setServiceModal(null);
                      router.push("/components/contact-us");
                    }}
                    className="rounded-xl bg-[#7A1C2F] px-4 py-2.5 font-semibold text-white hover:bg-[#651726]"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => {
                      window.location.href = `mailto:info@vkglobalservices.com.np?subject=Request%20for%20${encodeURIComponent(serviceModal.title)}`;
                    }}
                    className="rounded-xl border border-[#d8c6cb] bg-white px-4 py-2.5 font-semibold text-[#7A1C2F] hover:bg-[#F7EEF1]"
                  >
                    Request Info
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
