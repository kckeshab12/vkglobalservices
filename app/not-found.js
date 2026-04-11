import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fff8fa_0%,#f8fbff_48%,#ffffff_100%)] px-6 py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-[#d8c6cb] bg-[#F7EEF1] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1C2F]">
          Page not found
        </div>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-[#21161A] md:text-6xl">
          We couldn&apos;t find that page
        </h1>
        <p className="mt-4 text-base leading-7 text-[#6a4a55] md:text-lg">
          The link may be outdated, or the page may have been moved. Return to the homepage to continue browsing.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-[#7A1C2F] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#651726]"
          >
            Go to Homepage
          </Link>
          <Link
            href="/components/contact-us"
            className="rounded-xl border border-[#d8c6cb] bg-white px-5 py-3 text-sm font-semibold text-[#7A1C2F] transition hover:bg-[#F7EEF1]"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
