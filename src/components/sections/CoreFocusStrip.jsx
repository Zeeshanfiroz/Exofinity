import { coreFocus } from "../../data/coreFocus";

export default function CoreFocusStrip() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {coreFocus.map((item) => (
          <div
            key={item.title}
            className="core-focus-item bg-base-surface border border-base-border rounded-xl2 p-5 text-center hover:border-accent/50 transition-colors"
          >
            <span className="text-3xl">{item.icon}</span>
            <p className="mt-2 font-heading font-semibold text-sm">{item.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}