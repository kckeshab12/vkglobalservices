import HomePageClient from "./components/HomePageClient";

export const metadata = {
  title: {
    absolute: "VK Global Services | Career & Workforce Solutions",
  },
  description:
    "VK Global Services connects job placement, BPO contact center, training, and business services for employers and job seekers.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "VK Global Services",
    "career services",
    "job placement",
    "BPO contact center",
    "training and workforce development",
    "business services",
  ],
  openGraph: {
    title: "VK Global Services | Career & Workforce Solutions",
    description:
      "VK Global Services connects job placement, BPO contact center, training, and business services for employers and job seekers.",
    type: "website",
    url: "/",
    images: ["/logo.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "VK Global Services | Career & Workforce Solutions",
    description:
      "VK Global Services connects job placement, BPO contact center, training, and business services for employers and job seekers.",
    images: ["/logo.jpeg"],
  },
};

export default function Page() {
  return <HomePageClient />;
}
