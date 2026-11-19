# MacBook Pro — landing page 3D

Landing page produit avec un MacBook Pro en 3D interactif (couleur, taille 14"/16") et des animations pilotées par le scroll.

## Stack

| Rôle | Outil |
| --- | --- |
| Runtime & gestionnaire de paquets | [Bun](https://bun.sh) 1.4 |
| UI | React 19 + TypeScript 6 (strict) |
| Build | Vite 8 |
| 3D | three.js, React Three Fiber, drei |
| Animations | GSAP 3 + ScrollTrigger (`@gsap/react`) |
| État | Zustand |
| Styles | Tailwind CSS 4 |
| Qualité | ESLint 10 (typescript-eslint, react-hooks, jsx-a11y) |

## Démarrer

```bash
bun install
bun dev            # serveur de dev
bun run check      # typecheck + lint
bun run build      # build de production dans dist/
bun run preview    # sert le build
```

## Structure

```
src/
  components/         sections de la page (Hero, ProductViewer, Showcase, …)
    three/            scènes R3F chargées à la demande (ProductScene, FeaturesScene)
    models/           MacbookModel : un seul modèle pour le 14" et le 16"
  constants/          contenu et configuration (couleurs, tailles, fonctionnalités)
  hooks/              useMediaQuery, useInView
  lib/gsap.ts         enregistrement des plugins GSAP + media queries partagées
  store/              store Zustand (couleur, taille, fonctionnalité active)
scripts/
  optimize-assets.ts  optimisation des vidéos, images et polices de public/
```

## Choix techniques

- **Performance** : les scènes 3D sont chargées en lazy-load quand elles approchent du viewport, et leur rendu est mis en pause hors écran. three.js n'est donc pas dans le bundle initial.
- **Animations** : chaque `useGSAP` a un `scope`, et `gsap.matchMedia()` gère desktop/mobile ainsi que `prefers-reduced-motion`. Les états initiaux masqués sont posés par GSAP, si bien que le contenu reste visible sans JavaScript.
- **Accessibilité** : lien d'évitement, landmarks, contrôles en `<button aria-pressed>`, bouton pause/lecture sur les vidéos, images décoratives en `alt=""`, focus visible.
- **Assets** : vidéos H.264 sans piste audio, images WebP, polices WOFF2. Pour les régénérer depuis les originaux :

  ```bash
  git checkout cfc41e3 -- public   # fichiers originaux
  bun run optimize:assets
  ```

## Crédits

Modèle 3D : [« macbook pro M3 16 inch 2024 »](https://sketchfab.com/3d-models/macbook-pro-m3-16-inch-2024-8e34fc2b303144f78490007d91ff57c4) par jackbaeten, sous licence [CC-BY-4.0](http://creativecommons.org/licenses/by/4.0/).

Projet d'apprentissage, sans lien avec Apple Inc.
