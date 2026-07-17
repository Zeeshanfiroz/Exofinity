import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const WHATSAPP_LINK = "https://chat.whatsapp.com/DOyy2i4pY7n6UWa0NH91Hp";

const socials = [
  {
    href: "https://www.instagram.com/ex_ofinity?igsh=MTZ0dTZkeDV3Ymp5ZA==",
    label: "Instagram",
    iconClass: "fa-brands fa-instagram",
  },
  {
    href: "https://www.linkedin.com/company/exofinity/",
    label: "LinkedIn",
    iconClass: "fa-brands fa-linkedin-in",
  },
  {
    href: "https://x.com/Exofinity26",
    label: "X",
    iconClass: "fa-brands fa-x-twitter",
  },
];

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
  { n: "01", title: "Tap join", desc: "Hit the button below — it opens our WhatsApp community directly." },
  { n: "02", title: "Say hi", desc: "Introduce yourself in the group so people know who just joined." },
  { n: "03", title: "Get involved", desc: "Jump into whatever's happening — events, projects, or just the conversation." },
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
            subtitle="We run on WhatsApp — no forms, no waiting on approval. Tap below and you're in."
            center
          />
        </div>

        <div className="join-fade mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href={WHATSAPP_LINK}>Join on WhatsApp</Button>
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

      {/* Final CTA + follow */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="join-fade bg-base-surface border border-base-border rounded-xl2 px-6 py-12">
          <p className="font-heading text-xl font-semibold">Ready when you are</p>
          <p className="mt-2 text-sm text-white/60">
            Join the WhatsApp community and say hello — that's it.
          </p>
          <div className="mt-6">
            <Button href={WHATSAPP_LINK}>Join on WhatsApp</Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-glow"
              >
                <i className={`${s.iconClass} text-[16px] text-base-bg`} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}