import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { upcomingEvents, pastEvents, collaborations } from "../data/events";
import teamLogo from "../assets/images/exofinity-team-logo.jpeg";
import aparnaPhoto from "../assets/images/aparna-singh-team.jpeg";
import ashmeetPhoto from "../assets/images/ashmeet-singh-team.jpeg";
import srivalliPhoto from "../assets/images/srivalli-team.jpeg";

const eventHosts = [
  { name: "Aparna Singh", role: "Event Management Team Lead", photo: aparnaPhoto },
  { name: "Ashmeet Singh", role: "Graphic Designing Team Lead", photo: ashmeetPhoto },
  { name: "Jetram Srivalli Reddy", role: "Content Creation Team Lead", photo: srivalliPhoto },
];

function formatDate(dateStr) {
  if (!dateStr) return "Date TBA";

  const parsed = new Date(dateStr);
  // If it's not a real, parseable date (e.g. "Coming soon", "TBA"),
  // just show the original text instead of "Invalid Date".
  if (isNaN(parsed.getTime())) return dateStr;

  return parsed.toLocaleDateString("en-US", {
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

      <section className="mt-10 overflow-hidden rounded-xl2 border border-base-border bg-base-surface">
        <div className="grid lg:grid-cols-[0.75fr_1.25fr]">
          <div className="flex min-h-56 items-center justify-center bg-white p-8">
            <img src={teamLogo} alt="Exofinity" className="max-h-44 w-full object-contain" />
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
              Exofinity community
            </p>
            <h2 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
              Find your next opportunity to learn and build.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
              Join our upcoming sessions, meetups, and collaborations to connect with builders
              and explore what is next in technology.
            </p>
          </div>
        </div>
      </section>

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

      <section className="mt-16">
        <SectionHeading
          eyebrow="Meet the hosts"
          title="The people behind our events"
          subtitle="Our team brings the community together to learn, connect, and create."
          center
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {eventHosts.map((host) => (
            <Card key={host.name} className="overflow-hidden p-0 text-center">
              <img
                src={host.photo}
                alt={host.name}
                className="h-64 w-full object-cover object-top"
                loading="lazy"
              />
              <div className="p-5">
                <h3 className="font-heading text-lg font-bold">{host.name}</h3>
                <p className="mt-1 text-sm text-accent">{host.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

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

      <div className="mt-20">
        <SectionHeading
          eyebrow="Partners & Community"
          title="Our Collaborations"
          subtitle="Working with communities, teams, and organizations to create meaningful opportunities."
          center
        />

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {collaborations.map((collaboration) => (
            <Card key={collaboration} className="p-4 text-center">
              <p className="font-semibold text-sm">{collaboration}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}