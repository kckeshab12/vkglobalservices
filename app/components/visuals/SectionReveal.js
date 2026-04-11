"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-ui-animate";

export default function SectionReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.16 });

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={
        inView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 28, filter: "blur(8px)" }
      }
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#7A1C2F]/25 to-transparent transition-opacity duration-700"
        style={{ opacity: inView ? 1 : 0 }}
      />
      {children}
    </motion.div>
  );
}
