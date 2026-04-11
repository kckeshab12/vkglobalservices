const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vkglobalservices.com.np";

export default function Head() {
  const title = "Training and Workforce Development in Nepal";
  const description =
    "Learn how VK Global Services training and workforce development programs support careers in Nepal.";
  const canonical = `${siteUrl}/components/TrainingPage`;

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
