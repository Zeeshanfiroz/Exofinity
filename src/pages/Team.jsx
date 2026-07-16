import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { team, openRoles } from "../data/team";

function Avatar({ name, photo }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        loading="lazy"
        className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-accent/40 shadow-lg"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div
      className="w-40 h-40 rounded-full mx-auto border-4 border-accent/40 bg-base-surface flex items-center justify-center font-heading font-bold text-4xl"
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function SocialIcon({ type, href }) {
  const icons = {
    linkedin: "in",
    github: "GH",
    twitter: "X",
    email: "✉"
  };
  
  return (
    <a 
      href={href} 
      target={type !== "email" ? "_blank" : "_self"} 
      rel={type !== "email" ? "noreferrer" : ""}
      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:text-accent hover:bg-accent hover:bg-accent/20 transition-all"
    >
      <span className="text-sm font-bold">{icons[type]}</span>
    </a>
  );
}

export default function Team() {
  return (
    <div className="relative z-10">
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header Section */}
        <SectionHeading
          title="The Innovators Behind Exofinity"
          subtitle="Meet the visionaries, builders, and community champions who make Exofinity's infinite mission a daily reality."
          center
        />

        {/* Founders Row */}
        <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.map((member) => (
            <div 
              key={member.name} 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center transition-transform duration-300 hover:scale-[1.03]"
            >
              <Avatar name={member.name} photo={member.photo} />
              <h3 className="mt-5 font-heading font-bold text-2xl text-white">{member.name}</h3>
              <p className="text-accent text-sm mt-1">{member.role}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {member.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-white/70 text-sm leading-relaxed">
                {member.bio}
              </p>
              
              <div className="mt-5 flex justify-center gap-3">
                {member.socials.linkedin && <SocialIcon type="linkedin" href={member.socials.linkedin} />}
                {member.socials.github && <SocialIcon type="github" href={member.socials.github} />}
                {member.socials.twitter && <SocialIcon type="twitter" href={member.socials.twitter} />}
                {member.socials.email && <SocialIcon type="email" href={member.socials.email} />}
              </div>
            </div>
          ))}
        </div>

        {/* Open Roles Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-6 text-accent">Open Roles</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {openRoles.map((role, idx) => (
              <div 
              key={idx} 
              className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
              >
                <span className="text-white/80 text-sm">{role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Container */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-accent/20 to-accent-cyan/20 backdrop-blur-md border border-white/10 rounded-3xl p-10 text-center shadow-glow">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">Could This Be You?</h3>
            <p className="text-white/80 mb-6">
              We're actively looking for passionate developers, designers, writers, and community builders to join Exofinity's core team. All backgrounds welcome.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button to="/contact">Apply for Core Team</Button>
              <Button to="/contact" variant="secondary">Ask a Question</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
