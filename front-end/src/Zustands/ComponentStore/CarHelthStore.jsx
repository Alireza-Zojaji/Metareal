import { create } from "zustand";

export const useCarHelthStore = create(set => ({
  healthPoints: 5,
  maxHealthPoints: 5,
  increaseHealthPoints: () => set(state => ({ healthPoints: Math.min(state.healthPoints + 1, state.maxHealthPoints) })),
  decreaseHealthPoints: () => set(state => ({ healthPoints: Math.max(state.healthPoints - 1, 0) })),
}));
