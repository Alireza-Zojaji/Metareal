import { useState, createContext, useContext } from "react";
export const StoryContext = createContext();
export const StoryContextProvider = ({ children }) => {
  const [currentStory, setCurrentStory] = useState(0);
  const [gemPoints, setGemPoints] = useState(0);
  const increaseGemPoints = () => {
    setGemPoints((prev) => prev + 1);
  };
  const [currentCharacter, setCurrentCharacter] = useState(null);
  return <StoryContext.Provider value={{ currentCharacter, setCurrentCharacter, currentStory, setCurrentCharacter, gemPoints, increaseGemPoints }}>{children}</StoryContext.Provider>;
};
export const useStoryContext = () => useContext(StoryContext);
