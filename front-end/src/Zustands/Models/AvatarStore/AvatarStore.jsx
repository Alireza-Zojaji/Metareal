import {create} from 'zustand';
export const useAvatarStore = create(set => ({
  avatarModel: null,
  avatarAdded: false,
  setModel: (model) => set({ avatarModel: model }),
  setAvatarAdded: (added) => set({ avatarAdded: added }),
}));