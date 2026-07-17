import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const GOOGLE_FORM_SRC = "https://docs.google.com/forms/d/e/YOUR_JOIN_FORM_ID/viewform?embedded=true";

const benefits = [
  {
    title: "Real projects",
    desc: "Build alongside people actually shipping things in AI, web, and emerging tech.",
    icon: "🛠️",
  },
  {
    title: "Events & workshops",
    desc: "Regular sessions, talks, and hands-on workshops led by the community.",
    icon: "📅",
  },
  {
    title: "A network that lasts",
    desc: "Connect with former members and peers who keep showing up for each other.",
    icon: "🤝",
  },
];

const steps = [
  { n: "01", title: "Fill the form", desc: "Tell us a bit about yourself below — takes under 2 minutes." },
  { n: "02", title: "We review it", desc: "Someone from the team looks it over, usually within a couple of days." },
  { n: "03", title: "Get an invite", desc: "You'll get an email/Discord invite and a quick intro to the community." },
];

export default function Join() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".join-fade", {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef}>
      {/* Header */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-4 text-center">
        <div className="join-fade">
          <SectionHeading
            eyebrow="Get Involved"
            title="Join the Community"
            subtitle="Tell us a bit about yourself and where you'd like to contribute. No experience required — curiosity is the only prerequisite."
            center
          />
        </div>

        <div className="join-fade mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href="#" variant="secondary">
            Prefer WhatsApp? Join instantly
          </Button>
        </div>
      </section>

      {/* Why join */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-3">
          {benefits.map((b) => (
            <Card key={b.title} className="join-fade text-center">
              <span className="text-3xl">{b.icon}</span>
              <p className="mt-3 font-heading font-semibold">{b.title}</p>
              <p className="mt-1.5 text-sm text-white/60">{b.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="border-y border-base-border bg-base-surface/40">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.n} className="join-fade relative">
                <p className="font-heading text-3xl font-bold text-accent/40">{s.n}</p>
                <p className="mt-2 font-heading font-semibold">{s.title}</p>
                <p className="mt-1.5 text-sm text-white/60">{s.desc}</p>
                {i < steps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden sm:block absolute top-4 -right-4 h-px w-8 bg-base-border"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <p className="join-fade text-center font-heading font-semibold text-lg mb-6">
          Ready? Fill out the form below
        </p>
        <div className="join-fade bg-base-surface border border-base-border rounded-xl2 overflow-hidden">
          <iframe
            src={GOOGLE_FORM_SRC}
            title="Join Exofinity Form"
            width="100%"
            height="900"
            className="w-full"
            style={{ colorScheme: "light" }}
            loading="lazy"
          >
            Loading…
          </iframe>
        </div>
      </section>
    </div>
  );
}