import SectionHeading from "../components/ui/SectionHeading";
import Card from "../components/ui/Card";
import { team } from "../data/team";

function Avatar({ name, photo }) {
  if (photo) {
    return (
      <img
        src={photo}
        alt={name}
        loading="lazy"
        className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-accent/40"
      />
    );
  }

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <div
      className="w-24 h-24 rounded-full mx-auto border-2 border-accent/40 bg-base-surface flex items-center justify-center font-heading font-bold text-lg"
      aria-hidden="true"
    >
      {initials}
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
          <Card key={member.name} className="text-center">
            <Avatar name={member.name} photo={member.photo} />
            <h3 className="mt-4 font-heading font-bold text-lg">{member.name}</h3>
            <p className="text-accent text-sm">{member.role}</p>

            <div className="mt-3 flex justify-center gap-3 text-white/60 text-sm">
              {member.socials?.linkedin && (
                <a href={member.socials.linkedin} className="hover:text-accent">LinkedIn</a>
              )}
              {member.socials?.github && (
                <a href={member.socials.github} className="hover:text-accent">GitHub</a>
              )}
              {member.socials?.twitter && (
                <a href={member.socials.twitter} className="hover:text-accent">Twitter</a>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
