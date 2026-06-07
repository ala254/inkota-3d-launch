import { useEffect, useRef } from "react";

// Shared scroll progress (0..1) across the document. Returns a ref updated
// in real time without triggering re-renders — ideal for r3f useFrame loops
// and other animation timelines that should stay in lockstep with scroll.
export function useScrollProgressRef() {
  const ref = useRef(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      ref.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return ref;
}
