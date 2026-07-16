import SectionHeading from "../components/ui/SectionHeading";

const GOOGLE_FORM_SRC = "https://docs.google.com/forms/d/e/YOUR_JOIN_FORM_ID/viewform?embedded=true";

export default function Join() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <SectionHeading
        eyebrow="Get Involved"
        title="Join the Community"
        subtitle="Tell us a bit about yourself and where you'd like to contribute."
        center
      />
      <div className="mt-10 bg-base-surface border border-base-border rounded-xl2 overflow-hidden">
        <iframe
          src={GOOGLE_FORM_SRC}
          title="Join Exofinity Form"
          width="100%"
          height="900"
          className="w-full"
          style={{ colorScheme: "light" }}
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>
    </section>
  );
}