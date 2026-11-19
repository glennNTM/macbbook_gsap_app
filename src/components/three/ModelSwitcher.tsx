import { PresentationControls, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { type Group, type Material, type Mesh, SRGBColorSpace } from "three";
import { MACBOOK_SIZES, type MacbookSize } from "@/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { gsap, MEDIA, useGSAP } from "@/lib/gsap";
import useMacbookStore from "@/store/macbookStore";
import { MacbookModel } from "../models/MacbookModel";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const collectMaterials = (group: Group): Material[] => {
  const materials = new Set<Material>();
  group.traverse((child) => {
    const { isMesh, material } = child as Mesh;
    if (!isMesh) return;
    (Array.isArray(material) ? material : [material]).forEach((m) => materials.add(m));
  });
  return [...materials];
};

/** Fait glisser et apparaître/disparaître un modèle. */
const transitionModel = (group: Group, x: number, visible: boolean, duration: number) => {
  const opacity = visible ? 1 : 0;
  const materials = collectMaterials(group);
  const vars = { duration, ease: "power2.inOut", overwrite: "auto" } as const;

  group.visible = true;
  gsap.to(group.position, { ...vars, x });
  gsap.to(materials, {
    ...vars,
    opacity,
    onStart: () => materials.forEach((m) => (m.transparent = true)),
    onComplete: () => {
      materials.forEach((m) => (m.transparent = !visible));
      // Un modèle invisible n'a plus besoin d'être dessiné.
      group.visible = visible;
    },
  });
};

const controlsConfig = {
  snap: true,
  speed: 1,
  zoom: 1,
  azimuth: [-Infinity, Infinity] as [number, number],
  config: { mass: 1, tension: 0, friction: 26 },
};

interface ModelSwitcherProps {
  size: MacbookSize;
  isMobile: boolean;
}

const ModelSwitcher = ({ size, isMobile }: ModelSwitcherProps) => {
  const smallMacbookRef = useRef<Group>(null);
  const largeMacbookRef = useRef<Group>(null);
  const isFirstRun = useRef(true);
  const color = useMacbookStore((s) => s.color);
  const reduceMotion = useMediaQuery(MEDIA.reduceMotion);

  const screen = useTexture("/screen.webp", (t) => {
    t.colorSpace = SRGBColorSpace;
  });

  useGSAP(
    () => {
      const small = smallMacbookRef.current;
      const large = largeMacbookRef.current;
      if (!small || !large) return;

      // Pas d'animation au premier rendu ni en mouvement réduit.
      const duration = isFirstRun.current || reduceMotion ? 0 : ANIMATION_DURATION;
      isFirstRun.current = false;

      const showLarge = size === "16";
      transitionModel(small, showLarge ? -OFFSET_DISTANCE : 0, !showLarge, duration);
      transitionModel(large, showLarge ? 0 : OFFSET_DISTANCE, showLarge, duration);
    },
    { dependencies: [size, reduceMotion] },
  );

  const [size14, size16] = MACBOOK_SIZES;
  const scaleOf = (option: (typeof MACBOOK_SIZES)[number] | undefined) =>
    isMobile ? (option?.mobileScale ?? 0) : (option?.scale ?? 0);

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel scale={scaleOf(size16)} color={color} screen={screen} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlsConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel scale={scaleOf(size14)} color={color} screen={screen} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
