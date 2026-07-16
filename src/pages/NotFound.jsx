import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-32 text-center">
      <p className="text-accent font-semibold uppercase tracking-wide text-sm mb-2">404</p>
      <h1 className="text-3xl md:text-4xl font-heading font-bold">
        This orbit doesn&apos;t exist.
      </h1>
      <p className="mt-4 text-white/60">
        The page you&apos;re looking for has drifted off. Let&apos;s get you back on track.
      </p>
      <Button to="/" className="mt-8">Back home</Button>
    </div>
  );
}
