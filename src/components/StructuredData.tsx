import { useTranslation } from 'react-i18next';

const StructuredData = () => {
  const { t } = useTranslation();

  // Get current origin dynamically
  const getBaseUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin;
    }
    return '';
  };

  const baseUrl = getBaseUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Forest Residence Sofia",
    "description": t('hero.subtitle'),
    "url": baseUrl || "/",
    "logo": `${baseUrl}/logo.png`,
    "image": [
      `${baseUrl}/3.png`,
      `${baseUrl}/5.png`
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Luxury Street",
      "addressLocality": "Sofia",
      "addressCountry": "BG"
    },
    "telephone": "+359 2 123 4567",
    "email": "sofiaforestresidence@gmail.com",
    "sameAs": [
      "https://facebook.com/forestresidencesofia",
      "https://instagram.com/forestresidencesofia"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Luxury Apartments",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Apartment",
            "name": "Luxury Apartment",
            "description": "Modern apartment with premium finishes",
            "floorSize": {
              "@type": "QuantitativeValue",
              "value": "85-125",
              "unitCode": "MTK"
            },
            "numberOfRooms": "2-3",
            "occupancy": {
              "@type": "QuantitativeValue",
              "maxValue": "4"
            }
          },
          "price": "105000-205000",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.6977",
      "longitude": "23.3219"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export default StructuredData;
