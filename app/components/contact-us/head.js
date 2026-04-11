const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";

export default function Head() {
  const title = "Contact VK Global Services in Lalitpur, Nepal";
  const description =
    "Contact VK Global Services in Lalitpur, Kathmandu Valley, Nepal for workforce support, training, BPO, and business services.";
  const canonical = `${siteUrl}/components/contact-us`;

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
