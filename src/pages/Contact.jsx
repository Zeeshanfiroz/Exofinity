import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const EMAIL = "exofinity26@gmail.com";
const WHATSAPP_LINK = "https://chat.whatsapp.com/DOyy2i4pY7n6UWa0NH91Hp";

const socials = [
  {
    href: "https://www.instagram.com/ex_ofinity?igsh=MTZ0dTZkeDV3Ymp5ZA==",
    label: "Instagram",
    iconClass: "fa-brands fa-instagram",
  },
  {
    href: WHATSAPP_LINK,
    label: "WhatsApp",
    iconClass: "fa-brands fa-whatsapp",
  },
  {
    href: "https://x.com/Exofinity26",
    label: "X",
    iconClass: "fa-brands fa-x-twitter",
  },
  {
    href: "https://www.linkedin.com/company/exofinity/",
    label: "LinkedIn",
    iconClass: "fa-brands fa-linkedin-in",
  },
];

const channels = [
  {
    title: "Email",
    desc: "The most reliable way to reach the team.",
    icon: "✉️",
  },
  {
    title: "Community",
    desc: "Fastest response — jump into WhatsApp for updates, help, and event alerts.",
    icon: "💬",
  },
  {
    title: "Response time",
    desc: "1–2 business days by email, much faster on WhatsApp.",
    icon: "⏱️",
  },
];

const faqs = [
  {
    q: "Do I need experience to join?",
    a: "No. Curiosity and a willingness to show up is the only requirement — we have members at every level.",
  },
  {
    q: "Is the community free?",
    a: "Yes, joining Exofinity and the WhatsApp community is completely free.",
  },
  {
    q: "How do I get involved in events?",
    a: "Event details are shared in the WhatsApp community first, then posted on our socials.",
  },
];

function CopyIcon({ copied }) {
  return copied ? (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2 9V2.5A1.5 1.5 0 0 1 3.5 1H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function FaqItem({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-base-border last:border-none">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="font-medium">{q}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={`shrink-0 text-white/40 transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          <path d="M8 3.5V12.5M3.5 8H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-sm text-white/60">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function Contact() {
  const pageRef = useRef(null);
  const [copied, setCopied] = useState(false);

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

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard not available — the mailto link still works
    }
  }

  return (
    <div ref={pageRef}>
      {/* Header — same rhythm as Join */}
      <section className="max-w-3xl mx-auto px-4 pt-16 pb-4 text-center">
        <div className="contact-fade">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's talk"
            subtitle="Questions about joining, events, or partnering with us? Reach out however's easiest — we read everything."
            center
          />
        </div>

        <div className="contact-fade mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button href={`mailto:${EMAIL}`}>Email us</Button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-xl2 border border-base-border px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:text-white hover:border-accent"
          >
            <CopyIcon copied={copied} />
            {copied ? "Copied!" : EMAIL}
          </button>
        </div>
      </section>

      {/* Channels — same grid + Card treatment as Join's benefits */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-3">
          {channels.map((c) => (
            <Card key={c.title} className="contact-fade text-center">
              <span className="text-3xl">{c.icon}</span>
              <p className="mt-3 font-heading font-semibold">{c.title}</p>
              <p className="mt-1.5 text-sm text-white/60">{c.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ band — same border-y strip treatment as Join's steps */}
      <section className="border-y border-base-border bg-base-surface/40">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <p className="contact-fade text-center font-heading font-semibold text-lg mb-4">
            Quick questions
          </p>
          <div className="contact-fade">
            {faqs.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — identical card treatment to Join's closing CTA */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="contact-fade bg-base-surface border border-base-border rounded-xl2 px-6 py-12">
          <p className="font-heading text-xl font-semibold">Follow along</p>
          <p className="mt-2 text-sm text-white/60">
            Updates, event drops, and behind-the-scenes.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
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

          <div className="mt-8">
            <Button to="/join">Join the Community</Button>
          </div>
        </div>
      </section>
    </div>
  );
}