import { AutoplayVideo } from "./AutoplayVideo";

const Hero = () => {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <div>
        <h1 id="hero-title">MacBook Pro</h1>
        <img src="/title.png" alt="" width={1397} height={249} fetchPriority="high" />
        <AutoplayVideo src="/videos/hero.mp4" label="MacBook Pro intro video" preload="auto" />
        <a href="#product-viewer" className="cta">
          Buy
        </a>
        <p>From $1599 or $133/mo for 12 months</p>
      </div>
    </section>
  );
};

export default Hero;
