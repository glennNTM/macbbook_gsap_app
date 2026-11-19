import { useRef } from "react";
import { performanceImages, performanceImgPositions } from "@/constants";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

const Performance = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ motionOK: MEDIA.motionOK, desktop: MEDIA.desktop }, (context) => {
        const { motionOK, desktop } = context.conditions as Record<"motionOK" | "desktop", boolean>;
        if (!motionOK) return;

        // Apparition du texte
        gsap.fromTo(
          ".content p",
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: "power1.out",
            scrollTrigger: {
              trigger: ".content p",
              start: "top bottom",
              end: "top center",
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        if (!desktop) return;

        // Les images s'écartent depuis le centre
        const timeline = gsap.timeline({
          defaults: { duration: 2, ease: "power1.inOut", overwrite: "auto" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        performanceImgPositions.forEach((item) => {
          if (item.id === "p5") return;

          const vars: gsap.TweenVars = {};
          if (typeof item.left === "number") vars.left = `${item.left}%`;
          if (typeof item.right === "number") vars.right = `${item.right}%`;
          if (typeof item.bottom === "number") vars.bottom = `${item.bottom}%`;
          if (item.transform) vars.transform = item.transform;

          timeline.to(`.${item.id}`, vars, 0);
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="performance" ref={sectionRef} aria-labelledby="performance-title">
      <h2 id="performance-title">Next-level graphics performance. Game on.</h2>

      <div className="wrapper" aria-hidden="true">
        {performanceImages.map((item) => (
          <img
            key={item.id}
            src={item.src}
            className={item.id}
            alt=""
            width={item.width}
            height={item.height}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up with your
          imagination. The M4 family of chips features a GPU with a second-generation
          hardware-accelerated ray tracing engine that renders images faster, so{" "}
          <span className="text-white">gaming feels more immersive and realistic than ever.</span>{" "}
          And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU
          utilization — driving a huge performance boost for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;
