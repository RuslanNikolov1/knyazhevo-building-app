import { useTranslation } from 'react-i18next';

const StructuredData = () => {
  const { t } = useTranslation();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Luxury Living",
    "description": t('hero.subtitle'),
    "url": "https://luxuryliving.bg",
    "logo": "https://luxuryliving.bg/logo.png",
    "image": [
      "https://luxuryliving.bg/3.png",
      "https://luxuryliving.bg/5.png"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Luxury Street",
      "addressLocality": "Sofia",
      "addressCountry": "BG"
    },
    "telephone": "+359 2 123 4567",
    "email": "info@luxuryliving.bg",
    "sameAs": [
      "https://facebook.com/luxuryliving",
      "https://instagram.com/luxuryliving"
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
