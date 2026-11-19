import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Media queries partagées entre gsap.matchMedia() et useMediaQuery(). */
export const MEDIA = {
  desktop: "(min-width: 1025px)",
  mobile: "(max-width: 1024px)",
  motionOK: "(prefers-reduced-motion: no-preference)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
