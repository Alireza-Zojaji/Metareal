import { create } from "zustand";

export const useStoryStore = create((set) => ({
  currentStory: 0,
  currentCharacter: null,
  setCurrentCharacter: (character) => set({ currentCharacter: character }),
  setCurrentStory: (story) => set({ currentStory: story }),
}));
