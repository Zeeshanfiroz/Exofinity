import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import SectionHeading from "../ui/SectionHeading";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { upcomingEvents } from "../../data/events";
import { formatDate } from "../../lib/date";

export default function UpcomingEventsPreview() {
  const sectionRef = useRef(null);
  const preview = upcomingEvents.slice(0, 3);

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".event-preview-item", {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (preview.length === 0) return null;

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <SectionHeading
          eyebrow="What's Next"
          title="Upcoming Events"
          subtitle="Study circles, build nights, and hackathons happening in the community."
        />
        <Button to="/events" variant="secondary" className="w-fit px-5! py-2.5! text-sm shrink-0">
          View all events
        </Button>
      </div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {preview.map((event) => (
          <Card key={event.id} className="event-preview-item flex flex-col">
            {event.tag && (
              <span className="w-fit font-heading text-xs uppercase tracking-wide text-accent border border-accent/30 rounded-full px-3 py-1">
                {event.tag}
              </span>
            )}
            <p className="mt-4 text-accent text-sm font-semibold">{formatDate(event.date)}</p>
            <h3 className="mt-1 font-heading font-bold text-lg">{event.title}</h3>
            <p className="mt-2 text-white/60 text-sm leading-relaxed flex-1">{event.desc}</p>
            <Button
              as="a"
              href={event.link}
              variant="secondary"
              className="mt-5 w-fit px-4! py-2! text-sm"
            >
              Learn more
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
