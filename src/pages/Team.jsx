import { useState } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import { team, openRoles } from "../data/team";

// Maps every possible key in a member's `socials` object to its display
// label + Font Awesome icon class. Add a new platform here and every
// team member automatically picks it up if they have that key set.
const SOCIAL_META = {
  linkedin: { label: "LinkedIn", iconClass: "fa-brands fa-linkedin-in" },
  github: { label: "GitHub", iconClass: "fa-brands fa-github" },
  twitter: { label: "X", iconClass: "fa-brands fa-x-twitter" },
  instagram: { label: "Instagram", iconClass: "fa-brands fa-instagram" },
  whatsapp: { label: "WhatsApp", iconClass: "fa-brands fa-whatsapp" },
  snapchat: { label: "Snapchat", iconClass: "fa-brands fa-snapchat" },
  telegram: { label: "Telegram", iconClass: "fa-brands fa-telegram" },
  discord: { label: "Discord", iconClass: "fa-brands fa-discord" },
  email: { label: "Email", iconClass: "fa-solid fa-envelope" },
};

function Avatar({ name, photo, size = "w-32 h-32" }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        loading="lazy"
        className={`${size} rounded-full object-cover mx-auto ring-2 ring-accent/40 transition-all duration-300 group-hover:ring-accent group-hover:shadow-glow`}
      />
    );
  }

  const initials = name.split(" ").map((part) => part[0]).join("");

  return (
    <div
      className={`${size} rounded-full mx-auto ring-2 ring-accent/40 bg-base-surface flex items-center justify-center font-heading font-bold text-lg transition-all duration-300 group-hover:ring-accent group-hover:shadow-glow`}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function SocialLinks({ socials, compact = false }) {
  if (!socials) return null;

  // Only the first 3 real (non-placeholder) socials are ever shown, per
  // member, so profiles stay clean no matter how many platforms are in data.
  const entries = Object.entries(socials)
    .filter(([key, href]) => SOCIAL_META[key] && href && href !== "#")
    .slice(0, 3);

  if (entries.length === 0) return null;

  return (
    <div className={`flex flex-wrap justify-center gap-2 ${compact ? "mt-3" : "mt-4"}`}>
      {entries.map(([key, href]) => {
        const { label, iconClass } = SOCIAL_META[key];
        return (
          <a
            key={key}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
            aria-label={label}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent hover:shadow-glow"
          >
            <i className={`${iconClass} text-[14px] text-base-bg`} />
          </a>
        );
      })}
    </div>
  );
}

function TeamCard({ member }) {
  const [flipped, setFlipped] = useState(false);
  const [badgeTag, ...restTags] = member.tags ?? [];
  const visibleTags = restTags.slice(0, 2);
  const hasBack = member.experience || member.quote || member.intro;

  return (
    <div className="group [perspective:1200px]">
      <div
        className={`relative min-h-[400px] w-full transition-transform duration-700 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* FRONT */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-base-surface border border-base-border rounded-xl2 p-6 pb-7 flex flex-col items-center text-center transition-colors duration-300 group-hover:border-accent/50">
          <Avatar name={member.name} photo={member.photo} />

          <h3 className="mt-4 font-heading font-bold text-lg">{member.name}</h3>

          {badgeTag && (
            <span className="mt-2 inline-block bg-accent/15 text-accent border border-accent/30 rounded-full px-3 py-1 text-xs font-semibold tracking-wide">
              {badgeTag}
            </span>
          )}

          {visibleTags.length > 0 && (
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {visibleTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-base-bg border border-base-border rounded-full px-2.5 py-1 text-[11px] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <SocialLinks socials={member.socials} />

          {hasBack && (
            <button
              type="button"
              onClick={() => setFlipped(true)}
              className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-white/50 hover:text-accent transition-colors"
            >
              Know more
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </button>
          )}
        </div>

        {/* BACK */}
        {hasBack && (
          <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-base-surface border border-accent/40 rounded-xl2 p-6 pb-7 flex flex-col items-center text-center overflow-hidden">
            <Avatar name={member.name} photo={member.photo} size="w-14 h-14" />
            <h3 className="mt-2 font-heading font-bold text-base">{member.name}</h3>

            <div className="mt-4 space-y-3">
              {member.quote && (
                <p className="text-sm text-white/85 italic">“{member.quote}”</p>
              )}
              {member.experience && (
                <p className="text-xs text-white/55 leading-relaxed">{member.experience}</p>
              )}
              {member.intro && (
                <p className="text-xs text-white/55 leading-relaxed">{member.intro}</p>
              )}
            </div>

            <SocialLinks socials={member.socials} compact />

            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-white/50 hover:text-accent transition-colors"
            >
              <i className="fa-solid fa-arrow-left text-[10px]" />
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="The People"
        title="Meet the Team"
        subtitle="The people building and steering Exofinity forward."
        center
      />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {team.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>

      {/* Open Roles — surfaces data that previously had nowhere to render */}
      {openRoles?.length > 0 && (
        <div className="mt-20">
          <SectionHeading
            eyebrow="Get Involved"
            title="We're Growing — Open Roles"
            subtitle="Exofinity runs on volunteers. If one of these sounds like you, we'd love to hear from you."
            center
          />

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {openRoles.map((role) => (
              <span
                key={role}
                className="bg-base-surface border border-base-border rounded-full px-4 py-2 text-sm font-medium hover:border-accent/50 transition-colors"
              >
                {role}
              </span>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Button to="/join">Apply / Join the Team</Button>
          </div>
        </div>
      )}
    </div>
  );
}