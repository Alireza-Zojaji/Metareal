import { create } from "zustand";

export const useGuiStore = create((set) => ({
  guiStates: {
    showGatewayGui: false,
    showGlassGui: false,
    showTimerGui: false,
    showMinimap:false,
  },
  setGuiStates: (guiStates) => set((state) => ({ ...state, guiStates })),
}));
