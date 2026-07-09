import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function SEO({
  title = "Credence Lighting · Premium Architectural & Commercial Lighting",
  description = "Credence Lighting provides bespoke architectural, commercial, and residential luxury lighting solutions. Elevate your spaces with premium craftsmanship.",
  type = "website",
  image = "https://credencelighting.com/og-image.jpg",
  schema = null,
}) {
  const location = useLocation();
  const siteUrl = "https://credencelighting.com";
  const currentUrl = `${siteUrl}${location.pathname}`;
  const siteName = "Credence Lighting";

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      
      {/* Search Engine Directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@CredenceLighting" />
      <meta name="twitter:creator" content="@CredenceLighting" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
