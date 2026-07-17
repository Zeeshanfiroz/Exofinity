import { useEffect, useRef } from "react";
import gsap from "gsap";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const socials = [
  { href: "https://instagram.com", label: "Instagram", icon: "social-icon" },
  { href: "https://discord.gg", label: "Discord", icon: "discord-icon" },
  { href: "https://x.com", label: "X", icon: "x-icon" },
  { href: "https://github.com", label: "GitHub", icon: "github-icon" },
];

function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <rect x="2.5" y="4.5" width="17" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.5 5.5L11 12L18.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 6.5V11L14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path
        d="M3.5 11.2c0-4.03 3.36-7.2 7.5-7.2s7.5 3.17 7.5 7.2c0 4.02-3.36 7.2-7.5 7.2-.98 0-1.92-.17-2.78-.5L3.5 19l1.14-3.6a6.9 6.9 0 0 1-1.14-4.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-fade", {
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
    <section ref={pageRef} className="max-w-5xl mx-auto px-4 py-20">
      <div className="contact-fade">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's talk"
          subtitle="Questions about joining, events, or partnering with us? Reach out however's easiest — we read everything."
          center
          size="lg"
        />
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Email */}
        <Card className="contact-fade flex flex-col items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
            <EmailIcon />
          </span>
          <div>
            <p className="font-heading font-semibold">Email</p>
            <p className="mt-1 text-sm text-white/60">The most reliable way to reach the team.</p>
          </div>
          <a
            href="mailto:hello@exofinity.dev"
            className="text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            hello@exofinity.dev
          </a>
        </Card>

        {/* Discord community */}
        <Card className="contact-fade flex flex-col items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ChatIcon />
          </span>
          <div>
            <p className="font-heading font-semibold">Community</p>
            <p className="mt-1 text-sm text-white/60">
              Fastest response — ask in our Discord and someone will jump in.
            </p>
          </div>
          <a
            href="https://discord.gg"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            Join the Discord
          </a>
        </Card>

        {/* Response time */}
        <Card className="contact-fade flex flex-col items-start gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ClockIcon />
          </span>
          <div>
            <p className="font-heading font-semibold">Response time</p>
            <p className="mt-1 text-sm text-white/60">
              We typically reply within 1–2 business days by email, and much faster on Discord.
            </p>
          </div>
        </Card>
      </div>

      {/* Socials + CTA */}
      <div className="contact-fade mt-14 flex flex-col items-center gap-6 rounded-xl2 border border-base-border bg-base-surface px-6 py-10 text-center">
        <div>
          <p className="font-heading text-lg font-semibold">Follow along</p>
          <p className="mt-1 text-sm text-white/60">Updates, event drops, and behind-the-scenes.</p>
        </div>

        <div className="flex gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-glow"
            >
              <svg width="18" height="18" className="shrink-0">
                <use href={`/icons.svg#${s.icon}`} />
              </svg>
            </a>
          ))}
        </div>

        <Button to="/join">Join the Community</Button>
      </div>
    </section>
  );
}