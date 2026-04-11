const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";

export default function Head() {
  const title = "About VK Global Services in Lalitpur, Nepal";
  const description =
    "Learn about VK Global Services in Lalitpur, Nepal, our workforce model, training approach, and business services.";
  const canonical = `${siteUrl}/components/aboutUs`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${siteUrl}/logo.jpeg`} />
      <meta name="twitter:image" content={`${siteUrl}/logo.jpeg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
