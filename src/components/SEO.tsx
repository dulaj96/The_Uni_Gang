import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
}

const SEO = ({
    title,
    description = "Find the best student accommodations and annexes near your university in Sri Lanka. The Uni Gang connects students with trusted landlords.",
    keywords = "student accommodation, university annex, sri lanka, boarding places, university students, room for rent, peradeniya, colombo, kelaniya, japura",
    image = "/logoImage.jpg", // Default image from public folder
    url = window.location.href
}: SEOProps) => {
    const siteTitle = "The Uni Gang";
    const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

    // Ensure absolute URL for image
    const absoluteImage = image.startsWith('http') ? image : `${window.location.origin}${image}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Open Graph / Facebook */}
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
        </Helmet>
    );
};

export default SEO;
