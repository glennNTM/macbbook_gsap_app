import { PresentationControls, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { type Group, type Mesh, SRGBColorSpace } from "three";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { MacbookModel } from "../models/MacbookModel";
import useMacbookStore from "@/store/macbookStore";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group: Group | null, opacity: number) => {
  if (!group) return;

  group.traverse((child) => {
    if ((child as Mesh).isMesh) {
      const { material } = child as Mesh;
      const list = Array.isArray(material) ? material : [material];
      list.forEach((m) => {
        m.transparent = true;
        gsap.to(m, { opacity, duration: ANIMATION_DURATION });
      });
    }
  });
};

const moveGroup = (group: Group | null, x: number) => {
  if (!group) return;

  gsap.to(group.position, { x, duration: ANIMATION_DURATION });
};

interface ModelSwitcherProps {
  scale: number;
  isMobile: boolean;
}

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
  const smallMacbookRef = useRef<Group>(null);
  const largeMacbookRef = useRef<Group>(null);
  const color = useMacbookStore((s) => s.color);

  const screen = useTexture("/screen.png", (t) => {
    t.colorSpace = SRGBColorSpace;
  });

  const showLargeMacbook = scale === 0.08 || scale === 0.05;

  useGSAP(() => {
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(largeMacbookRef.current, 0);
    }
  }, [scale]);

  const controlsConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity] as [number, number],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel scale={isMobile ? 0.05 : 0.08} color={color} screen={screen} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel scale={isMobile ? 0.03 : 0.06} color={color} screen={screen} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
