import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { useCarStore } from "@/Zustands/Models/CarStore/CarStore";
import { useGemStore } from "@/Zustands/Models/GemStore/GemStore";
import { useEffect } from "react";
import { quadtree } from "d3-quadtree";

export const DISTANCE_THRESHOLD = 0.00002;

export const addCarGemLogic = () => {
  const car = useCarStore((state) => state.carModel);
  const gems = useGemStore((state) => state.gemModels);
  const increaseGemPoints = useGemStore((state) => state.increaseGemPoints);

  const { mapRef } = useMapboxContext();
  useEffect(() => {
    const qt = quadtree()
      .x((d) => d.coordinates[0])
      .y((d) => d.coordinates[1])
      .addAll(gems);

    const handleObjectChanged = () => {
      const closeGems = qt.find(car.coordinates[0], car.coordinates[1], DISTANCE_THRESHOLD);
      if (closeGems && mapRef.current.getLayer("3dGemsLayer")) {
        if (closeGems.visible == true) {
          increaseGemPoints();
        }
        closeGems.visible = false;
      }
    };
    if (car) {
      car.addEventListener("ObjectChanged", handleObjectChanged);
      return () => car.removeEventListener("ObjectChanged", handleObjectChanged);
    }
  }, [car, gems]);
};
