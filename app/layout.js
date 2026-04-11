// app/layout.js
import "./global.css";
import SiteAmbientScene from "./components/visuals/SiteAmbientScene";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VK Global Services",
    template: "%s | VK Global Services",
  },
  description:
    "VK Global Services provides job placement, BPO contact center, training, and business services for employers and job seekers.",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.jpeg" />
      </head>
      <body className="relative isolate bg-[#fbf7f4] text-[#21161A] antialiased font-sans">
        <SiteAmbientScene />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
