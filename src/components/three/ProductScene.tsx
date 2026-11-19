import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import useMacbookStore from "@/store/macbookStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA } from "@/lib/gsap";
import { canvasDefaults } from "./canvasConfig";
import { CanvasLoader } from "./CanvasLoader";
import ModelSwitcher from "./ModelSwitcher";
import StudioLights from "./StudioLights";

export default function ProductScene({ active }: { active: boolean }) {
  const size = useMacbookStore((s) => s.size);
  const isMobile = useMediaQuery(MEDIA.mobile);

  return (
    <Canvas
      {...canvasDefaults}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}
    >
      <StudioLights />
      <Suspense fallback={<CanvasLoader />}>
        <ModelSwitcher size={size} isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
