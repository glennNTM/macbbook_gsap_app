import { useRef } from "react";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";
import { AutoplayVideo } from "./AutoplayVideo";

const Showcase = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Zoom du masque + apparition du texte : desktop uniquement, sans mouvement réduit.
      mm.add(`${MEDIA.desktop} and ${MEDIA.motionOK}`, () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
              pin: true,
            },
          })
          .to(".mask img", { scale: 1.1 })
          .fromTo(".content", { opacity: 0 }, { opacity: 1, y: 0, ease: "power1.in" });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="showcase" ref={sectionRef} aria-labelledby="showcase-title">
      <div className="media">
        <AutoplayVideo src="/videos/game.mp4" label="gameplay video"
          poster="/videos/game.poster.webp"
          loop
          preload="metadata" />
        <div className="mask" aria-hidden="true">
          <img src="/mask-logo.svg" alt="" width={1920} height={1080} />
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2 id="showcase-title">Rocket Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing{" "}
                <span className="text-white">M4, the next generation of Apple silicon</span>. M4
                powers
              </p>
              <p>
                It drives Apple Intelligence on iPad Pro, so you can write, create, and accomplish
                more with ease. All in a design that’s unbelievably thin, light, and powerful.
              </p>
              <p>
                A brand-new display engine delivers breathtaking precision, color accuracy, and
                brightness. And a next-gen GPU with hardware-accelerated ray tracing brings
                console-level graphics to your fingertips.
              </p>
              <p className="text-primary">Learn more about Apple Intelligence</p>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance than M2</p>
            </div>
            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance than M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
