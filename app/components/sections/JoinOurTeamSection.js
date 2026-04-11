"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function JoinOurTeamSection() {
  const router = useRouter();

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white text-[#21161A]">
      <section className="py-20 px-6 lg:px-24 text-center bg-[#F8FBFF]">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-3xl lg:text-5xl font-bold mb-5 text-[#7A1C2F]"
        >
          Join Our Team
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="max-w-3xl mx-auto text-base md:text-lg text-[#6a4a55] mb-10"
        >
          Be part of a growing ecosystem. Apply for training, explore opportunities, or collaborate with us to build Nepal&apos;s talent and business capabilities.
        </motion.p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => router.push("/components/contact-us")}
            className="px-7 py-3 rounded-xl bg-[#7A1C2F] text-white font-semibold hover:bg-[#651726] transition shadow-sm"
          >
            Get Started
          </button>

          <button
            onClick={() => router.push("/components/contact-us")}
            className="px-7 py-3 rounded-xl border border-[#d8c6cb] text-[#7A1C2F] font-semibold hover:bg-white transition bg-white"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
