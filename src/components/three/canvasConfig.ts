import type { CanvasProps } from "@react-three/fiber";

/** Réglages communs aux canvas : DPR plafonné à 2 pour limiter le coût GPU. */
export const canvasDefaults = {
  dpr: [1, 2],
  gl: { powerPreference: "high-performance", antialias: true },
} satisfies Partial<CanvasProps>;
