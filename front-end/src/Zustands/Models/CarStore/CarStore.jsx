import {create} from 'zustand';
export const useCarStore = create(set => ({
  carModel: null,
  setModel: (model) => set({ carModel: model }),
}));