import SectionHeading from "../components/ui/SectionHeading";

const GOOGLE_FORM_SRC = "https://docs.google.com/forms/d/e/YOUR_CONTACT_FORM_ID/viewform?embedded=true";

export default function Contact() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <SectionHeading eyebrow="Get In Touch" title="Contact Us" center />

      <div className="mt-10 bg-base-surface border border-base-border rounded-xl2 overflow-hidden">
        <iframe
          src={GOOGLE_FORM_SRC}
          title="Contact Exofinity Form"
          width="100%"
          height="700"
          className="w-full"
          style={{ colorScheme: "light" }}
          loading="lazy"
        >
          Loading…
        </iframe>
      </div>

      <div className="mt-8 flex flex-col items-center gap-2 text-white/70 text-sm">
        <a href="mailto:hello@exofinity.dev" className="hover:text-accent">hello@exofinity.dev</a>
        <div className="flex gap-4 mt-2">
          <a href="#" className="hover:text-accent">Instagram</a>
          <a href="#" className="hover:text-accent">LinkedIn</a>
          <a href="#" className="hover:text-accent">Discord</a>
          <a href="#" className="hover:text-accent">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}