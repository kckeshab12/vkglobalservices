"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function CoreServices() {
  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const serviceCards = [
    {
      code: "JP",
      title: "Job Placement",
      desc: "Connecting skilled talent to the right roles with placement support and employer matching.",
      color: "from-cyan-500 to-blue-600",
      path: "/components/JobPage",
    },
    {
      code: "BPO",
      title: "BPO Contact Center",
      desc: "Scalable customer experience operations across banking, ISP, healthcare and fintech.",
      color: "from-amber-500 to-rose-500",
      path: "/components/contact-center",
    },
    {
      code: "TR",
      title: "Training & Workforce Development",
      desc: "Project-driven curriculum and hiring pipelines to build capacity fast.",
      color: "from-emerald-500 to-teal-600",
      path: "/components/TrainingPage",
    },
  ];

  return (
    <section id="core-services" className="py-16 px-6 lg:px-24 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-bold text-center text-slate-900 mb-3"
        >
          Our Core Services
        </motion.h2>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-8">
          Core solutions for hiring, customer operations, and workforce readiness with connected business support services.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {serviceCards.map((s) => (
            <motion.button
              key={s.title}
              whileHover={{ y: -2 }}
              onClick={() => router.push(s.path)}
              className="text-left p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center mb-4 font-bold`}>
                {s.code}
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{s.title}</h3>
              <p className="text-sm text-slate-600">{s.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
