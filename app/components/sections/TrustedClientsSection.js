"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TrustedClientsSection() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadClients = async () => {
      try {
        const response = await fetch("/api/public/trusted-clients", {
          cache: "no-store",
        });
        const data = await response.json();
        if (!cancelled) {
          setClients(Array.isArray(data.clients) ? data.clients : []);
        }
      } catch {
        if (!cancelled) {
          setClients([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadClients();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!loading && clients.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-6 lg:px-24 text-center border-b border-[#ead9dd] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)]">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="text-3xl lg:text-5xl font-bold mb-4 text-[#7A1C2F]"
      >
        Trusted By Growing Teams
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="text-[#6a4a55] max-w-2xl mx-auto mb-10"
      >
        A growing network of organizations that trust our training, talent, and business support.
      </motion.p>

      <div className="mx-auto grid max-w-6xl grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {clients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="w-full max-w-[180px] rounded-2xl border border-[#ead9dd] bg-white shadow-sm p-3 sm:p-4"
          >
            <div className="flex h-20 items-center justify-center overflow-hidden rounded-xl bg-[#F8FBFF] p-2 sm:h-24">
              <img src={client.logoUrl} alt={client.name} className="max-h-full max-w-full object-contain" />
            </div>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]">
              {client.clientId}
            </p>
            <p className="mt-1 text-xs text-[#4b3340] sm:text-sm">{client.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
