// src/components/layout/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-base-border py-10 mt-20">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-6 text-sm text-white/60">
        <div>
          <p className="font-heading font-bold text-white">EXOFINITY</p>
          <p className="mt-1">Beyond Limits. Infinite Growth.</p>
          <p className="mt-2">A technological innovation hub where former members unite for an infinite future.</p>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-accent">Instagram</a>
          <a href="#" className="hover:text-accent">LinkedIn</a>
          <a href="#" className="hover:text-accent">Discord</a>
          <a href="#" className="hover:text-accent">WhatsApp</a>
        </div>
        <p>© {new Date().getFullYear()} Team Exofinity. All rights reserved.</p>
      </div>
    </footer>
  );
}