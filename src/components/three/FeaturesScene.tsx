import { useTexture } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { type Group, SRGBColorSpace } from "three";
import { features } from "@/constants";
import useMacbookStore from "@/store/macbookStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";
import { MacbookModel } from "../models/MacbookModel";
import { canvasDefaults } from "./canvasConfig";
import { CanvasLoader } from "./CanvasLoader";
import StudioLights from "./StudioLights";
import { useVideoTextures } from "./useVideoTextures";

const FEATURE_VIDEOS = features.map((feature) => feature.video);

/** Écran animé : la vidéo de la fonctionnalité active, seule à être lue. */
function VideoScreenModel({ playing, scale }: { playing: boolean; scale: number }) {
  const color = useMacbookStore((s) => s.color);
  const activeFeature = useMacbookStore((s) => s.activeFeature);
  const textures = useVideoTextures(FEATURE_VIDEOS);

  useEffect(() => {
    textures.forEach((texture, index) => {
      const video = texture.image;
      if (playing && index === activeFeature) {
        video.play().catch(() => {
          /* lecture refusée par le navigateur : la texture reste figée */
        });
      } else {
        video.pause();
      }
    });
  }, [textures, activeFeature, playing]);

  const screen = textures[activeFeature] ?? textures[0];
  if (!screen) return null;

  return <MacbookModel scale={scale} position={[0, -1, 0]} color={color} screen={screen} />;
}

/** Écran fixe pour prefers-reduced-motion : aucune vidéo lue. */
function StaticScreenModel({ scale }: { scale: number }) {
  const color = useMacbookStore((s) => s.color);
  const screen = useTexture("/screen.webp", (t) => {
    t.colorSpace = SRGBColorSpace;
  });

  return <MacbookModel scale={scale} position={[0, -1, 0]} color={color} screen={screen} />;
}

function FeatureModel({ playing }: { playing: boolean }) {
  const groupRef = useRef<Group>(null);
  const isMobile = useMediaQuery(MEDIA.mobile);
  const reduceMotion = useMediaQuery(MEDIA.reduceMotion);
  const scale = isMobile ? 0.05 : 0.08;

  // Rotation complète du modèle pendant le défilement de la section.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MEDIA.motionOK, () => {
      if (!groupRef.current) return;
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#f-canvas",
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  });

  return (
    <group ref={groupRef}>
      {reduceMotion ? (
        <StaticScreenModel scale={scale} />
      ) : (
        <VideoScreenModel playing={playing} scale={scale} />
      )}
    </group>
  );
}

export default function FeaturesScene({ active }: { active: boolean }) {
  return (
    <Canvas {...canvasDefaults} frameloop={active ? "always" : "never"} camera={{ position: [0, 0, 5] }}>
      <StudioLights />
      <ambientLight intensity={0.5} />
      <Suspense fallback={<CanvasLoader />}>
        <FeatureModel playing={active} />
      </Suspense>
    </Canvas>
  );
}
