import SectionHeading from "../components/ui/SectionHeading";
import { coreFocus } from "../data/coreFocus";

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Who we are */}
      <SectionHeading
        eyebrow="About Us"
        title="Who is Exofinity?"
        subtitle="Team Exofinity is a community for former members who unite around AI, Web Development, and emerging technologies."
      />
      <p className="mt-6 text-white/70 leading-relaxed max-w-3xl">
        We started as a group of former members looking for a place to keep learning, building,
        and growing together. Exofinity exists to give that group a home — a space where ideas
        turn into projects, and where no one has to figure things out alone.
      </p>

      {/* Mission */}
      <div className="mt-16 bg-base-surface border border-base-border rounded-xl2 p-8">
        <p className="text-accent font-semibold uppercase tracking-wide text-sm mb-2">Our Mission</p>
        <p className="text-2xl font-heading font-bold">
          Grow together, build together, succeed together.
        </p>
      </div>

      {/* Core Focus (detailed) */}
      <div className="mt-16">
        <SectionHeading eyebrow="What We Do" title="Core Focus" />
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {coreFocus.map((item) => (
            <div key={item.title} className="bg-base-surface border border-base-border rounded-xl2 p-6">
              <span className="text-3xl">{item.icon}</span>
              <h3 className="mt-3 font-heading font-bold text-lg">{item.title}</h3>
              <p className="mt-1 text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Aim */}
      <div className="mt-16">
        <SectionHeading eyebrow="Our Aim" title="What We're Working Toward" />
        <ul className="mt-6 space-y-3 text-white/70">
          {["Learn continuously from each other and the wider community.",
            "Build real projects, not just talk about ideas.",
            "Share knowledge, resources, and opportunities freely.",
            "Grow individually and as a community.",
            "Help each other whenever it's needed."].map((goal) => (
            <li key={goal} className="flex gap-3">
              <span className="text-accent">→</span>
              <span>{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Closing quote */}
      <p className="mt-16 text-center text-xl font-heading italic text-white/80">
        "In Exofinity, no one grows alone."
      </p>
    </div>
  );
}