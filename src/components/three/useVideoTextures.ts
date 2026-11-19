import { useEffect, useMemo } from "react";
import { SRGBColorSpace, VideoTexture } from "three";

const createVideoTexture = (src: string) => {
  const video = document.createElement("video");
  Object.assign(video, {
    src,
    loop: true,
    muted: true,
    playsInline: true,
    preload: "auto",
    crossOrigin: "anonymous",
  });

  const texture = new VideoTexture(video);
  texture.colorSpace = SRGBColorSpace;
  return texture;
};

/**
 * Crée une seule fois une VideoTexture par source : changer de vidéo ne fait
 * que changer de texture, sans rechargement ni suspension.
 */
export function useVideoTextures(sources: readonly string[]): VideoTexture[] {
  const textures = useMemo(() => sources.map(createVideoTexture), [sources]);

  useEffect(
    () => () => {
      textures.forEach((texture) => {
        (texture.image).pause();
        texture.dispose();
      });
    },
    [textures],
  );

  return textures;
}
