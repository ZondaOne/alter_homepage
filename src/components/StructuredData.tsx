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
      "https://www.linkedin.com/company/zonda-one",
      "https://www.instagram.com/zonda.one/"
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What's your process like?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We start by understanding your problem, then build a solution that actually works. No complicated frameworks or unnecessary features—just what you need."
        }
      },
      {
        "@type": "Question",
        "name": "Will you disappear after launch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nope. We stick around to make sure everything keeps working. Good software evolves with your business, and we build things so they can grow when you need them to."
        }
      },
      {
        "@type": "Question",
        "name": "Can you work with our existing stuff?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Usually, yes. We're pretty good at figuring out how to make new things work with what you already have. If there's a problem, we'll tell you upfront."
        }
      },
      {
        "@type": "Question",
        "name": "What if our project is unique?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unique projects are often the most interesting. If you've got a specific problem that needs solving, we're probably the right people to help figure it out."
        }
      }
    ]
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  )
}