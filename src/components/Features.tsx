import { lazy, useRef } from "react";
import clsx from "clsx";
import { features } from "@/constants";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";
import useMacbookStore from "@/store/macbookStore";
import { SceneFrame } from "./three/SceneFrame";

const FeaturesScene = lazy(() => import("./three/FeaturesScene"));

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const setActiveFeature = useMacbookStore((s) => s.setActiveFeature);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MEDIA.motionOK, () => {
        const boxes = gsap.utils.toArray<HTMLElement>(".box");
        // Instant (en secondes de timeline) où chaque fonctionnalité devient active.
        const starts: number[] = [];

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: "#f-canvas",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true,
            // Calculé à partir de la position : fonctionne dans les deux sens de défilement.
            onUpdate: () => {
              const time = timeline.time();
              const index = starts.findLastIndex((start) => time >= start);
              setActiveFeature(Math.max(0, index));
            },
          },
        });

        boxes.forEach((box, index) => {
          starts.push(timeline.duration());
          timeline.fromTo(
            box,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, delay: index === 0 ? 0.5 : 0 },
          );
        });

        return () => setActiveFeature(0);
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="features" ref={sectionRef} aria-labelledby="features-title">
      <h2 id="features-title">See it in a new light.</h2>

      <SceneFrame
        id="f-canvas"
        label="3D MacBook Pro rotating while its screen shows each Apple Intelligence feature."
      >
        {(active) => <FeaturesScene active={active} />}
      </SceneFrame>

      <ul className="absolute inset-0">
        {features.map((feature) => (
          <li key={feature.id} className={clsx("box", feature.styles)}>
            <img src={feature.icon} alt="" width={52} height={56} />
            <p>
              <span className="text-white">{feature.highlight}</span> {feature.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Features;
