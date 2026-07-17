const eyebrowSizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const titleSizes = {
  sm: "text-2xl md:text-3xl",
  md: "text-3xl md:text-4xl",
  lg: "text-4xl md:text-5xl",
};

/**
 * SectionHeading — eyebrow + title + optional subtitle, used at the top
 * of every page section.
 *
 * size: "sm" | "md" | "lg" — controls both eyebrow and title scale together
 * (defaults to "md", same as before).
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
  size = "md",
  as: Heading = "h2",
}) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <p
          className={`inline-flex items-center gap-2 font-semibold uppercase tracking-wide text-accent mb-3 ${eyebrowSizes[size]} ${
            center ? "justify-center" : ""
          }`}
        >
          {eyebrow}
        </p>
      )}
      <Heading className={`font-heading font-bold ${titleSizes[size]} mb-3`}>
        {title}
      </Heading>
      {subtitle && (
        <p className={`text-white/60 max-w-2xl leading-relaxed ${center ? "mx-auto" : ""}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}