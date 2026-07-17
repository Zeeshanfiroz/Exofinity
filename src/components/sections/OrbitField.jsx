// src/components/sections/OrbitField.jsx
/**
 * OrbitField — the hero's signature background visual: nodes (former
 * members, once scattered) held in slow concentric orbits around a shared
 * center. Purely decorative and non-interactive; animation is driven by the
 * parent Hero's GSAP context so everything shares one timeline/cleanup.
 */
export default function OrbitField({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <circle className="orbit-ring" cx="200" cy="200" r="170" fill="none" stroke="#863bff" strokeOpacity="0.16" strokeWidth="1" />
      <circle className="orbit-ring" cx="200" cy="200" r="120" fill="none" stroke="#43e8d8" strokeOpacity="0.16" strokeWidth="1" />
      <circle className="orbit-ring" cx="200" cy="200" r="70" fill="none" stroke="#863bff" strokeOpacity="0.22" strokeWidth="1" />

      <circle className="orbit-node" cx="200" cy="30" r="4" fill="#43e8d8" />
      <circle className="orbit-node" cx="357" cy="120" r="3" fill="#863bff" />
      <circle className="orbit-node" cx="357" cy="280" r="3.5" fill="#43e8d8" />
      <circle className="orbit-node" cx="43" cy="280" r="3" fill="#863bff" />
      <circle className="orbit-node" cx="43" cy="120" r="4" fill="#43e8d8" />
      <circle className="orbit-node" cx="200" cy="80" r="3" fill="#863bff" />
      <circle className="orbit-node" cx="308" cy="270" r="3" fill="#43e8d8" />
      <circle className="orbit-node" cx="92" cy="270" r="3" fill="#863bff" />

      <circle cx="200" cy="200" r="13" fill="#863bff" opacity="0.9" />
      <circle cx="200" cy="200" r="5.5" fill="#43e8d8" />
    </svg>
  );
}
