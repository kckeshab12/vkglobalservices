"use client";

import { motion } from "framer-motion";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";

const pillars = [
  {
    title: "Purpose",
    text: "We connect talent development and business services through one practical ecosystem.",
    icon: Compass,
  },
  {
    title: "Direction",
    text: "We create clear pathways for job seekers, clients, and internal teams to work together.",
    icon: Sparkles,
  },
  {
    title: "Principles",
    text: "Our work is guided by transparency, reliability, and measurable outcomes.",
    icon: ShieldCheck,
  },
];

export default function FoundationSection() {
  return (
    <section className="px-6 py-16 lg:px-24 bg-white">
      <div className="mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#d8c6cb] bg-[#F7EEF1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]"
        >
          <Sparkles className="h-4 w-4" />
          Foundation & Direction
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-4 text-3xl font-bold text-[#21161A] md:text-4xl"
        >
          The principles that shape how we work
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-3 max-w-3xl text-[#6a4a55]"
        >
          VK Global Services brings workforce development, customer operations, and digital services together in one connected model.
        </motion.p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="rounded-3xl border border-[#ead9dd] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 text-left shadow-sm"
              >
                <div className="inline-flex rounded-2xl bg-[#F7EEF1] p-3 text-[#7A1C2F]">
                  <Icon className="h-6 w-6" />
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
