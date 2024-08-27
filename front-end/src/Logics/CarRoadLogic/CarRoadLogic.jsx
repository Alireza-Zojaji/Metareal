import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { useCarStore } from "@/Zustands/Models/CarStore/CarStore";
import { useEffect, useRef } from "react";
import { useCarHelthStore } from "@/Zustands/ComponentStore/CarHelthStore";
import { useStoryContext } from "@/Contexts/StoryContext/StoryContext";

export const addCarRoadLogic = () => {
  const car = useCarStore((state) => state.carModel);
  const { mapRef } = useMapboxContext();
  const { increaseHealthPoints, decreaseHealthPoints } = useCarHelthStore();
  const { currentCharacter } = useStoryContext();
  const currentCharacterRef = useRef(currentCharacter);
  useEffect(() => {
    currentCharacterRef.current = currentCharacter;
  }, [currentCharacter]);

  useEffect(() => {
    if (currentCharacterRef.current !== "car") return;
    const intervalId = setInterval(() => {
      if (!mapRef.current || !car) return;
      let point = mapRef.current.project(car.coordinates);
      let features = mapRef.current.queryRenderedFeatures(point, {
        layers: ["khomeiniRoadLayer"],
      });
      if (features.length === 0) {
        decreaseHealthPoints();
      } else {
        increaseHealthPoints();
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [car, mapRef, currentCharacter]);
};
