"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import PortalAnnouncements from "../PortalAnnouncements";

export default function GuestNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [hoverServices, setHoverServices] = useState(false);
  const [servicesClicked, setServicesClicked] = useState(false);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const servicesRef = useRef(null);

  const baseURL = "/components";

  useEffect(() => {
    setMounted(true);
    document.documentElement.style.scrollBehavior = "smooth";

    const onDocClick = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setHoverServices(false);
        setServicesClicked(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const navLinks = useMemo(
    () => [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/aboutUs" },
      { name: "Blogs", href: "/blogs" },
      { name: "Contact Us", href: "/contact-us" },
    ],
    []
  );

  const serviceLinks = useMemo(
    () => [
      { name: "Contact Center", href: "/contact-center" },
      { name: "Job Placement", href: "/JobPage" },
      { name: "Training & Workforce Development", href: "/TrainingPage" },
      { name: "Offered Services", href: "#offered-services" },
    ],
    []
  );

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    } else {
      const url = href === "/" ? "/" : `${baseURL}${href}`;
      router.push(url);
    }

    setMenuOpen(false);
    setHoverServices(false);
    setServicesClicked(false);
    setMobileServicesOpen(false);
  };

  const isActive = (href) => {
    const url = href === "/" ? "/" : `${baseURL}${href}`;
    return pathname === url;
  };

  if (!mounted) return null;

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#7A1C2F_0%,#4d8bc6_35%,#7cc8ff_60%,#f2b84b_82%,#7A1C2F_100%)] bg-[length:200%_100%]"
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <div className="border-b border-white/50 bg-[linear-gradient(90deg,rgba(255,255,255,0.78),rgba(247,238,241,0.72),rgba(232,246,255,0.72))] backdrop-blur-2xl shadow-[0_14px_40px_rgba(33,22,26,0.08)]">
        <div className="mx-auto max-w-7xl px-4 py-3 md:px-6">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="group flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative h-12 w-12 overflow-hidden rounded-full border border-white bg-white shadow-[0_10px_24px_rgba(122,28,47,0.18)] ring-2 ring-[#DCEEFF]"
              >
                <Image src="/logo.jpeg" alt="VK Global Services Logo" fill className="object-cover" />
              </motion.div>

              <div className="hidden sm:block">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#7A1C2F]">
                  VK Global Services
                </p>
                <p className="text-sm font-semibold text-[#21161A] transition group-hover:text-[#7A1C2F]">
                  Career & Workforce
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-white/65 px-2 py-1.5 shadow-sm md:flex">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                  className={`group relative overflow-hidden rounded-full px-4 py-2 text-[15px] font-medium transition ${
                      active ? "text-[#7A1C2F]" : "text-[#4b3340] hover:text-[#7A1C2F]"
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(247,238,241,0.95),rgba(220,238,255,0.85))] shadow-inner"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    ) : (
                    <span className="absolute inset-0 rounded-full bg-transparent transition group-hover:bg-[#F7EEF1]" />
                  )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                );
              })}

              <div
                className="relative"
                ref={servicesRef}
                onMouseEnter={() => setHoverServices(true)}
                onMouseLeave={() => setHoverServices(false)}
              >
                <button
                  onClick={() => {
                    const next = !servicesClicked;
                    setServicesClicked(next);
                    setHoverServices(next);
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-medium text-[#4b3340] transition hover:text-[#7A1C2F]"
                >
                  Services
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      hoverServices || servicesClicked ? "rotate-180 text-[#4d8bc6]" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {(hoverServices || servicesClicked) && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-3 w-80 overflow-hidden rounded-[24px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,251,255,0.96))] shadow-[0_28px_80px_rgba(33,22,26,0.14)]"
                    >
                      <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                        <Sparkles className="h-4 w-4 text-[#7A1C2F]" />
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A1C2F]">
                          Explore Services
                        </span>
                      </div>
                      {serviceLinks.map((service, index) => (
                        <motion.button
                          key={service.name}
                          onClick={() => {
                            handleNavClick(service.href);
                            setServicesClicked(false);
                          }}
                          whileHover={{ x: 4 }}
                          className={`block w-full px-4 py-3 text-left text-[#4b3340] transition hover:text-[#7A1C2F] ${
                            index % 2 === 0 ? "bg-white" : "bg-[#F8FBFF]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span>{service.name}</span>
                            <span className="h-2.5 w-2.5 rounded-full bg-[linear-gradient(135deg,#7A1C2F,#4d8bc6)] shadow-[0_0_10px_rgba(77,139,198,0.35)]" />
                          </div>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-[#dceeff] bg-white/80 px-3 py-2 shadow-sm lg:flex">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4b3340]">
                  Live Support
                </span>
              </div>

              <motion.button
                whileTap={{ scale: 0.94 }}
                onClick={() => setMenuOpen((v) => !v)}
                className="inline-flex items-center justify-center rounded-full border border-white bg-white/90 p-2.5 text-[#4b3340] shadow-[0_10px_24px_rgba(33,22,26,0.08)] transition hover:border-[#7A1C2F]/30 hover:text-[#7A1C2F] md:hidden"
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <PortalAnnouncements audience="guest" />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className="border-t border-[#ead9dd] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,238,241,0.95))] px-4 py-4 shadow-[0_18px_40px_rgba(33,22,26,0.08)] md:hidden"
          >
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`block w-full rounded-xl px-3 py-2.5 text-left text-[15px] font-medium transition ${
                      active ? "bg-[#F7EEF1] text-[#7A1C2F]" : "text-[#4b3340] hover:bg-white"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}

              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-[15px] font-medium text-[#4b3340] transition hover:bg-white hover:text-[#7A1C2F]"
              >
                Services
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180 text-[#4d8bc6]" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.18 }}
                    className="overflow-hidden pl-3"
                  >
                    <div className="space-y-1 border-l-2 border-[#dceeff] pl-3">
                      {serviceLinks.map((service) => (
                        <button
                          key={service.name}
                          onClick={() => handleNavClick(service.href)}
                          className="block w-full rounded-xl px-3 py-2 text-left text-[14px] text-[#6a4a55] transition hover:bg-white hover:text-[#7A1C2F]"
                        >
                          {service.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
