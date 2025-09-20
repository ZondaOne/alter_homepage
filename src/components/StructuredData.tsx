export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zonda One",
    "description": "Software startup building innovative products and custom business solutions",
    "url": "https://zonda.one",
    "logo": "https://zonda.one/logo.png",
    "foundingDate": "2025",
    "industry": "Software Development",
    "numberOfEmployees": "2-10",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IT"
    },
    "sameAs": [
      "https://linkedin.com/company/zonda-one"
    ],
    "service": [
      {
        "@type": "Service",
        "name": "Custom Software Development",
        "description": "Tailored software solutions for businesses"
      },
      {
        "@type": "Service",
        "name": "Product Development",
        "description": "Building innovative software products"
      },
      {
        "@type": "Service",
        "name": "Digital Transformation",
        "description": "Helping businesses modernize their technology stack"
      }
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Zonda One",
    "url": "https://zonda.one",
    "description": "Software startup building innovative products and custom business solutions",
    "publisher": {
      "@type": "Organization",
      "name": "Zonda One"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  )
}