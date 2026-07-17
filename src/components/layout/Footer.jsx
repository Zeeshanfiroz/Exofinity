import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/events", label: "Events" },
  { to: "/join", label: "Join" },
  { to: "/contact", label: "Contact" },
];

const socials = [
  {
    href: "https://www.instagram.com/ex_ofinity?igsh=MTZ0dTZkeDV3Ymp5ZA==",
    label: "Instagram",
    iconClass: "fa-brands fa-instagram",
  },
  {
    href: "https://chat.whatsapp.com/DOyy2i4pY7n6UWa0NH91Hp",
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

function ScrollTopButton() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="group inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-base-border text-white/60 transition-all duration-200 hover:border-accent hover:text-accent hover:shadow-glow"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="-translate-y-px transition-transform duration-200 group-hover:-translate-y-0.5"
      >
        <path
          d="M8 12.5V3.5M8 3.5L3.5 8M8 3.5L12.5 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-fade", {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative mt-24 overflow-hidden border-t border-base-border">
      {/* subtle top glow accent line */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      {/* soft depth glow, purely decorative, no layout cost */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative max-w-6xl mx-auto px-4 pt-14 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="footer-fade">
            <Link to="/" className="font-heading font-bold text-xl">
              Exo<span className="text-accent">finity</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Beyond limits. Infinite growth. A community built for builders,
              dreamers, and doers.
            </p>

            <div className="mt-5 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="group inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-glow"
                >
                  <i className={`${s.iconClass} text-[14px] text-base-bg`} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigate */}
          <div className="footer-fade">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40">
              Navigate
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `transition-colors ${
                        isActive ? "text-accent" : "text-white/60 hover:text-white"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-fade">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40">
              Resources
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a href="#" className="text-white/60 transition-colors hover:text-white">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 transition-colors hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 transition-colors hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-white/60 transition-colors hover:text-white">
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          {/* Stay in the loop */}
          <div className="footer-fade">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-white/40">
              Stay in the loop
            </p>
            <p className="mt-4 text-sm text-white/60">
              Event announcements and updates get shared in the community first.
            </p>
            <a
              href="https://chat.whatsapp.com/DOyy2i4pY7n6UWa0NH91Hp"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl2 bg-accent px-4 py-2.5 text-sm font-semibold text-base-bg transition-all duration-200 hover:bg-accent-hover hover:shadow-glow"
            >
              <i className="fa-brands fa-whatsapp text-[16px]" />
              Join on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col-reverse items-center gap-4 border-t border-base-border pt-6 text-xs text-white/40 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} Team Exofinity. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="hidden sm:inline">Built by the Exofinity team</span>
            <ScrollTopButton />
          </div>
        </div>
      </div>
    </footer>
  );
}