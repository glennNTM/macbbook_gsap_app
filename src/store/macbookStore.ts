import { create } from "zustand";
import { DEFAULT_COLOR, type MacbookSize } from "@/constants";

interface MacbookState {
  color: string;
  size: MacbookSize;
  /** Index de la fonctionnalité affichée sur l'écran du modèle (section Features). */
  activeFeature: number;
  setColor: (color: string) => void;
  setSize: (size: MacbookSize) => void;
  setActiveFeature: (index: number) => void;
  reset: () => void;
}

const initialState = {
  color: DEFAULT_COLOR,
  size: "16",
  activeFeature: 0,
} satisfies Partial<MacbookState>;

const useMacbookStore = create<MacbookState>()((set) => ({
  ...initialState,
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  setActiveFeature: (activeFeature) =>
    set((state) => (state.activeFeature === activeFeature ? state : { activeFeature })),
  reset: () => set(initialState),
}));

export default useMacbookStore;
