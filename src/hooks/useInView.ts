import { type RefObject, useEffect, useState } from "react";

interface UseInViewOptions {
  /** Marge autour du viewport, ex. "100% 0px" pour anticiper d'un écran. */
  rootMargin?: string;
  /** Reste à true après la première apparition. */
  once?: boolean;
}

/** Indique si l'élément est visible (IntersectionObserver). */
export function useInView(
  ref: RefObject<Element | null>,
  { rootMargin = "0px", once = false }: UseInViewOptions = {},
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) observer.disconnect();
      },
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}
