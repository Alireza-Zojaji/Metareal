import { useEffect } from "react";
import { createCustomLayer } from "@/Utils/modelUtils";
import { useMapboxContext } from "@/Contexts/MapboxContext/MapboxContext";
import { addCarLogics } from "@/Logics/CarLogic/CarLogic";
import { addCarRoadLogic } from "@/Logics/CarRoadLogic/CarRoadLogic";
import { CAR_COORDINATE } from "@/Constants/Constants";
import { useCarStore } from "@/Zustands/Models/CarStore/CarStore";
export const addCarLayer = () => {
  const { mapRef } = useMapboxContext();
  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.on("load", function () {
        const z = 0;
        const layerId = "3dCarLayer";
        if (!map.getLayer(layerId)) {
          map.addLayer(
            createCustomLayer({
              model: {
                obj: "./models/car/scene.gltf",
                origin: CAR_COORDINATE,
                scale: 0.5,
                rotation: { x: 90, y: 0, z: 0 },
              },
              layerId: layerId,
              store: useCarStore,
            }),
            "waterway-label"
          );
        }
      });
    }
  }, [mapRef]);
};
const CarModel = () => {
  // addCarLayer();
  // addCarLogics();
};

export default CarModel;
