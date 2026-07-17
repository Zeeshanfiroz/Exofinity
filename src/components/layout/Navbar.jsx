// src/components/layout/Navbar.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/events", label: "Events" },
  { to: "/contact", label: "Contact" },
];

const cta = { to: "/join", label: "Join" };

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);
  const scrolledRef = useRef(false);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-white" : "text-white/70 hover:text-white"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `nav-mobile-link px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
      isActive ? "text-white bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"
    }`;

  // --- Slide the active-link indicator (desktop) without re-rendering the tree ---
  const moveIndicator = useCallback(() => {
    const el = linkRefs.current[location.pathname];
    const indicator = indicatorRef.current;
    if (!el || !indicator) return;

    const { offsetLeft, offsetWidth } = el;
    gsap.to(indicator, {
      x: offsetLeft,
      width: offsetWidth,
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [location.pathname]);

  useEffect(() => {
    // run after layout so offsetLeft/offsetWidth are accurate
    const id = requestAnimationFrame(moveIndicator);
    window.addEventListener("resize", moveIndicator);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", moveIndicator);
    };
  }, [moveIndicator]);

  // --- Scroll-aware header: shrink + strengthen blur, driven by refs (no re-render) ---
  useEffect(() => {
    let ticking = false;

    const applyScrollState = () => {
      const isScrolled = window.scrollY > 8;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        gsap.to(headerRef.current, {
          paddingTop: isScrolled ? 8 : 16,
          paddingBottom: isScrolled ? 8 : 16,
          backgroundColor: isScrolled ? "rgba(10,14,20,0.85)" : "rgba(10,14,20,0.55)",
          boxShadow: isScrolled ? "0 8px 30px -12px rgba(0,0,0,0.6)" : "none",
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(applyScrollState);
        ticking = true;
      }
    };

    applyScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // --- Keep a live --nav-h custom property equal to the header's real height ---
  // (used by the mobile backdrop so it starts exactly below the header,
  // however tall it happens to be at any given moment — no guessing a fixed px value)
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const setHeightVar = () => {
      header.style.setProperty("--nav-h", `${header.offsetHeight}px`);
    };

    setHeightVar();
    const ro = new ResizeObserver(setHeightVar);
    ro.observe(header);
    return () => ro.disconnect();
  }, []);

  // --- Mobile menu: lock body scroll while open ---
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape for accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-base-border backdrop-blur-md py-4"
      style={{ backgroundColor: "rgba(10,14,20,0.55)" }}
    >
      <nav
        ref={navRef}
        className="max-w-6xl mx-auto flex items-center justify-between gap-3 px-4"
      >
        <NavLink
          to="/"
          className="group shrink-0 font-heading font-bold text-xl tracking-tight"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
            Exo
            <span className="text-accent">finity</span>
          </span>
        </NavLink>

        {/* Desktop nav with sliding active indicator */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative flex gap-1">
            <span
              ref={indicatorRef}
              className="absolute bottom-0 left-0 h-[2px] rounded-full bg-accent opacity-0"
              style={{ boxShadow: "0 0 8px 1px rgba(134,59,255,0.6)" }}
              aria-hidden="true"
            />
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                ref={(el) => {
                  if (el) linkRefs.current[l.to] = el;
                }}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Join stands apart as the primary action, not part of the sliding indicator */}
          <NavLink
            to={cta.to}
            className="ml-2 inline-flex items-center justify-center rounded-xl2 bg-accent px-4 py-2 text-sm font-semibold text-base-bg transition-all duration-200 hover:bg-accent-hover hover:shadow-glow"
          >
            {cta.label}
          </NavLink>
        </div>

        <button
          className="md:hidden relative w-9 h-9 shrink-0 flex items-center justify-center text-white"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
        >
          <span className="sr-only">Toggle menu</span>
          <div className="relative w-5 h-4">
            <span
              className="absolute left-0 top-0 w-full h-[2px] bg-current rounded-full transition-transform duration-300"
              style={{ transform: open ? "translateY(7px) rotate(45deg)" : "none" }}
            />
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-current rounded-full transition-opacity duration-200"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 bottom-0 w-full h-[2px] bg-current rounded-full transition-transform duration-300"
              style={{ transform: open ? "translateY(-7px) rotate(-45deg)" : "none" }}
            />
          </div>
        </button>
      </nav>

      {/* Backdrop — dims the page and closes the menu on outside click (mobile only) */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-x-0 bottom-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: "var(--nav-h)" }}
      />

      {/* Mobile panel — pure CSS reveal via grid-template-rows, no imperative DOM writes */}
      <div
        id="mobile-nav-panel"
        className={`md:hidden relative grid overflow-hidden border-t transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr] border-base-border" : "grid-rows-[0fr] border-transparent"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className="flex flex-col px-4 pt-3 gap-1"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to={cta.to}
              className="mt-2 inline-flex items-center justify-center rounded-xl2 bg-accent px-4 py-2.5 text-sm font-semibold text-base-bg transition-all duration-200 hover:bg-accent-hover hover:shadow-glow active:scale-[0.98]"
            >
              {cta.label}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}