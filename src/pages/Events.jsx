import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { upcomingEvents, pastEvents } from "../data/events";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Events() {
  const [showPast, setShowPast] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Events"
        title="Upcoming Events"
        subtitle="Sessions, meetups, and builds happening in the community."
      />

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        {upcomingEvents.map((event) => (
          <Card key={event.id}>
            <p className="text-accent text-sm font-semibold">{formatDate(event.date)}</p>
            <h3 className="mt-2 font-heading font-bold text-lg">{event.title}</h3>
            <p className="mt-2 text-white/60 text-sm">{event.desc}</p>
            <Button as="a" href={event.link} variant="secondary" className="mt-4 px-4! py-2! text-sm">
              Learn more / RSVP
            </Button>
          </Card>
        ))}
        {upcomingEvents.length === 0 && (
          <p className="text-white/50">No upcoming events right now — check back soon.</p>
        )}
      </div>

      {/* Past events archive */}
      <div className="mt-16">
        <button
          onClick={() => setShowPast(!showPast)}
          className="flex items-center gap-2 text-white/70 hover:text-accent font-semibold"
        >
          {showPast ? "▾" : "▸"} Past Events
        </button>

        {showPast && (
          <ul className="mt-6 space-y-4">
            {pastEvents.map((event) => (
              <li key={event.id} className="border-b border-base-border pb-4">
                <p className="text-white/50 text-sm">{formatDate(event.date)}</p>
                <p className="font-semibold">{event.title}</p>
                <p className="text-white/60 text-sm">{event.desc}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}