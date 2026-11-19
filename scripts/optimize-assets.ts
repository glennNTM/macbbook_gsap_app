/**
 * Optimisation des assets de public/, à lancer sur les fichiers ORIGINAUX
 * (récupérables avec : git checkout cfc41e3 -- public) :
 *   bun run optimize:assets
 *
 * - vidéos : H.264 CRF, sans piste audio (elles sont muettes), faststart, résolution plafonnée
 *   + poster WebP pour les vidéos visibles au chargement ;
 * - images : PNG/JPG -> WebP ;
 * - polices : OTF -> WOFF2.
 *
 * Un fichier n'est remplacé que si la version optimisée est plus légère.
 */
import { execFile } from "node:child_process";
import { readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import ffmpegPath from "ffmpeg-static";
import sharp from "sharp";
import wawoff2 from "wawoff2";

const run = promisify(execFile);
const PUBLIC = new URL("../public/", import.meta.url);
const p = (relative: string) => fileURLToPath(new URL(relative, PUBLIC));

const kb = (bytes: number) => `${Math.round(bytes / 1024)} Ko`;
const sizeOf = async (path: string) => (await stat(path)).size;

const report = (name: string, before: number, after: number) =>
  console.log(`${name.padEnd(28)} ${kb(before).padStart(9)} -> ${kb(after).padStart(9)}`);

interface VideoJob {
  file: string;
  maxWidth: number;
  crf: number;
  /** Instant (s) de l'image utilisée comme poster WebP. */
  posterAt?: number;
}

const VIDEOS: VideoJob[] = [
  // Le hero n'est pas en boucle : son poster est la dernière image.
  { file: "videos/hero.mp4", maxWidth: 1440, crf: 26, posterAt: 4.9 },
  { file: "videos/game.mp4", maxWidth: 1920, crf: 26, posterAt: 1 },
  // Affichées sur l'écran du modèle 3D : 1280 px suffisent.
  ...[1, 2, 3, 4, 5].map((n) => ({ file: `videos/feature-${n}.mp4`, maxWidth: 1280, crf: 27 })),
];

const IMAGES: { file: string; maxWidth?: number; quality?: number }[] = [
  { file: "title.png" },
  { file: "highlight-bg.png" },
  // Texture de l'écran : 2048 px (puissance de 2) au lieu de 3024.
  { file: "screen.png", maxWidth: 2048 },
  ...[1, 2, 3, 4, 6, 7].map((n) => ({ file: `performance${n}.png` })),
  { file: "performance5.jpg" },
];

const FONTS = ["regular", "medium", "semibold", "bold"];

async function optimizeVideo({ file, maxWidth, crf, posterAt }: VideoJob) {
  if (!ffmpegPath) throw new Error("ffmpeg-static indisponible sur cette plateforme");
  const input = p(file);
  const output = p(file.replace(/\.mp4$/, ".tmp.mp4"));

  await run(ffmpegPath, [
    "-y", "-loglevel", "error",
    "-i", input,
    "-an",
    "-vf", `scale='min(${maxWidth},iw)':-2`,
    "-c:v", "libx264", "-preset", "slow", "-crf", String(crf),
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    output,
  ]);

  const [before, after] = [await sizeOf(input), await sizeOf(output)];
  if (after < before) await rename(output, input);
  else await rm(output);
  report(file, before, Math.min(before, after));

  if (posterAt !== undefined) {
    const frame = p(file.replace(/\.mp4$/, ".poster.png"));
    const posterUrl = p(file.replace(/\.mp4$/, ".poster.webp"));
    await run(ffmpegPath, [
      "-y", "-loglevel", "error",
      "-ss", String(posterAt),
      "-i", input,
      "-frames:v", "1",
      frame,
    ]);
    await sharp(await readFile(frame)).webp({ quality: 75 }).toFile(posterUrl);
    await rm(frame);
    report(`  poster`, 0, await sizeOf(posterUrl));
  }
}

async function optimizeImage({ file, maxWidth, quality = 80 }: (typeof IMAGES)[number]) {
  const input = p(file);
  const output = p(file.replace(/\.(png|jpe?g)$/, ".webp"));
  let pipeline = sharp(await readFile(input));
  if (maxWidth) pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  await writeFile(output, await pipeline.webp({ quality, effort: 6 }).toBuffer());
  report(file, await sizeOf(input), await sizeOf(output));
}

async function optimizeFont(name: string) {
  const input = p(`fonts/${name}.otf`);
  const output = p(`fonts/${name}.woff2`);
  await writeFile(output, await wawoff2.compress(await readFile(input)));
  report(`fonts/${name}`, await sizeOf(input), await sizeOf(output));
}

for (const job of VIDEOS) await optimizeVideo(job);
for (const job of IMAGES) await optimizeImage(job);
for (const font of FONTS) await optimizeFont(font);
