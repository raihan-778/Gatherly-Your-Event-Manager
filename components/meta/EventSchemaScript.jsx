export const EventSchemaScript = ({ event }) => {
  const eventName = encodeURIComponent(event?.name);

  // const formattedData = {
  //   "@context": "https://schema.org",
  //   // "@type": "EducationEvent",
  //   "@type": "Event",
  //   name: eventName,
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   description: event?.details,
  //   eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  //   eventStatus: "https://schema.org/EventScheduled",
  //   location: {
  //     "@type": "Place",
  //     name: event?.location,
  //   },
  //   image: [event?.imageUrl],
  //   organizer: {
  //     "@type": "Organization",
  //     name: "LWS",
  //     url: "https://learnwithsumit.com/",
  //   },
  // };
  const formattedData = {
    "@context": "https://schema.org",
    "@type": "Event",

    name: eventName,

    // MUST be ISO strings
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),

    description: event?.details,

    eventStatus: "https://schema.org/EventScheduled",

    // Choose ONE correctly (see note below)
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",

    location: {
      "@type": "VirtualLocation",
      url: event?.eventUrl || "https://learnwithsumit.com/",
    },

    image: [event?.imageUrl || "https://learnwithsumit.com/default-event.jpg"],

    organizer: {
      "@type": "Organization",
      name: "Learn with Sumit",
      url: "https://learnwithsumit.com/",
    },

    // REQUIRED for Google rich results
    offers: {
      "@type": "Offer",
      url: event?.eventUrl || "https://learnwithsumit.com/",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      validFrom: new Date().toISOString(),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(formattedData),
        }}
      />
    </>
  );
};
