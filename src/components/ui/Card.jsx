// src/components/ui/Card.jsx
export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-base-surface border border-base-border rounded-xl2 p-6 hover:border-accent/50 transition-colors ${className}`}>
      {children}
    </div>
  );
}