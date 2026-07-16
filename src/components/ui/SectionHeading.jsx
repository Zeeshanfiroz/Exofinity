// src/components/ui/SectionHeading.jsx
export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && <p className="text-accent font-semibold uppercase tracking-wide text-sm mb-2">{eyebrow}</p>}
      <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
      {subtitle && <p className="text-white/60 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}