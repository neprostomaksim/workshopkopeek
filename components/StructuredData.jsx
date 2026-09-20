import { faqs } from "@/lib/faq";
import { site } from "@/lib/config";
import { workshops } from "@/lib/workshops";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://workshopkopeek.vercel.app";

function addHours(isoDate, hours) {
  return new Date(new Date(isoDate).getTime() + hours * 60 * 60 * 1000).toISOString();
}

export default function StructuredData() {
  const personId = `${SITE_URL}/#maxim-leonov`;
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Воркшопы по ИИ с Максимом Леоновым",
      description: "Практические очные воркшопы по ИИ для бизнеса в Минске.",
      inLanguage: "ru-BY",
    },
    {
      "@type": "Person",
      "@id": personId,
      name: "Максим Леонов",
      url: site.speaker.siteUrl,
      image: `${SITE_URL}/speaker.jpg`,
      jobTitle: "AI-эксперт и преподаватель",
      description: "Проводит корпоративные обучения и практические воркшопы по ИИ для бизнеса.",
      sameAs: [site.speaker.instagramUrl, site.speaker.telegramUrl],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqs.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    ...workshops.map((workshop) => ({
      "@type": "EducationEvent",
      "@id": `${SITE_URL}/#${workshop.id}`,
      name: workshop.title,
      description: `${workshop.tagline}. ${workshop.desc}`,
      startDate: workshop.startsAt,
      endDate: addHours(workshop.startsAt, 3),
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      image: `${SITE_URL}/hero-bg.jpg`,
      url: `${SITE_URL}/#${workshop.id}`,
      inLanguage: "ru-BY",
      organizer: { "@id": personId },
      location: {
        "@type": "Place",
        name: site.venue,
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "BY",
        },
      },
    })),
  ];

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
