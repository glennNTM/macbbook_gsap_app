import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import clsx from "clsx";
import { useInView } from "@/hooks/useInView";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { MEDIA } from "@/lib/gsap";

interface AutoplayVideoProps
  extends Omit<VideoHTMLAttributes<HTMLVideoElement>, "autoPlay" | "muted"> {
  src: string;
  /** Nom de la vidéo, utilisé dans le libellé du bouton lecture/pause. */
  label: string;
  className?: string;
}

/**
 * Vidéo décorative en lecture automatique :
 * - bouton lecture/pause (WCAG 2.2.2) ;
 * - pas de lecture automatique avec prefers-reduced-motion ;
 * - mise en pause hors écran pour économiser CPU et batterie.
 */
export function AutoplayVideo({ label, className, onEnded, ...videoProps }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useMediaQuery(MEDIA.reduceMotion);
  const isVisible = useInView(videoRef);
  // null = choix par défaut (lecture sauf mouvement réduit), sinon choix de l'utilisateur.
  const [playRequest, setPlayRequest] = useState<boolean | null>(null);
  const wantsPlay = playRequest ?? !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (wantsPlay && isVisible) {
      video.play().catch(() => setPlayRequest(false));
    } else {
      video.pause();
    }
  }, [wantsPlay, isVisible]);

  return (
    <div className={clsx("video-frame", className)}>
      <video
        ref={videoRef}
        muted
        playsInline
        aria-hidden="true"
        onEnded={(event) => {
          setPlayRequest(false);
          onEnded?.(event);
        }}
        {...videoProps}
      />
      <button
        type="button"
        className="video-toggle"
        aria-label={wantsPlay ? `Pause ${label}` : `Play ${label}`}
        onClick={() => setPlayRequest(!wantsPlay)}
      >
        {wantsPlay ? (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M8 5v14l11-7z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
