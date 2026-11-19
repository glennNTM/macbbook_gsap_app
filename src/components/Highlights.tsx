import { useRef } from "react";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";

const Highlights = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add({ desktop: MEDIA.desktop, motionOK: MEDIA.motionOK }, (context) => {
        const { desktop, motionOK } = context.conditions as Record<"desktop" | "motionOK", boolean>;
        if (!motionOK) return;

        gsap.from([".left-column", ".right-column"], {
          scrollTrigger: {
            trigger: sectionRef.current,
            // Sur mobile, l'ancien déclencheur ("bottom bottom") cachait le contenu pendant la lecture.
            start: desktop ? "top center" : "top 80%",
          },
          y: -20,
          opacity: 0,
          stagger: 0.5,
          duration: 1,
          ease: "power1.inOut",
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="highlights" ref={sectionRef} aria-labelledby="highlights-title">
      <h2 id="highlights-title">There’s never been a better time to upgrade.</h2>
      <h3>Here’s what you get with the new MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div>
            <img src="/laptop.png" alt="" width={106} height={106} loading="lazy" />
            <p>Fly through demanding tasks up to 9.8x faster.</p>
          </div>
          <div>
            <img src="/sun.png" alt="" width={87} height={113} loading="lazy" />
            <p>
              A stunning <br />
              Liquid Retina XDR <br />
              display.
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="" width={78} height={100} loading="lazy" />
            <p>
              Built for <br />
              <span>Apple Intelligence.</span>
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="" width={93} height={106} loading="lazy" />
            <p>
              Up to <span className="green-gradient">14 more hours</span> battery life.{" "}
              <span className="text-dark-100">(Up to 24 hours total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
