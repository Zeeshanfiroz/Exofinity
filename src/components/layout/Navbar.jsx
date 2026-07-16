// // src/components/layout/Navbar.jsx
// import { useState } from "react";
// import { NavLink } from "react-router-dom";

// const links = [
//   { to: "/", label: "Home" },
//   { to: "/about", label: "About" },
//   { to: "/team", label: "Team" },
//   { to: "/events", label: "Events" },
//   { to: "/join", label: "Join" },
//   { to: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const linkClass = ({ isActive }) =>
//     `px-3 py-2 text-sm font-medium transition-colors ${
//       isActive ? "text-accent" : "text-white/70 hover:text-white"
//     }`;

//   return (
//     <header className="border-b border-base-border sticky top-0 bg-base-bg/90 backdrop-blur z-50">
//       <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
//         <NavLink to="/" className="font-heading font-bold text-xl">
//           Exo<span className="text-accent">finity</span>
//         </NavLink>

//         <div className="hidden md:flex gap-1">
//           {links.map((l) => (
//             <NavLink key={l.to} to={l.to} className={linkClass}>
//               {l.label}
//             </NavLink>
//           ))}
//         </div>

//         <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
//           {open ? "✕" : "☰"}
//         </button>
//       </nav>

//       {open && (
//         <div className="md:hidden flex flex-col px-4 pb-4 gap-1">
//           {links.map((l) => (
//             <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
//               {l.label}
//             </NavLink>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }

// src/components/layout/Navbar.jsx
import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import gsap from "gsap";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/events", label: "Events" },
  { to: "/join", label: "Join" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const headerRef = useRef(null);
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const indicatorRef = useRef(null);
  const mobilePanelRef = useRef(null);
  const scrolledRef = useRef(false);
  const tlRef = useRef(null);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-white" : "text-white/70 hover:text-white"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `nav-mobile-link px-3 py-2 rounded-lg text-base font-medium transition-colors ${
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

  // --- Mobile menu open/close animation + body scroll lock + escape key ---
  useEffect(() => {
    const panel = mobilePanelRef.current;
    if (!panel) return;

    if (tlRef.current) tlRef.current.kill();

    if (open) {
      document.body.style.overflow = "hidden";
      const items = panel.querySelectorAll(".nav-mobile-link");
      tlRef.current = gsap.timeline();
      tlRef.current
        .set(panel, { display: "flex", height: "auto" })
        .from(panel, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        })
        .from(
          items,
          {
            opacity: 0,
            y: -8,
            stagger: 0.05,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.15"
        );
    } else {
      document.body.style.overflow = "";
      tlRef.current = gsap.timeline();
      tlRef.current.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
    }

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
      className="sticky top-0 z-50 border-b border-base-border backdrop-blur-md"
      style={{ backgroundColor: "rgba(10,14,20,0.55)" }}
    >
      <nav
        ref={navRef}
        className="max-w-6xl mx-auto flex items-center justify-between px-4"
      >
        <NavLink
          to="/"
          className="group font-heading font-bold text-xl tracking-tight"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">
            Exo
            <span className="text-accent">finity</span>
          </span>
        </NavLink>

        {/* Desktop nav with sliding active indicator */}
        <div className="relative hidden md:flex gap-1">
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
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <button
          className="md:hidden relative w-9 h-9 flex items-center justify-center text-white"
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

      {/* Mobile panel — kept mounted (display:none) so GSAP can animate height */}
      <div
        id="mobile-nav-panel"
        ref={mobilePanelRef}
        className="md:hidden flex-col overflow-hidden px-4 pb-4 gap-1"
        style={{ display: "none" }}
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
      </div>
    </header>
  );
}