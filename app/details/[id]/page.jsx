import { EventDetails } from "@/components/details/EventDetails";
import { EventVenue } from "@/components/details/EventVenue";
import { HeroSection } from "@/components/details/HeroSection";
import { getEventById } from "@/db/queries";

const EventDetailsPage = async ({ params: { id } }) => {
  const eventDetails = await getEventById(id);

  const {
    name,
    details,
    location,
    imageUrl,
    interested_ids,
    going_ids,
    __v,
    swags,
  } = eventDetails;

  console.log(eventDetails);

  return (
    <>
      <HeroSection eventInfo={eventDetails} />
      <section className="container">
        <div className="grid grid-cols-5 gap-12 my-12">
          <EventDetails details={details} swags={swags} />
          <EventVenue location={location} />
        </div>
      </section>
    </>
  );
};

export default EventDetailsPage;
