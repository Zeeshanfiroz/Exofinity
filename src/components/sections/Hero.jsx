import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        // Once the animation finishes, strip GSAP's inline styles entirely
        // so the element falls back to plain CSS (fully visible, no
        // leftover opacity/transform that could ever get stuck).
        clearProps: "opacity,transform",
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="max-w-6xl mx-auto px-4 py-24 text-center">
      <h1 className="hero-fade text-4xl md:text-6xl font-bold mb-4">
        Where former members unite <br className="hidden md:block" />
        for an <span className="text-accent">infinite future</span>.
      </h1>
      <p className="hero-fade text-white/70 max-w-xl mx-auto mb-8">
        Team Exofinity is a community for former members who unite around AI, Web Development, and emerging technologies.
      </p>
      <Button to="/join" className="hero-fade">Join Community</Button>
    </section>
  );
}