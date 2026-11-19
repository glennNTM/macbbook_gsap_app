import { Html, useProgress } from "@react-three/drei";

/** Indicateur de chargement affiché dans le canvas pendant le chargement des assets. */
export function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <p role="status" className="scene-loader">
        Loading 3D model… {Math.round(progress)}%
      </p>
    </Html>
  );
}
