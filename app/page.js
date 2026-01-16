import { EventList } from "@/components/landing/EventList";
import { Header } from "@/components/landing/Header";

export default function Home() {
  return (
    <section className="container">
      <Header />
      <h1>Welcome to Gatherly </h1>
      <EventList />
    </section>
  );
}
