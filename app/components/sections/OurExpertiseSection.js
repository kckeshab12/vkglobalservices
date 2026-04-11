"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Briefcase,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Layers,
  Settings,
  ShieldCheck,
  Target,
  TrendingUp,
  X,
} from "lucide-react";

export default function OurExpertiseSection() {
  const [selectedService, setSelectedService] = useState(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      icon: Target,
      title: "Financial Accounting",
      description:
        "Bookkeeping, tax preparation, payroll support, reporting, and forecasting insights that keep operations compliant and measurable.",
      focus: ["Bookkeeping and reconciliation", "Payroll and tax process", "Financial reporting rhythm"],
      deliverables: ["Monthly accounts close", "Compliance-ready documentation", "Cash flow visibility reports"],
      impact: "30% faster reporting cycles",
      tone: "from-cyan-500 to-blue-600",
    },
    {
      icon: HeartHandshake,
      title: "Sales & Marketing",
      description:
        "Research, strategy, campaign execution, and performance analytics designed to improve visibility and generate quality leads.",
      focus: ["Audience targeting strategy", "Campaign planning and execution", "Performance optimization"],
      deliverables: ["Channel strategy dashboard", "Weekly campaign insights", "Lead quality reporting"],
      impact: "+35% qualified pipeline growth",
      tone: "from-amber-500 to-rose-500",
    },
    {
      icon: Briefcase,
      title: "HR Services",
      description:
        "Recruitment, onboarding, employee engagement, policy support, and workforce performance management tailored to growth goals.",
      focus: ["Hiring workflow setup", "Onboarding and policy systems", "Performance support framework"],
      deliverables: ["Role-based hiring pipeline", "Structured onboarding checklist", "People operations SOPs"],
      impact: "-33% time-to-hire",
      tone: "from-emerald-500 to-teal-600",
    },
    {
      icon: Layers,
      title: "System Development",
      description:
        "Custom software development, integrations, and scalable digital systems that optimize internal workflows and service quality.",
      focus: ["Requirement-to-build lifecycle", "Platform integration architecture", "Scalability and reliability"],
      deliverables: ["Production-ready modules", "API integration map", "Maintenance and release plan"],
      impact: "+40% operational efficiency",
      tone: "from-indigo-500 to-violet-600",
    },
    {
      icon: BarChart,
      title: "Data Processing & Reporting",
      description:
        "Clean data pipelines, analytics, dashboards, and reports that transform raw data into practical business decisions.",
      focus: ["Data quality and validation", "Dashboard and KPI modeling", "Insight-led reporting"],
      deliverables: ["Decision-ready dashboards", "Automated reporting templates", "Performance analysis briefs"],
      impact: "+45% reporting accuracy",
      tone: "from-sky-500 to-cyan-600",
    },
    {
      icon: Settings,
      title: "IT Services",
      description:
        "Infrastructure management, cybersecurity, technical support, and IT consulting to reduce downtime and improve reliability.",
      focus: ["IT infrastructure health", "Security and monitoring", "Technical support operations"],
      deliverables: ["Service monitoring checklist", "Issue response workflow", "Security hardening baseline"],
      impact: "+99.9% uptime stability",
      tone: "from-slate-600 to-slate-800",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-24 bg-slate-50 relative">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-3xl lg:text-4xl font-bold text-center mb-3 text-slate-900"
      >
        Our Expertise
      </motion.h2>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-center text-slate-600 max-w-2xl mx-auto mb-10"
      >
        Professional functions that support business growth, operational efficiency, and scalable service delivery.
      </motion.p>

      <div className="max-w-6xl mx-auto mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm text-cyan-800 inline-flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Process-driven delivery standards
        </div>
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-800 inline-flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Outcome-focused execution model
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 inline-flex items-center gap-2">
          <Clock3 className="w-4 h-4" />
          Reliable weekly reporting cadence
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
              onClick={() => setSelectedService(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setSelectedService(service);
              }}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.tone} text-white flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-900">{service.title}</h3>
                <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-full px-2 py-1 whitespace-nowrap">
                  {service.impact}
                </span>
              </div>
              <p className="text-slate-600 mt-2 text-sm line-clamp-3">{service.description}</p>
              <div className="mt-4 space-y-1.5">
                {service.focus.slice(0, 2).map((item) => (
                  <p key={item} className="text-xs text-slate-600 inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {item}
                  </p>
                ))}
              </div>
              <p className="mt-4 text-sm font-medium text-cyan-700">View framework</p>
            </motion.article>
          );
        })}
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-xl w-full shadow-2xl border border-slate-200 relative"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedService.title}</h3>
            <p className="text-slate-700 leading-relaxed">{selectedService.description}</p>

            <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-800">
              <span className="font-semibold">Typical Impact:</span> {selectedService.impact}
            </div>

            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900 mb-2">Focus Areas</p>
                <div className="space-y-1.5">
                  {selectedService.focus.map((item) => (
                    <p key={item} className="text-sm text-slate-700 inline-flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900 mb-2">Typical Deliverables</p>
                <div className="space-y-1.5">
                  {selectedService.deliverables.map((item) => (
                    <p key={item} className="text-sm text-slate-700 inline-flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
