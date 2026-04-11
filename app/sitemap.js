const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";

const routes = [
  "/",
  "/components/aboutUs",
  "/components/JobPage",
  "/components/TrainingPage",
  "/components/contact-us",
  "/components/contact-center",
  "/blogs",
  "/components/block",
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
