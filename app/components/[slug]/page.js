import { notFound, redirect } from "next/navigation";
import GuestNavbar from "../guest/GuestNavbar";
import Footer from "../footer";
import BlockShowcaseSection from "../sections/BlockShowcaseSection";

const ALLOWED_SLUGS = new Set(["block", "gallery", "gallerys", "gallery-block"]);
const CANONICAL_SLUG = "block";

export default function DynamicComponentsPage({ params }) {
  const slug = String(params?.slug || "").toLowerCase();

  if (!ALLOWED_SLUGS.has(slug)) {
    notFound();
  }

  if (slug !== CANONICAL_SLUG) {
    redirect(`/components/${CANONICAL_SLUG}`);
  }

  return (
    <div className="bg-slate-50 text-slate-800">
      <GuestNavbar />

      <main className="pt-20">
        <BlockShowcaseSection />
      </main>

      <Footer />
    </div>
  );
}
