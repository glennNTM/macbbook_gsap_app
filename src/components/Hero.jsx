import { useRef } from "react"

const Hero = () => {
    const videoRef= useRef()

  return (
    <section id="hero">
        <div>
            <h1>Macbook Pro</h1>
            <img src="/title.png" alt="Macbook Title" />
            <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted playsInline />
        </div>
    </section>
  )
}

export default Hero