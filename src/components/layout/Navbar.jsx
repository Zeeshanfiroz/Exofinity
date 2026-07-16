// src/components/layout/Navbar.jsx
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
  const linkClass = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-accent" : "text-white/70 hover:text-white"
    }`;

  return (
    <header className="border-b border-base-border sticky top-0 bg-base-bg/90 backdrop-blur z-50">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <NavLink to="/" className="font-heading font-bold text-xl">
          Exo<span className="text-accent">finity</span>
        </NavLink>

        <div className="hidden md:flex gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}