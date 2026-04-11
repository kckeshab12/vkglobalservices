"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BadgeInfo,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Layers3,
  Lightbulb,
  MapPin,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import Footer from "../footer";
import GuestNavbar from "../guest/GuestNavbar";
import SeoJsonLd from "../SeoJsonLd";

const PROGRAM_CARDS = [
  {
    icon: GraduationCap,
    title: "Job Readiness",
    text: "Build communication, interview, and workplace confidence through guided learning paths.",
  },
  {
    icon: BookOpen,
    title: "Technical Development",
    text: "Strengthen practical skills with role-focused learning aligned to business needs.",
  },
  {
    icon: Briefcase,
    title: "Placement Support",
    text: "Understand how training connects to recruitment and career opportunities on the portal.",
  },
  {
    icon: Users,
    title: "Mentorship",
    text: "See the structure that supports learners before moving to the live training portal.",
  },
];

const JOURNEY = [
  {
    icon: Lightbulb,
    title: "Choose a path",
    text: "Learn about the available training directions and how each one supports employability.",
  },
  {
    icon: Target,
    title: "Build skills",
    text: "Training emphasizes practical outcomes, projects, and career-oriented learning.",
  },
  {
    icon: Award,
    title: "Advance forward",
    text: "Once you are ready, use the dedicated portal for registration and active program access.",
  },
];

const BENEFITS = [
  "Practical skill building",
  "Career confidence",
  "Mentorship and guidance",
  "Placement-focused support",
];

const METRICS = [
  { value: "100+", label: "Learners trained" },
  { value: "4.8/5", label: "Average rating" },
  { value: "1 portal", label: "For registration" },
];

export default function TrainingPage() {
  const reduceMotion = useReducedMotion();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Training and Workforce Development",
    serviceType: "Training and Workforce Development",
    provider: {
      "@type": "Organization",
      name: "VK Global Services",
      url: siteUrl,
    },
    areaServed: { "@type": "Country", name: "Nepal" },
    url: `${siteUrl}/components/TrainingPage`,
    description:
      "Learn how VK Global Services training and workforce development programs support careers.",
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Training", item: `${siteUrl}/components/TrainingPage` },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#fffdfb] text-[#21161A]">
      <GuestNavbar />
      <SeoJsonLd data={serviceSchema} />
      <SeoJsonLd data={breadcrumbSchema} />

      <main className="flex-1 pt-20">
        <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(122,28,47,0.14),transparent_28%),radial-gradient(circle_at_top_right,_rgba(77,139,198,0.16),transparent_24%),linear-gradient(135deg,#fffdfb_0%,#fff6f0_48%,#eef7ff_100%)]" />
          <motion.div
            aria-hidden
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, -8, 0],
                    x: [0, 7, 0],
                  }
            }
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute right-[-4rem] top-16 h-64 w-64 rounded-full bg-[#7A1C2F]/10 blur-3xl"
          />
          <motion.div
            aria-hidden
            animate={
              reduceMotion
                ? {}
                : {
                    y: [0, 12, 0],
                    x: [0, -8, 0],
                  }
            }
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute left-[-5rem] bottom-12 h-72 w-72 rounded-full bg-[#4d8bc6]/10 blur-3xl"
          />

          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="relative">
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#e7d8dd] bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A1C2F] shadow-sm backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Training Information
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.04 }}
                className="mt-5 max-w-3xl text-5xl font-black leading-[0.95] tracking-[-0.06em] text-[#1d1417] sm:text-6xl lg:text-[5.3rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Learn how our{" "}
                <span className="text-[#7A1C2F]">training and workforce programs</span> support careers
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.55, delay: 0.09 }}
                className="mt-6 max-w-2xl text-base leading-8 text-[#6a4a55] sm:text-lg"
              >
                This page is informational only. For live training registration and portal actions, visit the dedicated
                site at <span className="font-semibold text-[#21161A]">vkcareersolution.com</span>.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55, delay: 0.14 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                <a
                  href="https://vkcareersolution.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#7A1C2F] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#d8c6cb]/70 transition hover:bg-[#651726]"
                >
                  Open Training Portal
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <Link
                  href="/components/aboutUs"
                  className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-white px-6 py-3.5 text-sm font-semibold text-[#4b3340] transition hover:border-[#7A1C2F] hover:text-[#7A1C2F]"
                >
                  Learn About VK Global Services
                </Link>
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55, delay: 0.18 }}
                className="mt-8 grid gap-3 sm:grid-cols-3"
              >
                {METRICS.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-[#ead9dd] bg-white/90 p-4 shadow-sm backdrop-blur"
                  >
                    <p className="text-2xl font-black tracking-[-0.05em] text-[#21161A]">{item.value}</p>
                    <p className="mt-1 text-sm text-[#6a4a55]">{item.label}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55, delay: 0.22 }}
                className="mt-8 flex flex-wrap gap-2"
              >
                {BENEFITS.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-[#ead9dd] bg-white px-3 py-1.5 text-sm text-[#4b3340] shadow-sm"
                  >
                    <BadgeInfo className="h-4 w-4 text-[#7A1C2F]" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.12 }}
              className="relative rounded-[34px] border border-[#ead9dd] bg-white p-6 shadow-[0_28px_90px_rgba(33,22,26,0.12)] sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7A1C2F]">
                    What to expect
                  </p>
                  <h2
                    className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#1d1417]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Program overview
                  </h2>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7EEF1] text-[#7A1C2F] shadow-sm">
                  <Layers3 className="h-6 w-6" />
                </div>
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="mt-6 grid gap-4 sm:grid-cols-2"
              >
                {PROGRAM_CARDS.map((card) => (
                  <motion.article
                    key={card.title}
                    variants={fadeUp}
                    transition={{ duration: 0.45 }}
                    className="rounded-2xl border border-[#ead9dd] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <card.icon className="h-8 w-8 text-[#7A1C2F]" />
                    <h3
                      className="mt-4 text-xl font-black tracking-[-0.03em] text-[#1d1417]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#6a4a55]">{card.text}</p>
                  </motion.article>
                ))}
              </motion.div>

              <div className="mt-6 rounded-2xl border border-[#dceeff] bg-[#F8FBFF] p-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-none text-[#4d8bc6]" />
                  <p className="text-sm leading-6 text-[#4b3340]">
                    The training portal now handles enrollment, live listings, and student access. This page simply
                    explains the learning journey and directs visitors to the correct site.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6">
          <div className="mx-auto max-w-7xl rounded-[32px] border border-[#ead9dd] bg-white p-6 shadow-sm sm:p-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7A1C2F]">Learning journey</p>
                <h3
                  className="mt-2 text-3xl font-black tracking-[-0.04em] text-[#1d1417]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  A simple path to career growth
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6a4a55]">
                  Training is designed to support employability, confidence, and long-term professional growth.
                </p>
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-4 sm:grid-cols-3 lg:col-span-2"
              >
                {JOURNEY.map((step, index) => (
                  <motion.article
                    key={step.title}
                    variants={fadeUp}
                    transition={{ duration: 0.42 }}
                    className="rounded-2xl border border-[#ead9dd] bg-[#fff8fa] p-5"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#7A1C2F] shadow-sm">
                      <step.icon className="h-5 w-5" />
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#7A1C2F]">
                      Step {index + 1}
                    </p>
                    <h4
                      className="mt-2 text-xl font-black tracking-[-0.03em] text-[#1d1417]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-[#6a4a55]">{step.text}</p>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-12 sm:px-6">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-2">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.5 }}
              className="rounded-[30px] border border-[#ead9dd] bg-[linear-gradient(135deg,#ffffff_0%,#fdf7f8_100%)] p-6 shadow-sm sm:p-8"
            >
              <h3
                className="text-3xl font-black tracking-[-0.04em] text-[#1d1417]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                For learners
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#6a4a55]">
                The training portal is where learners can explore actual programs, enrollment options, and active
                training-related flows.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-[#4b3340]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#7A1C2F]" />
                  Discover relevant training tracks.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#7A1C2F]" />
                  Learn how the program connects to jobs and placement support.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#7A1C2F]" />
                  Use the dedicated portal for registration and live updates.
                </li>
              </ul>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.08 }}
              className="rounded-[30px] border border-[#ead9dd] bg-[linear-gradient(135deg,#eef7ff_0%,#ffffff_100%)] p-6 shadow-sm sm:p-8"
            >
              <h3
                className="text-3xl font-black tracking-[-0.04em] text-[#1d1417]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                For employers and partners
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#6a4a55]">
                Training and workforce development support organizations that want better prepared candidates and
                clearer growth pathways.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-[#4b3340]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#4d8bc6]" />
                  Understand the skills and readiness pipeline.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#4d8bc6]" />
                  Align training with hiring and workforce needs.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#4d8bc6]" />
                  Reach the portal for live program participation.
                </li>
              </ul>
            </motion.article>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.5 }}
            className="mx-auto max-w-7xl rounded-[34px] bg-[#7A1C2F] px-6 py-8 text-white shadow-2xl shadow-[#7A1C2F]/20 sm:px-8"
          >
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h3
                  className="text-3xl font-black tracking-[-0.04em]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Need the live training portal?
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#f4e8eb]">
                  Open the dedicated site for registration, active training access, and current program actions.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://vkcareersolution.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
                >
                  Visit vkcareersolution.com
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
