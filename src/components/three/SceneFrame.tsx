import { type ReactNode, Suspense, useRef } from "react";
import { useInView } from "@/hooks/useInView";

interface SceneFrameProps {
  id: string;
  /** Description textuelle de la scène pour les lecteurs d'écran. */
  label: string;
  className?: string;
  /** Reçoit `active` : la scène est visible et doit être rendue. */
  children: (active: boolean) => ReactNode;
}

/**
 * Conteneur d'une scène 3D : charge la scène quand elle approche du viewport
 * et met le rendu en pause quand elle sort de l'écran.
 */
export function SceneFrame({ id, label, className, children }: SceneFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isNear = useInView(ref, { rootMargin: "100% 0px", once: true });
  const isVisible = useInView(ref);

  return (
    <div ref={ref} id={id} className={className} role="img" aria-label={label}>
      {isNear && (
        <Suspense
          fallback={
            <p role="status" className="scene-loader">
              Loading 3D model…
            </p>
          }
        >
          {children(isVisible)}
        </Suspense>
      )}
    </div>
  );
}
