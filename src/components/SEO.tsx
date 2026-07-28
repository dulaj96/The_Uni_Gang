import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  schemaData?: Record<string, any>;
}

const SEO = ({
  title,
  description = "Find the best student accommodations, campus events, and marketplace gear in Sri Lanka. The Uni Gang connects students across islandwide universities.",
  keywords = "student accommodation, university annex, sri lanka, boarding places, university students, room for rent, peradeniya, colombo, kelaniya, japura, moratuwa",
  image = "/assets/logoImage.jpg",
  url = typeof window !== 'undefined' ? window.location.href : 'https://unigang.lk',
  schemaData
}: SEOProps) => {
  const siteTitle = "The Uni Gang";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;
  const absoluteImage = image.startsWith('http') ? image : `${typeof window !== 'undefined' ? window.location.origin : 'https://unigang.lk'}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImage} />

      {/* 🚀 Google Rich Snippets (Schema.org JSON-LD) */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
