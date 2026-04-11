"use client";

import { motion } from "framer-motion";
import { ArrowRightLeft, BadgeCheck, ClipboardList, Layers3, MessageSquareText, Sparkles, Users } from "lucide-react";

const flow = [
  {
    title: "Discover Needs",
    text: "We listen to the client brief, service requirement, or hiring need and define the expected outcome.",
    icon: MessageSquareText,
  },
  {
    title: "Design the Workflow",
    text: "Our team maps the process, assigns responsibilities, and prepares the service plan or hiring workflow.",
    icon: ClipboardList,
  },
  {
    title: "Build the Delivery Team",
    text: "We align the right people, tools, and SOPs so the service can run consistently.",
    icon: Users,
  },
  {
    title: "Execute with Quality",
    text: "We deliver the work through weekly actions, checks, and communication touchpoints.",
    icon: BadgeCheck,
  },
  {
    title: "Review Performance",
    text: "We track results, response times, output quality, and client satisfaction to keep improving.",
    icon: Layers3,
  },
  {
    title: "Refine and Scale",
    text: "We use feedback and data to improve the model and expand what works best.",
    icon: ArrowRightLeft,
  },
];

export default function HowWeWorkSection() {
  return (
    <section className="px-6 py-16 lg:px-24 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)]">
      <div className="mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F] shadow-sm"
        >
          <Sparkles className="h-4 w-4" />
          How We Work
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-4 text-3xl font-bold text-[#21161A] md:text-4xl"
        >
          A practical service ecosystem
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-3 max-w-3xl text-[#6a4a55]"
        >
          From HR and BPO to marketing, finance, web, software, cloud, and SEO, our teams follow one coordinated delivery model.
        </motion.p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {flow.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="rounded-3xl border border-[#ead9dd] bg-white p-6 text-left shadow-sm"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="inline-flex rounded-2xl bg-[#F7EEF1] p-3 text-[#7A1C2F]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-[#F8FBFF] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#4b3340]">
                    Step {index + 1}
                  </span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#21161A]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6a4a55]">{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
