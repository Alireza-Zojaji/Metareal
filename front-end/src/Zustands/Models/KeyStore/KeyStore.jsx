import { create } from "zustand";
export const useKeyStore = create((set) => ({
  keyModel: null,
  keyPicked: false,
  setKeyPicked: (bool) => set({ keyPicked: bool }),
  setModel: (model) => set({ keyModel: model }),
}));
