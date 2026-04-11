"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import GuestNavbar from "./guest/GuestNavbar";
import Footer from "./footer";
import FoundationSection from "./sections/FoundationSection";
import OfferedServicesSection from "./sections/OfferedServicesSection";
import OurExpertiseSection from "./sections/OurExpertiseSection";
import JoinOurTeamSection from "./sections/JoinOurTeamSection";
import CoreServices from "./sections/CoreServices";
import HowWeWorkSection from "./sections/HowWeWorkSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import GalleryShowcaseSection from "./sections/GalleryShowcaseSection";
import TrustedClientsSection from "./sections/TrustedClientsSection";
import AnnouncementPopup from "./AnnouncementPopup";
import HeroMediaBackdrop from "./sections/HeroMediaBackdrop";
import SectionReveal from "./visuals/SectionReveal";
import SeoJsonLd from "./SeoJsonLd";
import { BookOpen, Briefcase, Users } from "lucide-react";

export default function HomePageClient() {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    name: "VK Global Services",
    url: siteUrl,
    logo: `${siteUrl}/logo.jpeg`,
    image: `${siteUrl}/logo.jpeg`,
    description:
      "VK Global Services provides job placement, BPO contact center, training, and business services for employers and job seekers.",
    telephone: "+977-9761522137",
    email: "info@vkglobalservices.com.np",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lalitpur",
      addressRegion: "Bagmati Province",
      addressCountry: "NP",
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
    sameAs: ["https://www.facebook.com/share/1FH22ssT1t/"],
  };

  const serviceCards = useMemo(
    () => [
      {
        title: "BPO Contact Center",
        icon: Users,
        border: "border-sky-400/35",
        bullets: ["Customer support", "Sales assistance", "Service operations"],
      },
      {
        title: "Job Placement Portal",
        icon: Briefcase,
        border: "border-amber-300/35",
        bullets: ["Employer access", "Talent matching", "Faster applications"],
      },
      {
        title: "Training & Workforce Development",
        icon: BookOpen,
        border: "border-violet-300/35",
        bullets: ["Skills training", "Career readiness", "Workforce growth"],
      },
    ],
    []
  );

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-transparent text-[#21161A]">
      <GuestNavbar />

      <main>
        <h1 className="sr-only">VK Global Services career and workforce solutions</h1>
        <SeoJsonLd data={localBusinessSchema} />

        <section className="relative overflow-hidden bg-[#f7f1ed] pt-0">
          <div className="absolute inset-x-0 top-0 h-[78vh] bg-[#180d14]" />

          <div className="relative mx-auto max-w-[1600px] px-4">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6 },
                },
              }}
              className="relative overflow-hidden rounded-[44px] bg-[#180d14] shadow-[0_35px_120px_rgba(27,12,20,0.24)]"
            >
              <HeroMediaBackdrop />
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(56,0,26,0.78)_0%,rgba(37,10,26,0.66)_28%,rgba(15,17,30,0.10)_56%,rgba(11,66,112,0.25)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_26%,rgba(255,255,255,0.16),transparent_28%),radial-gradient(circle_at_84%_24%,rgba(185,220,255,0.14),transparent_26%)]" />

              <div className="relative z-10 min-h-[78vh] px-6 pb-0 pt-6 md:px-10 md:pt-8 lg:px-16 lg:pt-10">
                <motion.div
                  variants={fadeUp}
                  className="grid min-h-[62vh] items-end lg:grid-cols-[0.95fr_1.05fr]"
                >
                  <div className="relative z-10 max-w-xl pb-14 pl-1 md:pb-16 lg:pb-20 lg:pl-6" aria-hidden />

                  <div className="hidden lg:block" aria-hidden />
                </motion.div>

                <div className="absolute left-1/2 top-[49%] z-20 flex -translate-x-1/2 gap-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#7A1C2F] shadow-[0_0_16px_rgba(122,28,47,0.35)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/55" />
                </div>
              </div>
            </motion.div>

            <div className="-mt-20 grid gap-4 pb-14 md:grid-cols-3 md:gap-5 lg:-mt-24">
              {serviceCards.map((item) => {
                const CardIcon = item.icon;
                const cardContent = (
                  <>
                    <div
                      className={`absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-white bg-[#8f2038] text-white shadow-[0_12px_28px_rgba(122,28,47,0.24)] ${item.border}`}
                    >
                      <CardIcon className="h-5 w-5" />
                    </div>
                    <div className="pt-8">
                      <h3
                        className="text-[1.06rem] font-black leading-tight tracking-[-0.03em] text-[#7A1C2F]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {item.title}
                      </h3>
                      <div className="mt-2 h-0.5 w-10 bg-[#7A1C2F]/55" />
                      <ul className="mt-3 space-y-2 text-[13px] text-[#4b3340]">
                        {item.bullets.map((bullet, index) => (
                          <li key={bullet} className="flex items-center gap-2">
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                index === 0 ? "bg-[#7A1C2F]" : index === 1 ? "bg-[#7aa7d8]" : "bg-[#a05ab5]"
                              }`}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pointer-events-none absolute bottom-3 right-3 grid h-10 w-10 grid-cols-4 gap-1 opacity-24">
                      {Array.from({ length: 16 }).map((_, idx) => (
                        <span key={idx} className="h-1.25 w-1.25 rounded-full bg-[#7aa7d8]" />
                      ))}
                    </div>
                  </>
                );

                const cardClassName =
                  "group relative overflow-visible rounded-[26px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(249,247,246,0.94)_100%)] p-4 shadow-[0_16px_38px_rgba(33,22,26,0.12)] backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_52px_rgba(33,22,26,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C2F]/60";

                if (item.title === "BPO Contact Center") {
                  return (
                    <motion.button
                      key={item.title}
                      type="button"
                      onClick={() => router.push("/components/contact-center")}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className={cardClassName}
                    >
                      {cardContent}
                    </motion.button>
                  );
                }

                if (item.title === "Job Placement Portal") {
                  return (
                    <motion.a
                      key={item.title}
                      href="https://vkcareersolution.com"
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      className={cardClassName}
                    >
                      {cardContent}
                    </motion.a>
                  );
                }

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => router.push("/components/TrainingPage")}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className={cardClassName}
                  >
                    {cardContent}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </section>

        <SectionReveal>
          <FoundationSection />
        </SectionReveal>
        <SectionReveal delay={0.03}>
          <OfferedServicesSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <CoreServices />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <OurExpertiseSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <HowWeWorkSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <TestimonialsSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <GalleryShowcaseSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <TrustedClientsSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <JoinOurTeamSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <Footer />
        </SectionReveal>
      </main>

      <AnnouncementPopup />
    </div>
  );
}
