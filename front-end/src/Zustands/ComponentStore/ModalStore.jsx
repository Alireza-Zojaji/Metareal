import { create } from "zustand";

export const useModalStore = create((set) => ({
  modalState: false,
  closeModal: () => set(() => ({ modalState: false })),
  setModalState: (val) => set(() => ({ modalState: val })),
}));
