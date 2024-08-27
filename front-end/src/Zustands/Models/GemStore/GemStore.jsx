import { create } from "zustand";
export const useGemStore = create((set) => ({
  gemModels: [],
  gemPoints: 0,
  increaseGemPoints: () => set((state) => ({ gemPoints: state.gemPoints + 1 })),
  addModel: (model) =>
    set((state) => ({ gemModels: [...state.gemModels, model] })),
}));