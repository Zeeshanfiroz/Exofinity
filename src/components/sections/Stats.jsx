import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "../../lib/gsap";
import { stats } from "../../data/stats";

export default function Stats() {
  const sectionRef = useRef(null);
  const valueRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Reduced motion (or no JS-heavy path needed): just paint final values.
    if (prefersReducedMotion()) {
      valueRefs.current.forEach((el, i) => {
        if (el) el.textContent = `${stats[i].value}${stats[i].suffix}`;
      });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
      });

      valueRefs.current.forEach((el, i) => {
        if (!el) return;
        const counter = { val: 0 };
        gsap.to(counter, {
          val: stats[i].value,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.floor(counter.val)}${stats[i].suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="border-y border-base-border bg-base-surface/30">
      <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-3 divide-y divide-base-border sm:divide-y-0 sm:divide-x">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="stat-item py-6 sm:py-0 sm:px-8 text-center first:pt-0 sm:first:pl-0 last:pb-0 sm:last:pr-0"
          >
            <p
              ref={(el) => { valueRefs.current[i] = el; }}
              className="font-heading text-4xl md:text-5xl font-bold text-accent"
            >
              0{stat.suffix}
            </p>
            <p className="mt-2 text-white/60 text-sm uppercase tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
