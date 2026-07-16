// src/components/ui/Button.jsx
import { Link } from "react-router-dom";

/**
 * Button — primary/secondary variants.
 * - Internal routes: pass `to="/join"` (or `as="a" href="/join"` for
 *   backwards compatibility) to get client-side navigation via react-router.
 * - External links: pass `href="https://..."` to render a plain anchor.
 * - Otherwise renders a <button>.
 */
export default function Button({
  children,
  variant = "primary",
  as: As = "button",
  to,
  href,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl2 font-semibold transition-all duration-200";
  const variants = {
    primary: "bg-accent text-base-bg hover:bg-accent-hover hover:shadow-glow",
    secondary: "border border-accent text-accent hover:bg-accent/10",
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  // Internal navigation: explicit `to`, or legacy `as="a" href="/path"`.
  const internalPath = to ?? (As === "a" && href?.startsWith("/") ? href : undefined);
  if (internalPath) {
    return (
      <Link to={internalPath} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (As === "a" || href) {
    return (
      <a
        href={href}
        className={classes}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noreferrer" : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <As className={classes} {...props}>
      {children}
    </As>
  );
}
