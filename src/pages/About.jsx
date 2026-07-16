import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";

export default function About() {
  const pillars = [
    {
      icon: "🚀",
      title: "Technology & Innovation",
      desc: "Exploring emerging technologies — AI, Blockchain, Cloud, and beyond."
    },
    {
      icon: "🤖",
      title: "AI & Automation",
      desc: "Building intelligent systems that augment human capability — from ML models to agentic AI pipelines."
    },
    {
      icon: "🌐",
      title: "Web & Open Source",
      desc: "Creating open-source tools, contributing to global projects, and building the web of tomorrow."
    },
    {
      icon: "⚡",
      title: "Rapid Prototyping",
      desc: "From idea to demo in record time. We celebrate speed, iteration, and the courage to ship early."
    },
    {
      icon: "🧠",
      title: "Knowledge & Research",
      desc: "Deep dives, research papers, workshops, and study groups that raise everyone's technical floor."
    },
    {
      icon: "👥",
      title: "Community & People",
      desc: "The heartbeat of Exofinity. Mentorship, inclusivity, and genuine human connection drive everything we do."
    }
  ];

  const aims = [
    "Learn new technologies",
    "Build real projects",
    "Share knowledge openly",
    "Grow professionally and personally",
    "Help each other reach the next level"
  ];

  return (
    <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header Element */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-accent to-accent-cyan bg-clip-text text-transparent">
            Mission, Vision & Our Why
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-4">
            We exist to unite passionate individuals around technology, collaboration, and the relentless pursuit of infinite growth.
          </p>
          <p className="text-accent-cyan font-semibold">Community Founded: March 2026</p>
        </div>

        {/* Column 1 & 2 */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Core Narrative Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-4 text-accent">A Community Born From Shared Ambition</h3>
            <p className="text-white/70 mb-4 leading-relaxed">
              Exofinity is more than just a group — it is a movement of former members who refused to let their connections fade after their shared institution or organization. We chose to carry our bonds forward, transforming them into a living, breathing innovation ecosystem.
            </p>
            <p className="text-white/70 leading-relaxed">
              We believe that the best technology is built together. That real projects, open knowledge, and fearless experimentation are the pillars of progress. Exofinity is the space where those pillars stand tall. From our first workshop to our 40+ events and growing, every milestone is a testament to what happens when former members don't just reminisce — they build the future together.
            </p>
          </div>

          {/* Objective & Foundation Elements */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-2xl font-bold mb-4 text-accent">Our Aim</h3>
            <p className="text-white/80 mb-4">To create a supportive ecosystem where members:</p>
            <ul className="space-y-3 mb-8">
              {aims.map((aim, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="text-accent-cyan text-xl">✓</span>
                  <span className="text-white/70">{aim}</span>
                </li>
              ))}
            </ul>
            <p className="text-xl italic text-center text-white/80">
              “In Exofinity, no one grows alone.”
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-10 text-accent">Six Pillars of Our Innovation Engine</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 transition-transform duration-300 hover:scale-[1.03]"
              >
                <span className="text-4xl">{pillar.icon}</span>
                <h4 className="mt-3 font-bold text-lg text-white">{pillar.title}</h4>
                <p className="mt-2 text-white/60 text-sm">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Central Motto Callout Banner */}
        <div className="bg-gradient-to-r from-accent/20 to-accent-cyan/20 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">BEYOND LIMITS. INFINITE GROWTH.</h2>
          <p className="text-white/70 mb-8 text-lg">“Alone we learn, together we create the future.”</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/join">Join Community</Button>
            <Button to="/team" variant="secondary">Meet the Team</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
