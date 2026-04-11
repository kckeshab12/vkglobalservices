const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/admin11", "/admin11/", "/adminauth", "/adminauth/", "/api", "/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
